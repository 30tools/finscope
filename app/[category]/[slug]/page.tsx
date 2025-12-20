import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { constructMetadata } from "@/lib/seo";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import ArticleLayout from "@/components/ArticleLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { cn } from "@/lib/utils";

// Custom components for MDX
const components = {
    // Add any custom components here
    AdSlot: AdSlot,
    table: (props: any) => (
        <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-gray-300" {...props} />
        </div>
    ),
    th: (props: any) => <th className="border border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-left" {...props} />,
    td: (props: any) => <td className="border border-gray-300 px-4 py-2" {...props} />,
};

type Props = {
    params: {
        category: string;
        slug: string;
    };
};

export async function generateStaticParams() {
    const categories = ["credit-cards", "personal-loans", "credit-score", "insurance", "tax-saving", "banking"];
    const params: { category: string; slug: string }[] = [];

    for (const category of categories) {
        const posts = getAllPosts(category);
        for (const post of posts) {
            params.push({ category, slug: post.slug });
        }
    }

    return params;
}

export async function generateMetadata({ params }: Props) {
    const { category, slug } = await params;
    const post = getPostBySlug(category, slug);

    if (!post) return {};

    return constructMetadata({
        title: `${post.title} | FinScope`,
        description: post.description,
        image: `/og-image.jpg`, // Dynamic OG image generation can be added later
    });
}

export default async function ArticlePage({ params }: Props) {
    const { category, slug } = await params;
    const post = getPostBySlug(category, slug);

    if (!post) {
        notFound();
    }

    // Extract simple headers for TOC (Just H2 and H3 for now)
    // This is a naive regex approach suitable for simple MDX
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const toc = [];
    let match;
    while ((match = headingRegex.exec(post.content)) !== null) {
        const level = match[1].length;
        const text = match[2];
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        toc.push({ id, text, level });
    }

    const breadcrumbs = [
        { name: category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()), href: `/${category}` },
        { name: post.title, href: `/${category}/${slug}` },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateArticleSchema({
                        title: post.title,
                        description: post.description,
                        slug: post.slug,
                        category: post.category,
                        publishedAt: post.publishedAt,
                        updatedAt: post.updatedAt,
                        author: post.author,
                    })),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.name, item: b.href })))),
                }}
            />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <Breadcrumbs items={breadcrumbs} />

                <header className="mb-8 max-w-4xl">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 lh-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
                    </div>
                </header>

                <AdSlot type="display" className="mb-8" />

                <ArticleLayout toc={toc}>
                    <MDXRemote
                        source={post.content}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                                rehypePlugins: [
                                    rehypeSlug,
                                    [rehypeAutolinkHeadings, { behavior: 'wrap' }]
                                ],
                            },
                        }}
                        components={components}
                    />
                </ArticleLayout>

                <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Related Articles</h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {getRelatedPosts(post).map((relatedPost) => (
                            <Link key={relatedPost.slug} href={`/${relatedPost.category}/${relatedPost.slug}`} className="group block h-full">
                                <div className="bg-gray-50 rounded-lg p-5 h-full hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                                    <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-2">
                                        {relatedPost.category.replace('-', ' ')}
                                    </span>
                                    <h4 className="font-bold text-gray-900 group-hover:text-sky-600 mb-2 line-clamp-2">
                                        {relatedPost.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                                        {relatedPost.description}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500 mt-auto">
                                        <time dateTime={relatedPost.publishedAt}>
                                            {format(new Date(relatedPost.publishedAt), 'MMM d, yyyy')}
                                        </time>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <AdSlot type="sticky" />
            </div>
        </>
    );
}
