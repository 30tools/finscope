"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Post } from "@/lib/posts";
import { Suspense } from "react";

export default function PaginatedPostList(props: any) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaginatedPostListContent {...props} />
        </Suspense>
    );
}

function PaginatedPostListContent({
    posts,
    category,
    itemsPerPage = 9
}: {
    posts: Post[];
    category?: string;
    itemsPerPage?: number;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get current page from URL or default to 1
    const currentPage = Number(searchParams.get("page")) || 1;

    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageChange = (page: number) => {
        // Create new params object to preserve other potential params
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());

        router.push(`?${params.toString()}`, { scroll: false });
        scrollToTop();
    };

    if (posts.length === 0) {
        return <p className="text-gray-600">No articles found in this category yet.</p>;
    }

    return (
        <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post) => {
                    const imageUrl = `https://v1.screenshot.11ty.dev/${encodeURIComponent(`https://unstory.app/${post.category}/${post.slug}`)}/opengraph/`;

                    return (
                        <Link key={post.slug} href={`/${post.category || category}/${post.slug}`} className="block group h-full">
                            <article className="h-full flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                {/* Image Container */}
                                <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                    <img
                                        src={imageUrl}
                                        alt={post.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                                            {post.category?.replace(/-/g, " ") || category?.replace(/-/g, " ")}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow p-6">
                                    <h2 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                                        {post.title}
                                    </h2>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] mobile:text-[10px] font-bold text-white">
                                                {(post.author?.[0] || 'U').toUpperCase()}
                                            </div>
                                            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                                {post.author || 'Unstory Team'}
                                            </span>
                                        </div>
                                        <time className="text-xs text-zinc-400 font-medium" dateTime={post.publishedAt}>
                                            {new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </time>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    )
                })}
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
