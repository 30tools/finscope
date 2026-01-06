import Link from "next/link";
import { getAllCategories, getAllPosts, Post } from "@/lib/posts";
import VisitorBadge from "@/components/VisitorBadge";
import { constructMetadata, SITE_URL } from "@/lib/seo";
import { Metadata } from "next";
import DevToFeed from "@/components/DevToFeed";
import EzoicPlaceholder from "@/components/EzoicPlaceholder";

export const metadata: Metadata = constructMetadata({
    canonicalUrl: SITE_URL,
});

export default function Home() {
    const categories = getAllCategories();

    // Aggregate all posts from all categories
    let allPosts: Post[] = [];
    categories.forEach(category => {
        const posts = getAllPosts(category);
        allPosts = [...allPosts, ...posts];
    });

    // Sort by date descending
    allPosts.sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return (
        <main className="min-h-screen bg-gray-100 dark:bg-black">
            {/* Header / Nav would go here if not in Layout */}

            {/* Main Feed Area */}
            <div className="pt-4">
                <DevToFeed posts={allPosts} categories={categories} />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8 text-center">
                <VisitorBadge path="" />
            </div>
        </main>
    );
}
