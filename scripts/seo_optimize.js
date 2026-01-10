const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');

const CONTENT_DIR = path.join(process.cwd(), 'content');
const DRY_RUN = !process.argv.includes('--fix');
const TODAY = '2026-01-10';

console.log(`Starting SEO Optimization... Mode: ${DRY_RUN ? 'DRY RUN' : 'FIX'}`);

// Recursive function to get all MDX files
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
console.log(`Found ${files.length} MDX files.`);

let changesCount = 0;

files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);
    const data = parsed.data;
    let modified = false;
    const errors = [];

    // 1. Title Optimization (Check length)
    if (!data.title) {
        errors.push('Missing Title');
    } else if (data.title.length < 30 || data.title.length > 70) {
        // Just a warning for now, we won't auto-truncate titles blindly
        // console.log(`[WARN] Title length ${data.title.length}: ${filePath.split('/').pop()}`);
    }

    // 2. Meta Description
    if (!data.description) {
        errors.push('Missing Description');
        // Auto-generate from content? Maybe too risky for now without AI summary.
        // We will fallback to first 160 chars of body if fixing.
        if (!DRY_RUN) {
           const bodyText = parsed.content.replace(/^#+\s.*$/gm, '').trim(); 
           data.description = bodyText.substring(0, 157).trim() + '...';
           modified = true;
        }
    } else if (data.description.length < 50 || data.description.length > 170) {
        // console.log(`[WARN] Desc length ${data.description.length}: ${filePath.split('/').pop()}`);
    }

    // 3. Keywords
    if (!data.keywords || !Array.isArray(data.keywords)) {
         errors.push('Missing Keywords');
         if (!DRY_RUN) {
             // Generate basic keywords from Title
             const titleKeywords = data.title
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .split(' ')
                .filter(w => w.length > 3)
                .slice(0, 5);
             data.keywords = titleKeywords;
             modified = true;
         }
    }

    // 4. Freshness (UpdatedAt)
    // We want to update this to show Google the content is fresh.
    if (data.updatedAt !== TODAY) {
        if (!DRY_RUN) {
            data.updatedAt = TODAY;
            modified = true;
        } else {
             // In dry run, just note we would update it
             // console.log(`[INFO] Would update date for: ${filePath.split('/').pop()}`);
        }
    }
    
    // Ensure publishedAt exists
    if (!data.publishedAt) {
        errors.push('Missing publishedAt');
        if (!DRY_RUN) {
            data.publishedAt = TODAY;
            modified = true;
        }
    }


    if (modified && !DRY_RUN) {
        const newContent = matter.stringify(parsed.content, data);
        fs.writeFileSync(filePath, newContent);
        changesCount++;
    } else if (modified && DRY_RUN) {
        changesCount++;
        // console.log(`[DRY] Would modify: ${filePath.split('/').pop()}`);
    }
    
    if (errors.length > 0) {
        console.log(`File: ${filePath.split('/').pop()} - Issues: ${errors.join(', ')}`);
    }
});

console.log(`\nSummary:`);
console.log(`Processed ${files.length} files.`);
console.log(`${DRY_RUN ? 'Identified' : 'Applied'} changes to ${changesCount} files.`);
