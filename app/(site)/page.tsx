import Link from "next/link";
import { getAllCategories, getAllPosts, Post } from "@/lib/posts";
import PaginatedPostList from "@/components/PaginatedPostList";

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
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                        Unstory
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your daily scope into the world of finance. Expert analysis on credit cards, loans, insurance, and tax saving strategies for the modern Indian investor.
                    </p>
                </div>
            </section>

            {/* Recent Posts Section */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
                    Latest Analysis
                </h2>

                <div className="grid gap-10">
                    {allPosts.length > 0 ? (
                        <PaginatedPostList posts={allPosts} itemsPerPage={30} />
                    ) : (
                        <p className="text-center text-gray-500 py-10">No articles found. Check back later!</p>
                    )}
                </div>
            </div>
        </main>
    );
}

