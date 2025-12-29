import { getAllPosts, getAllCategories } from "@/lib/posts";
import PaginatedPostList from "@/components/PaginatedPostList";
import Link from "next/link";
import VisitorBadge from "@/components/VisitorBadge";
import { notFound } from "next/navigation";
import { capitalize } from "@/lib/utils"; // We might need to add capitalize to utils or generic
import { constructMetadata, SITE_URL } from "@/lib/seo";
import { generateCollectionPageSchema } from "@/lib/schema";

const getCategories = () => {
    return getAllCategories();
};

export function generateStaticParams() {
    const categories = getCategories();
    return categories.map((category) => ({
        category,
    }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
    const category = (await params).category;
    // You can add validation here if needed, but since we are generating from existing folders, it might be redundant for SSG.
    // Ideally, check if category exists.
    const categories = getCategories();
    if (!categories.includes(category)) return {};

    const title = `${category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Guides | Unstory`;
    return constructMetadata({
        title,
        description: `Read the best guides and tips about ${category.replace("-", " ")}.`,
        canonicalUrl: `${SITE_URL}/${category}`,
    });
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const category = (await params).category;
    const categories = getCategories();

    if (!categories.includes(category)) {
        notFound();
    }

    const posts = getAllPosts(category);

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateCollectionPageSchema({
                        name: `${capitalize(category.replace(/-/g, " "))} Guides`,
                        description: `Read the best guides and tips about ${category.replace("-", " ")}.`,
                        url: `${SITE_URL}/${category}`,
                        items: posts.map(post => ({
                            name: post.title,
                            url: `${SITE_URL}/${category}/${post.slug}`,
                            description: post.description
                        }))
                    })),
                }}
            />
            <h1 className="text-4xl font-bold mb-8 capitalize">{category.replace(/-/g, " ")}</h1>

            <PaginatedPostList posts={posts} category={category} />
            <VisitorBadge path={`/${category}`} />
        </div>
    );
}
