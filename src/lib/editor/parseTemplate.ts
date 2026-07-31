function parseInline(text: string) {
  const inlineParts = text.split(/({{.*?}})/g);
  const inlineNodes: any[] = [];

  for (const p of inlineParts) {
    if (p.startsWith('{{') && p.endsWith('}}')) {
      inlineNodes.push({
        type: 'templatePlaceholder',
        attrs: {
          fieldId: p.slice(2, -2).trim(),
        },
        content: [
          {
            type: 'text',
            text: p.slice(2, -2).trim(),
          },
        ],
      });
    } else if (p.length > 0) {
      inlineNodes.push({
        type: 'text',
        text: p,
      });
    }
  }
  return inlineNodes.length > 0 ? inlineNodes : undefined;
}

export function parseTemplateToTipTap(rawText: string) {
  const lines = rawText.split('\n');
  const blocks: any[] = [];
  
  let currentList: any[] | null = null;
  let isFirstNonEmpty = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.trim() === '') {
      if (currentList) {
        blocks.push({
          type: 'bulletList',
          content: currentList
        });
        currentList = null;
      }
      blocks.push({ type: 'paragraph' });
      continue;
    }

    const inlineNodes = parseInline(line);

    if (isFirstNonEmpty) {
      isFirstNonEmpty = false;
      blocks.push({
        type: 'heading',
        attrs: { level: 1 },
        content: inlineNodes
      });
      continue;
    }

    if (line.startsWith('## ')) {
      if (currentList) {
        blocks.push({
          type: 'bulletList',
          content: currentList
        });
        currentList = null;
      }
      const textLine = line.substring(3);
      blocks.push({
        type: 'heading',
        attrs: { level: 2 },
        content: parseInline(textLine)
      });
      continue;
    }

    if (line.startsWith('- ')) {
      if (!currentList) {
        currentList = [];
      }
      const textLine = line.substring(2);
      currentList.push({
        type: 'listItem',
        content: [
          {
            type: 'paragraph',
            content: parseInline(textLine)
          }
        ]
      });
      continue;
    }

    // Default
    if (currentList) {
      blocks.push({
        type: 'bulletList',
        content: currentList
      });
      currentList = null;
    }
    
    blocks.push({
      type: 'paragraph',
      content: inlineNodes
    });
  }

  if (currentList) {
    blocks.push({
      type: 'bulletList',
      content: currentList
    });
  }

  return {
    type: 'doc',
    content: blocks,
  };
}

export function parseTemplateToHTML(rawText: string) {
  const lines = rawText.split('\n');
  const htmlLines: string[] = [];
  
  let inList = false;
  let isFirstNonEmpty = true;

  const processInline = (text: string) => {
    let res = text.replace(/\{\{(.*?)\}\}/g, (match, p1) => {
      const fieldId = p1.trim();
      if (fieldId.toLowerCase().includes('signature') || fieldId.toLowerCase().includes('sign')) {
        return `<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>`;
      }
      return `<span data-type="template-placeholder" fieldid="${fieldId}">${fieldId}</span>`;
    });
    // Replace raw underscore lines (2 or more underscores) with standard HTML underline
    res = res.replace(/(?<!_)_{2,}(?!_)/g, () => {
      return `<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>`;
    });
    return res;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.trim() === '') {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push('<p></p>');
      continue;
    }

    if (isFirstNonEmpty) {
      isFirstNonEmpty = false;
      htmlLines.push(`<h1>${processInline(line)}</h1>`);
      continue;
    }

    if (line.startsWith('## ')) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push(`<h2><u>${processInline(line.substring(3))}</u></h2>`);
      continue;
    }

    if (line.startsWith('- ')) {
      if (!inList) {
        htmlLines.push('<ul>');
        inList = true;
      }
      htmlLines.push(`<li><p>${processInline(line.substring(2))}</p></li>`);
      continue;
    }

    if (inList) {
      htmlLines.push('</ul>');
      inList = false;
    }
    
    htmlLines.push(`<p>${processInline(line)}</p>`);
  }

  if (inList) {
    htmlLines.push('</ul>');
  }

  return htmlLines.join('');
}
