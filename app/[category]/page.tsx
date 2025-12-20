import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import { capitalize } from "@/lib/utils"; // We might need to add capitalize to utils or generic
import { constructMetadata } from "@/lib/seo";

// For now, hardcode valid categories or derive from getAllCategories if strictly dynamic. 
// However, generateStaticParams needs to know them.
const VALID_CATEGORIES = [
    "credit-cards",
    "personal-loans",
    "credit-score",
    "insurance",
    "tax-saving",
    "banking",
];

export function generateStaticParams() {
    return VALID_CATEGORIES.map((category) => ({
        category,
    }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
    const category = (await params).category;
    if (!VALID_CATEGORIES.includes(category)) return {};

    const title = `${category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Guides | FinScope`;
    return constructMetadata({
        title,
        description: `Read the best guides and tips about ${category.replace("-", " ")}.`,
    });
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const category = (await params).category;

    if (!VALID_CATEGORIES.includes(category)) {
        notFound();
    }

    const posts = getAllPosts(category);

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <h1 className="text-4xl font-bold mb-8 capitalize">{category.replace(/-/g, " ")}</h1>

            {posts.length === 0 ? (
                <p>No articles found in this category yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/${category}/${post.slug}`} className="block group">
                            <article className="border rounded-lg p-6 hover:shadow-lg transition">
                                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600">{post.title}</h2>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>
                                <span className="text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</span>
                            </article>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
