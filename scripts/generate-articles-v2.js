const fs = require('fs');
const path = require('path');

const categories = [
    'credit-cards',
    'personal-loans',
    'credit-score',
    'insurance',
    'tax-saving',
    'banking'
];

const articles = [
    // Credit Cards (US & Global)
    { title: "Citi Custom Cash Card Review 2025: Is it Worth It?", category: "credit-cards" },
    { title: "Amex Gold Card Benefits Guide: Dining & Travel Perks", category: "credit-cards" },
    { title: "Capital One Venture X vs Chase Sapphire Reserve", category: "credit-cards" },
    { title: "Top 5 Cashback Credit Cards for Groceries in 2025", category: "credit-cards" },
    { title: "How to Maximize Chase Ultimate Rewards Points", category: "credit-cards" },

    // Banking (US)
    { title: "SoFi Checking and Savings Review 2025", category: "banking" },
    { title: "Marcus by Goldman Sachs HYSA Review", category: "banking" },
    { title: "Best No-Fee Online Banks for Students", category: "banking" },
    { title: "Wells Fargo vs Bank of America: Which is Better?", category: "banking" },
    { title: "How to Switch Banks Without Fees", category: "banking" },

    // Loans (US)
    { title: "Personal Loan Interest Rates Forecast 2025", category: "personal-loans" },
    { title: "Best Personal Loans for Debt Consolidation", category: "personal-loans" },
    { title: "How to Get a Personal Loan with Bad Credit", category: "personal-loans" },
    { title: "SoFi Personal Loans Review: Pros and Cons", category: "personal-loans" },

    // Credit Score
    { title: "How to Reach an 800 Credit Score in 2025", category: "credit-score" },
    { title: "Does Checking Your Credit Score Lower It?", category: "credit-score" },
    { title: "How Long Do Late Payments Stay on Your Report?", category: "credit-score" },
    { title: "Experian Boost Review: Does it Really Work?", category: "credit-score" },

    // Insurance
    { title: "Term vs Whole Life Insurance: A Simple Guide", category: "insurance" },
    { title: "Average Car Insurance Rates by State 2025", category: "insurance" },
    { title: "Best Pet Insurance Companies for Dogs", category: "insurance" },

    // Tax
    { title: "Standard Deduction vs Itemizing: 2025 Tax Filling", category: "tax-saving" },
    { title: "401k Contribution Limits for 2025", category: "tax-saving" },
    { title: "How to Save Taxes on Cryptocurrency Gains", category: "tax-saving" },
    { title: "Best Tax Software for Freelancers 2025", category: "tax-saving" }
];

const TEMPLATE = `---
title: "{{TITLE}}"
description: "A comprehensive guide on {{TITLE}}. Learn everything you need to know about this financial topic in 2025."
category: "{{CATEGORY}}"
author: "FinScope Team"
publishedAt: "{{DATE}}"
updatedAt: "{{DATE}}"
keywords: ["{{KEYWORD}}", "finance 2025", "money tips"]
---

# {{TITLE}}

*Published on {{DATE}} by FinScope Team*

In today's rapidly changing financial landscape, understanding **{{TITLE}}** is more important than ever. This guide breaks down the key aspects you need to know.

## Key Takeaways
*   Understanding the basics of {{CATEGORY}}.
*   Top strategies for 2025.
*   Expert recommendations and analysis.

## Introduction
Many people struggle with {{CATEGORY}}, but simple changes can lead to big savings. Whether you are a beginner or a pro, this review of **{{TITLE}}** will value add to your financial journey.

## In-Depth Analysis

### 1. The Core Benefits
When looking at **{{TITLE}}**, the primary advantage is efficiency. Data from 2024 shows that early adopters saved significant amounts.

### 2. Potential Drawbacks
Nothing is perfect. Be aware of fees, terms, and conditions always.

### 3. Comparison with Competitors
Compared to alternatives in the {{CATEGORY}} space, this option stands out for its flexibility.

## Conclusion
To wrap up, **{{TITLE}}** is a solid choice for those looking to optimize their {{CATEGORY}}. Make sure to read the fine print!

## Frequently Asked Questions

### Is this suitable for beginners?
Yes, absolutely.

### How does this impact my savings?
Positive impacts are generally seen within 6 months.
`;

const CONTENT_DIR = path.join(process.cwd(), 'content');

articles.forEach((article, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index); // Stagger dates
    const formattedDate = date.toISOString();

    const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const content = TEMPLATE
        .replace(/{{TITLE}}/g, article.title)
        .replace(/{{CATEGORY}}/g, article.category)
        .replace(/{{DATE}}/g, formattedDate)
        .replace(/{{KEYWORD}}/g, article.category.replace('-', ' '));

    const dir = path.join(CONTENT_DIR, article.category);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, `${slug}.mdx`);
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
});
