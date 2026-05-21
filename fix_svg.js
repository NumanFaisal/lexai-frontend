const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
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

files.forEach(f => {
    let text = fs.readFileSync(f, 'utf8');
    let original = text;

    // SVG attributes to camelCase
    text = text.replace(/stroke-width=/g, 'strokeWidth=');
    text = text.replace(/stroke-dasharray=/g, 'strokeDasharray=');
    text = text.replace(/stroke-dashoffset=/g, 'strokeDashoffset=');
    text = text.replace(/stroke-linecap=/g, 'strokeLinecap=');
    text = text.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
    text = text.replace(/fill-rule=/g, 'fillRule=');
    text = text.replace(/clip-rule=/g, 'clipRule=');
    text = text.replace(/fill-opacity=/g, 'fillOpacity=');

    if (text !== original) {
        fs.writeFileSync(f, text);
        console.log(`Fixed SVG attributes in ${f}`);
    }
});
