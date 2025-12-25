import { getAllPosts } from "@/lib/posts";
import PaginatedPostList from "@/components/PaginatedPostList";
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
    "budgeting",
    "investing",
    "debt",
    "earning",
    "mindset",
    "saving",
    "wealth-building",
    "career",
];

export function generateStaticParams() {
    return VALID_CATEGORIES.map((category) => ({
        category,
    }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
    const category = (await params).category;
    if (!VALID_CATEGORIES.includes(category)) return {};

    const title = `${category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Guides | Unstory`;
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

            <PaginatedPostList posts={posts} category={category} />
        </div>
    );
}
