"use client";

import { Post } from "@/lib/posts";
import Link from "next/link";
import { useState } from "react";
import DevToCard from "./DevToCard";
import { Home, Hash, Zap, Trophy, TrendingUp, Search } from "lucide-react";

const SIDEBAR_LEFT_LINKS = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Zap, label: "Latest", href: "/news" },
    { icon: Hash, label: "Tags", href: "/categories" },
    { icon: Trophy, label: "Top Best", href: "/trending" },
];

export default function DevToFeed({ posts, categories }: { posts: Post[], categories: string[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Pagination Logic
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const visiblePosts = posts.slice(0, currentPage * itemsPerPage);

    const loadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div className="max-w-[1380px] mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_320px] gap-4">

            {/* LEFT SIDEBAR (Hidden on mobile) */}
            <aside className="hidden md:block">
                <nav className="space-y-1">
                    {SIDEBAR_LEFT_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-400 rounded-md transition-colors"
                        >
                            <link.icon className="w-5 h-5" />
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="mt-6">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 px-3 py-2">Categories</h3>
                    <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {categories.map(cat => (
                            <Link
                                key={cat}
                                href={`/${cat}`}
                                className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:underline rounded-md transition-colors"
                            >
                                # {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </aside>

            {/* MAIN FEED (Center) */}
            <main>
                <div className="mb-4 flex items-center space-x-4 overflow-x-auto pb-2 md:pb-0">
                    <button className="px-3 py-2 font-bold text-gray-900 dark:text-white border-b-2 border-transparent hover:bg-white hover:text-blue-700 rounded-md transition">Relevant</button>
                    <button className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-white hover:text-blue-700 rounded-md transition">Latest</button>
                    <button className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-white hover:text-blue-700 rounded-md transition">Top</button>
                </div>

                <div className="space-y-2">
                    {visiblePosts.map((post, index) => (
                        <DevToCard key={post.slug} post={post} isHero={index === 0} />
                    ))}
                </div>

                {currentPage < totalPages && (
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={loadMore}
                            className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-md font-medium hover:border-gray-400 hover:shadow-sm transition-all"
                        >
                            Load More Articles
                        </button>
                    </div>
                )}
            </main>

            {/* RIGHT SIDEBAR (Hidden on tablet/mobile) */}
            <aside className="hidden lg:block space-y-4">
                {/* Promo / Widget 1 */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2 border-gray-100 dark:border-zinc-800">Active Discussions</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="group cursor-pointer">
                                <h4 className="text-gray-800 dark:text-gray-200 text-sm font-medium group-hover:text-blue-600 transition-colors">
                                    Is AI replacing junior developers in 2026?
                                </h4>
                                <span className="text-xs text-gray-500">24 comments</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trending Widget */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2 border-gray-100 dark:border-zinc-800 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                        Trending 2026
                    </h3>
                    <div className="space-y-4">
                        {posts.slice(5, 10).map(p => (
                            <Link key={p.slug} href={`/${p.category}/${p.slug}`} className="block group">
                                <h4 className="text-gray-700 dark:text-gray-300 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {p.title}
                                </h4>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {p.keywords?.slice(0, 2).map(k => (
                                        <span key={k} className="text-[10px] bg-gray-100 dark:bg-zinc-800 px-1 rounded text-gray-500">#{k.split(' ')[0]}</span>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
}
