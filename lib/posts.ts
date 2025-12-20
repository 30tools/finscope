import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Post {
    slug: string;
    category: string;
    title: string;
    description: string;
    content: string;
    author: string;
    publishedAt: string;
    updatedAt: string;
    keywords: string[];
}

export function getPostSlugs(category: string) {
    const categoryDir = path.join(CONTENT_DIR, category);
    if (!fs.existsSync(categoryDir)) return [];
    return fs.readdirSync(categoryDir).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

export function getPostBySlug(category: string, slug: string): Post | null {
    const realSlug = slug.replace(/\.mdx?$/, "");
    const categoryDir = path.join(CONTENT_DIR, category);

    // Try .mdx then .md
    let fullPath = path.join(categoryDir, `${realSlug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(categoryDir, `${realSlug}.md`);
    }

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        category,
        title: data.title,
        description: data.description,
        content,
        author: data.author,
        publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString() : new Date().toISOString(),
        updatedAt: data.updatedAt ? new Date(data.updatedAt).toISOString() : new Date().toISOString(),
        keywords: data.keywords || [],
    };
}

export function getAllPosts(category: string): Post[] {
    const slugs = getPostSlugs(category);
    const posts = slugs
        .map((slug) => getPostBySlug(category, slug))
        .filter((post): post is Post => post !== null)
        .sort((post1, post2) => (post1.publishedAt > post2.publishedAt ? -1 : 1));
    return posts;
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
    const allCategories = getAllCategories();
    let allPosts: Post[] = [];

    // Gather all posts
    allCategories.forEach(cat => {
        allPosts = [...allPosts, ...getAllPosts(cat)];
    });

    // Filter out current post
    const otherPosts = allPosts.filter(p => p.slug !== currentPost.slug);

    // Score posts based on matching keywords and category
    const scoredPosts = otherPosts.map(post => {
        let score = 0;

        // Same category gets points
        if (post.category === currentPost.category) score += 2;

        // Matching keywords get points
        const commonKeywords = post.keywords.filter(k =>
            currentPost.keywords.includes(k)
        );
        score += commonKeywords.length * 3;

        return { post, score };
    });

    // Sort by score desc, then date desc
    scoredPosts.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
    });

    return scoredPosts.slice(0, limit).map(p => p.post);
}

export function getAllCategories(): string[] {
    if (!fs.existsSync(CONTENT_DIR)) return [];
    return fs.readdirSync(CONTENT_DIR).filter((file) => {
        return fs.statSync(path.join(CONTENT_DIR, file)).isDirectory();
    });
}
