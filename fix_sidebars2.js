const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') && !file.includes('layout.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/app');

const allLinks = {
  'Legal Research': {
    href: (f) => (f.includes('/business') ? '/business/research' : '/advocate/research'),
  },
  'Draft Contract': { href: (f) => '/advocate/drafts' },
  'Contract Drafts': {
    href: (f) => (f.includes('/business') ? '/business/drafts' : '/student/drafts'),
  },
  'Compliance Check': { href: (f) => '/advocate/compliance' },
  'Compliance Hub': {
    href: (f) => (f.includes('/student') ? '/student/compliance' : '/business/compliance'),
  },
  'Case Analysis': { href: (f) => (f.includes('/business') ? '/business/case' : '/advocate/case') },
  'Premium Access': { href: (f) => (f.includes('/student') ? '/student/premium' : '/pricing') },
  'Legal Chat': { href: (f) => '/student/chat' },
  'Research Vault': { href: (f) => '/student/vault' },
};

files.forEach((f) => {
  let lines = fs.readFileSync(f, 'utf8').split('\n');
  let changed = false;

  // We scan through the lines. When we see one of our target names, we backtrack to find the nearest <a or <button
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Find which link this line might contain
    let foundName = Object.keys(allLinks).find(
      (name) => line.includes(name) && !line.includes('Notice of')
    );

    if (foundName) {
      // Check if this is inside the sidebar context. Usually sidebars are enclosed in <nav> or <ul> or just <aside>
      // Actually, we can just replace the <a or <button above it.
      let href = allLinks[foundName].href(f.replace(/\\/g, '/'));

      // Backtrack to find <a or <button
      let tagStartIndex = -1;
      let tagName = '';
      for (let j = i; j >= Math.max(0, i - 10); j--) {
        if (lines[j].includes('<a ') || lines[j].includes('<a>') || lines[j].includes('<a\n')) {
          tagStartIndex = j;
          tagName = 'a';
          break;
        }
        if (
          lines[j].includes('<button ') ||
          lines[j].includes('<button>') ||
          lines[j].includes('<button\n')
        ) {
          tagStartIndex = j;
          tagName = 'button';
          break;
        }
      }

      if (tagStartIndex !== -1) {
        // Find where the tag closes (e.g. </a> or </button>)
        let tagEndIndex = -1;
        for (let j = i; j < Math.min(lines.length, i + 10); j++) {
          if (lines[j].includes(`</${tagName}>`)) {
            tagEndIndex = j;
            break;
          }
        }

        if (tagEndIndex !== -1) {
          // We found a block from tagStartIndex to tagEndIndex
          // We change <a or <button to <Link
          lines[tagStartIndex] = lines[tagStartIndex].replace(`<${tagName}`, `<Link`);

          // We change </a or </button to </Link>
          lines[tagEndIndex] = lines[tagEndIndex].replace(`</${tagName}>`, `</Link>`);

          // We remove href="#" if it exists in any line in the block
          for (let k = tagStartIndex; k <= tagEndIndex; k++) {
            lines[k] = lines[k].replace(/href="[^"]*"/, '');
          }

          // Inject the new href on the start tag line
          lines[tagStartIndex] = lines[tagStartIndex].replace('<Link', `<Link href="${href}"`);

          changed = true;
        }
      }
    }
  }

  if (changed) {
    let newText = lines.join('\n');
    if (!newText.includes("import Link from 'next/link'")) {
      newText = "import Link from 'next/link';\n" + newText;
    }
    fs.writeFileSync(f, newText);
    console.log(`Updated ${f}`);
  }
});
