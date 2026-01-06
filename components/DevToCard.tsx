import Link from "next/link";
import { Post } from "@/lib/posts";
import { MessageCircle, Heart, Bookmark } from "lucide-react";

export default function DevToCard({ post, isHero = false }: { post: Post; isHero?: boolean }) {
    const imageUrl = `https://v1.screenshot.11ty.dev/${encodeURIComponent(`https://unstory.app/${post.category}/${post.slug}`)}/opengraph/`;

    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow">
            {/* Hero Image - Only for the first item if specificed, or we can make it optional */}
            {isHero && (
                <Link href={`/${post.category}/${post.slug}`} className="block w-full aspect-[2/1] overflow-hidden">
                    <img 
                        src={imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                    />
                </Link>
            )}

            <div className="p-4 sm:p-5">
                {/* Author Info */}
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white mr-2">
                        {(post.author?.[0] || 'U').toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 p-1 rounded -ml-1 transition cursor-pointer">
                            {post.author || 'Unstory Team'}
                        </span>
                        <time className="text-xs text-gray-500 ml-1" dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </time>
                    </div>
                </div>

                {/* Content */}
                <div className="pl-0 sm:pl-10">
                    <Link href={`/${post.category}/${post.slug}`} className="group block">
                        <h2 className={`font-bold text-gray-900 dark:text-zinc-100 hover:text-blue-700 dark:hover:text-blue-400 transition-colors mb-1 ${isHero ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                            {post.title}
                        </h2>
                    </Link>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.keywords?.slice(0, 4).map(tag => (
                            <span key={tag} className="text-sm text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10 p-1 rounded transition cursor-pointer">
                                #{tag.replace(/\s+/g, '')}
                            </span>
                        ))}
                    </div>

                    {/* Footer / Actions */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-zinc-400">
                            <button className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-white/10 px-2 py-1 rounded transition">
                                <Heart className="w-4 h-4" />
                                <span>{Math.floor(Math.random() * 50) + 5} reactions</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-white/10 px-2 py-1 rounded transition">
                                <MessageCircle className="w-4 h-4" />
                                <span>{Math.floor(Math.random() * 10)} comments</span>
                            </button>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 space-x-2">
                             <span className="hidden sm:inline-block">3 min read</span>
                             <button className="p-2 hover:bg-gray-100 dark:hover:bg-blue-900/30 rounded transition text-gray-600 dark:text-zinc-400 hover:text-blue-700">
                                <Bookmark className="w-4 h-4" />
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
