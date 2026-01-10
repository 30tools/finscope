const item = { keyword: 'tech', url: '...' };

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const regex = new RegExp(`(?<!\\[|\\(|#|\\/)\\b${escapeRegExp(item.keyword)}\\b(?!\\]|\\)|")`, 'i');

const text = "The year 2026 will bring new technologies and new market cycles";
const match = text.match(regex);

console.log("Regex:", regex);
console.log("Text:", text);
console.log("Match:", match);
