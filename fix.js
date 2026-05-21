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
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

walk('src/app').forEach(f => {
    let text = fs.readFileSync(f, 'utf8');
    text = text.replace(/readonly=""/g, 'readOnly={true}');
    fs.writeFileSync(f, text);
});
console.log('Fixed readonly attributes');
