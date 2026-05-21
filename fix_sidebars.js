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

// Advocate Links Mapping
const advocateLinks = [
  { name: 'Legal Research', icon: 'balance', href: '/advocate/research' },
  { name: 'Draft Contract', icon: 'history_edu', href: '/advocate/drafts' },
  { name: 'Compliance Check', icon: 'fact_check', href: '/advocate/compliance' },
  { name: 'Case Analysis', icon: 'search_insights', href: '/advocate/case' },
];

// Business Links Mapping
const businessLinks = [
  { name: 'Compliance Hub', icon: 'verified', href: '/business/compliance' },
  { name: 'Contract Drafts', icon: 'edit_document', href: '/business/drafts' },
  { name: 'Legal Research', icon: 'account_balance', href: '/business/research' },
  { name: 'Case Analysis', icon: 'search', href: '/business/case' },
  { name: 'Premium Access', icon: 'workspace_premium', href: '/pricing' },
];

// Student Links Mapping
const studentLinks = [
  { name: 'Legal Chat', icon: 'chat_bubble', href: '/student/chat' },
  { name: 'Research Vault', icon: 'account_balance', href: '/student/vault' },
  { name: 'Contract Drafts', icon: 'edit_document', href: '/student/drafts' },
  { name: 'Compliance Hub', icon: 'verified', href: '/student/compliance' },
  { name: 'Premium Access', icon: 'workspace_premium', href: '/student/premium' },
];

files.forEach((f) => {
  let text = fs.readFileSync(f, 'utf8');
  let changed = false;

  // Convert <a> and <button> in sidebars to Next.js <Link>
  // We'll do this by finding the common innerText patterns

  // Process Advocate
  advocateLinks.forEach((link) => {
    // Find buttons containing the icon and text
    const regex = new RegExp(
      `<(button|a)([^>]*?)>([\\s\\S]*?<span[^>]*?>\\s*${link.icon}\\s*</span>[\\s\\S]*?${link.name}[\\s\\S]*?)</\\1>`,
      'g'
    );
    text = text.replace(regex, (match, tag, attrs, inner) => {
      // Remove href="#" if it exists
      attrs = attrs.replace(/href="[^"]*"/, '');
      // Add href
      attrs = ` href="${link.href}"` + attrs;
      changed = true;
      return `<Link${attrs}>${inner}</Link>`;
    });
  });

  // Process Business
  businessLinks.forEach((link) => {
    const regex = new RegExp(
      `<(button|a)([^>]*?)>([\\s\\S]*?<span[^>]*?>\\s*${link.icon}\\s*</span>[\\s\\S]*?${link.name}[\\s\\S]*?)</\\1>`,
      'g'
    );
    text = text.replace(regex, (match, tag, attrs, inner) => {
      if (attrs.includes(`href="${link.href}"`)) return match; // Already fixed
      attrs = attrs.replace(/href="[^"]*"/, '');
      attrs = ` href="${link.href}"` + attrs;
      changed = true;
      return `<Link${attrs}>${inner}</Link>`;
    });
  });

  // Process Student
  studentLinks.forEach((link) => {
    const regex = new RegExp(
      `<(button|a)([^>]*?)>([\\s\\S]*?<span[^>]*?>\\s*${link.icon}\\s*</span>[\\s\\S]*?${link.name}[\\s\\S]*?)</\\1>`,
      'g'
    );
    text = text.replace(regex, (match, tag, attrs, inner) => {
      if (attrs.includes(`href="${link.href}"`)) return match; // Already fixed
      attrs = attrs.replace(/href="[^"]*"/, '');
      attrs = ` href="${link.href}"` + attrs;
      changed = true;
      return `<Link${attrs}>${inner}</Link>`;
    });
  });

  if (changed) {
    if (!text.includes("import Link from 'next/link'")) {
      text = "import Link from 'next/link';\n" + text;
    }
    fs.writeFileSync(f, text);
    console.log(`Updated links in ${f}`);
  }
});
