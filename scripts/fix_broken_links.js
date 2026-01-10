const fs = require('fs');
const path = require('path');
const glob = require('glob');

const CONTENT_DIR = path.join(process.cwd(), 'content');

function getMdxFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getMdxFiles(filePath));
        } else if (file.endsWith('.mdx')) {
            results.push(filePath);
        }
    });
    return results;
}

const files = getMdxFiles(CONTENT_DIR);
let fixedCount = 0;

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Regex to find [text](url) followed immediately by a letter
    // Capture group 1: Text inside []
    // Capture group 2: URL inside ()
    // Capture group 3: The following letter(s)

    // We want to match [text](url)letters
    // replace with textletters

    const regex = /\[([^\]]+)\]\([^)]+\)([a-zA-Z]+)/g;

    // We also need to be careful. What if it's [text](url)WORD?
    // It matches.

    let modified = false;
    if (regex.test(content)) {
        content = content.replace(regex, (match, text, url, suffix) => {
            // console.log(`Fixing: ${match} -> ${text}${suffix}`);
            return text + suffix;
        });
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
        fixedCount++;
        // console.log(`Fixed links in: ${filePath.split('/').pop()}`);
    }
});

console.log(`Fixed broken links in ${fixedCount} files.`);
