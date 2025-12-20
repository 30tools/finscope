import Link from "next/link";
import { getAllCategories, getAllPosts, Post } from "@/lib/posts";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

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
                        FinScope
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
                        allPosts.map((post) => (
                            <article key={post.slug} className="group flex flex-col items-start">
                                <div className="flex items-center gap-x-4 text-xs mb-3">
                                    <time dateTime={post.publishedAt} className="text-gray-500">
                                        {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                                    </time>
                                    <Link
                                        href={`/${post.category}`}
                                        className="relative z-10 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600 hover:bg-gray-200 uppercase tracking-wider text-[10px]"
                                    >
                                        {post.category.replace('-', ' ')}
                                    </Link>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-sky-600 transition-colors">
                                        <Link href={`/${post.category}/${post.slug}`}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                                        {post.description}
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center gap-x-2 text-sky-600 font-medium text-sm group-hover:underline">
                                    Read Article <ArrowRight className="w-4 h-4" />
                                </div>
                            </article>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10">No articles found. Check back later!</p>
                    )}
                </div>
            </div>
        </main>
    );
}

