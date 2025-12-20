import { MetadataRoute } from 'next';
import { getAllCategories, getAllPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
    const categories = getAllCategories();
    const baseUrl = SITE_URL;

    // Static routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 1,
    }));

    // Category routes
    const categoryRoutes = categories.map((category) => ({
        url: `${baseUrl}/${category}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // Post routes
    let postRoutes: MetadataRoute.Sitemap = [];
    categories.forEach((category) => {
        const posts = getAllPosts(category);
        const categoryPostRoutes = posts.map((post) => ({
            url: `${baseUrl}/${category}/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }));
        postRoutes = [...postRoutes, ...categoryPostRoutes];
    });

    return [...routes, ...categoryRoutes, ...postRoutes];
}
