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

export function getAllCategories(): string[] {
    if (!fs.existsSync(CONTENT_DIR)) return [];
    return fs.readdirSync(CONTENT_DIR).filter((file) => {
        return fs.statSync(path.join(CONTENT_DIR, file)).isDirectory();
    });
}
