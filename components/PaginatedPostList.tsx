"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/posts"; // Ensure this matches your type definition path

const ITEMS_per_PAGE = 9;

export default function PaginatedPostList({ posts, category }: { posts: Post[]; category: string }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(posts.length / ITEMS_per_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_per_PAGE;
    const currentPosts = posts.slice(startIndex, startIndex + ITEMS_per_PAGE);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        scrollToTop();
    };

    if (posts.length === 0) {
        return <p className="text-gray-600">No articles found in this category yet.</p>;
    }

    return (
        <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post) => (
                    <Link key={post.slug} href={`/${category}/${post.slug}`} className="block group h-full">
                        <article className="border border-gray-100 bg-white rounded-lg p-6 hover:shadow-lg transition h-full flex flex-col">
                            <div className="mb-4">
                                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-2 py-1 rounded">
                                    {post.category?.replace(/-/g, " ") || category}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-sky-600 line-clamp-2">
                                {post.title}
                            </h2>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                {post.description}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                <span>{post.author || 'FinScope Team'}</span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-12 pt-8 border-t border-gray-100">
                    <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Previous
                    </button>
                    <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 rounded text-sm flex items-center justify-center transition ${currentPage === page
                                        ? "bg-sky-600 text-white font-medium"
                                        : "hover:bg-gray-50 text-gray-600"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
