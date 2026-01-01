import { getAllPosts, getPostBySlug, getRelatedPosts, getAllCategories } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { constructMetadata } from "@/lib/seo";
import { generateArticleSchema, generateBreadcrumbSchema, generateReviewSchema, generateSpeakableSchema, generateRecipeSchema } from "@/lib/schema";
import ArticleLayout from "@/components/ArticleLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { cn } from "@/lib/utils";
import AuthorBio from "@/components/AuthorBio";
import VisitorBadge from "@/components/VisitorBadge";
import AIImagePoster from "@/components/AIImagePoster";
import EzoicPlaceholder from "@/components/EzoicPlaceholder";
import { SITE_URL } from "@/lib/seo";

// Custom components for MDX
const components = {
    // Add any custom components here
    AdSlot: AdSlot,
    AIImagePoster: AIImagePoster,
    EzoicPlaceholder: EzoicPlaceholder,
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
    const categories = getAllCategories();
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

    const ogImage = `https://v1.screenshot.11ty.dev/${encodeURIComponent(`${SITE_URL}/${category}/${slug}`)}/opengraph/`;

    return constructMetadata({
        title: `${post.title} | Unstory`,
        description: post.description,
        image: ogImage,
        canonicalUrl: `${SITE_URL}/${category}/${slug}`,
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
                        image: `https://v1.screenshot.11ty.dev/${encodeURIComponent(`${SITE_URL}/${category}/${slug}`)}/opengraph/`,
                        isNews: true,
                    })),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.name, item: b.href })))),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateSpeakableSchema(['h1', '.prose p:first-of-type'])),
                }}
            />
            {['credit-cards', 'personal-loans', 'banking'].includes(post.category) && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateReviewSchema({
                            title: post.title,
                            author: post.author,
                            rating: 4.5
                        })),
                    }}
                />
            )}
            {post.category === 'food' && post.recipeIngredient && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateRecipeSchema({
                            title: post.title,
                            description: post.description,
                            image: [`https://v1.screenshot.11ty.dev/${encodeURIComponent(`${SITE_URL}/${category}/${slug}`)}/opengraph/`],
                            author: post.author,
                            publishedAt: post.publishedAt,
                            prepTime: post.prepTime,
                            cookTime: post.cookTime,
                            totalTime: post.totalTime,
                            recipeYield: post.recipeYield,
                            recipeIngredient: post.recipeIngredient,
                            recipeInstructions: post.recipeInstructions || [],
                            recipeCategory: post.recipeCategory || 'Healthy Food',
                            recipeCuisine: post.recipeCuisine || 'General',
                            keywords: post.keywords.join(', ')
                        })),
                    }}
                />
            )}

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <Breadcrumbs items={breadcrumbs} />

                <header className="mb-8 max-w-4xl">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 lh-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                        <span className="font-medium text-gray-900">By {post.author}</span>
                        <span>•</span>
                        <time dateTime={post.publishedAt}>Published: {new Date(post.publishedAt).toLocaleDateString()}</time>
                        {post.updatedAt !== post.publishedAt && (
                            <>
                                <span>•</span>
                                <time dateTime={post.updatedAt} className="text-blue-600 font-medium italic">Updated: {new Date(post.updatedAt).toLocaleDateString()}</time>
                            </>
                        )}
                    </div>
                </header>

                <AdSlot type="display" className="mb-8" />

                <ArticleLayout toc={toc}>
                    {/* Top Ad Placeholder */}
                    <div className="mb-6">
                        <EzoicPlaceholder id="101" />
                    </div>

                    <MDXRemote
                        source={post.content.replace(/\n\n/, `\n\n<AIImagePoster title="${post.title}" />\n\n`)}
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

                    {/* Bottom Ad Placeholder */}
                    <div className="mt-8">
                        <EzoicPlaceholder id="102" />
                    </div>

                    <VisitorBadge path={`/${category}/${slug}`} />
                </ArticleLayout>

                <AuthorBio
                    name={post.author}
                    role="Senior Financial Analyst"
                    bio="Expert in personal finance, wealth building strategies, and the FIRE movement. Helping thousands write their own financial Unstory."
                    twitter="https://twitter.com/unstoryapp"
                    linkedin="https://linkedin.com/company/unstory"
                />

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
