const fs = require('fs');
const path = require('path');

// CONFIG
const LINK_ONCE_PER_PAGE = true; // Wikipedia style: only link the first mention
const BASE_URL = 'https://unstory.app';
const CONTENT_DIR = path.join(process.cwd(), 'content');

// Helper to clean text for regex safety
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 1. SCAN CONTENT & BUILD KNOWLEDGE GRAPH
console.log("Building Knowledge Graph...");
const knowledgeGraph = []; // Array of { keyword: "String", url: "String", type: "category"|"article" }

// A. Add Categories (Derived from directory names)
const categories = fs.readdirSync(CONTENT_DIR).filter(f => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory());
categories.forEach(cat => {
    // Convert "credit-cards" -> "Credit Cards"
    const readable = cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    // Add variations
    knowledgeGraph.push({ keyword: readable, url: `${BASE_URL}/${cat}`, type: 'category' });
    if (readable !== readable.toLowerCase()) {
        knowledgeGraph.push({ keyword: readable.toLowerCase(), url: `${BASE_URL}/${cat}`, type: 'category' });
    }
});

// B. Add Articles (Derived from frontmatter)
function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else if (file.endsWith('.mdx')) {
            results.push(file);
        }
    });
    return results;
}

const allFiles = getFiles(CONTENT_DIR);
allFiles.forEach(filepath => {
    const content = fs.readFileSync(filepath, 'utf8');

    // Extract Title, Slug, Category
    const titleMatch = content.match(/^title:\s*["']?([^"'\n\r]+)["']?/m);
    const slugMatch = content.match(/^slug:\s*["']?([^"'\n\r]+)["']?/m);

    // Derive category from parent folder if not in frontmatter
    let category = path.basename(path.dirname(filepath));

    if (titleMatch && slugMatch) {
        const title = titleMatch[1];
        const slug = slugMatch[1];
        const url = `${BASE_URL}/${category}/${slug}`;

        // Add exact title match
        if (title.length > 5) { // Ignore very short titles to avoid noise
            knowledgeGraph.push({ keyword: title, url: url, type: 'article' });
        }
    }
});

// C. Sort Keywords by Length (Longest first)
// This prevents "Credit Card" getting linked inside "Credit Card Debt"
knowledgeGraph.sort((a, b) => b.keyword.length - a.keyword.length);

console.log(`Knowledge Graph Built: ${knowledgeGraph.length} mapping targets.`);

// 2. PROCESS FILES
let totalLinksAdded = 0;

allFiles.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    const originalContent = content;

    // Split content into Frontmatter and Body
    const parts = content.split(/^---$/m);
    if (parts.length < 3) return; // Invalid frontmatter structure

    let frontmatter = parts[1];
    let body = parts.slice(2).join('---');

    // Get current page URL to avoid self-linking
    const currentSlugMatch = frontmatter.match(/^slug:\s*["']?([^"'\n\r]+)["']?/m);
    const currentSlug = currentSlugMatch ? currentSlugMatch[1] : '';

    const linkedKeywordsInThisFile = new Set();

    // Iterate through keywords and apply links
    // We process the body in a way that respects existing links/code

    // Strategy: We will not use global Replace. We will traverse the map.
    for (const item of knowledgeGraph) {
        // Skip if self-linking
        if (item.url.includes(currentSlug) && currentSlug.length > 0) continue;

        // Skip if we already matched this keyword (or a variation of it shouldn't matter if logic is sound, but let's be safe)
        // Actually, if we link "Credit Cards", we shouldn't later link "credit cards" if we want 1 link per term type.
        // But for now, let's just stick to the specific string.

        if (LINK_ONCE_PER_PAGE && linkedKeywordsInThisFile.has(item.keyword.toLowerCase())) continue;

        // Regex Explanation:
        // (?<!\[) -> Not preceded by '[' (inside a link text)
        // (?<!\() -> Not preceded by '(' (inside a link url)
        // \bKEYWORD\b -> Whole word match
        // (?!\]) -> Not followed by ']'
        // (?!\)) -> Not followed by ')'
        // AND not inside a code block (difficult with simple regex, but we can try basic avoidance)

        // Simplified approach: Split text by code blocks and existing links, modify text nodes, reassemble.
        // Doing full parsing is complex in a single script. 
        // We will use a robust Regex implementation that ignores Markdown Links and Code Blocks.

        const regex = new RegExp(`(?<!\\[|\\(|#|\\/)\\b${escapeRegExp(item.keyword)}\\b(?!\\]|\\)|")`, 'i');
        // 'i' flag for case-insensitive matching if desired, but our map has case-specific entries. 
        // Let's use case-sensitive for titles (usually specific) and rely on the map's lowercased variants for categories.
        // Actually, user wants "finance" -> link. Map has "Finance" and "finance".

        // We only want to replace the FIRST occurrence generally.

        const match = body.match(regex);

        if (match) {
            // Check context validation before replacing
            const index = match.index;
            const contextStart = Math.max(0, index - 50);
            const contextEnd = Math.min(body.length, index + item.keyword.length + 50);
            const context = body.substring(contextStart, contextEnd);

            // Simple heuristic to avoid linking inside existing markdown links like [text](url)
            // If we find more ']' than '[' after the match, or ')' than '(', we might be inside.
            // This is brittle. 

            // Better Heuristic: Check if line starts with # (Header) or ``` (Code)
            // Let's find the full line
            const lineStart = body.lastIndexOf('\n', index) + 1;
            const lineEnd = body.indexOf('\n', index);
            const fullLine = body.substring(lineStart, lineEnd !== -1 ? lineEnd : body.length);

            if (fullLine.trim().startsWith('#')) continue; // Skip headers
            if (fullLine.trim().startsWith('http')) continue; // Skip raw URLs
            if (fullLine.includes('`')) continue; // Skip code lines (simple check)
            if (fullLine.includes(`[${item.keyword}]`)) continue; // Already linked

            // Perform replacement
            // Note: We use a function replacement to prevent regex injection issues
            body = body.replace(regex, (matchedStr) => {
                linkedKeywordsInThisFile.add(item.keyword.toLowerCase());
                totalLinksAdded++;
                return `[${matchedStr}](${item.url})`;
            });

            // Since we replaced one instance and LINK_ONCE_PER_PAGE is true, we move to next keyword.
        }
    }

    // Reconstruct File
    // If changes occurred, write back
    if (originalContent.includes(body)) {
        // No changes
    } else {
        const newContent = `---${frontmatter}---${body}`;
        fs.writeFileSync(filepath, newContent);
        // console.log(`Linked ${filepath.split('/').pop()}`);
    }
});

console.log(`Success. Added ${totalLinksAdded} internal links across ${allFiles.length} files.`);
