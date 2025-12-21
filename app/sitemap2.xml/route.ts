import { getAllCategories, getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

const BASE_URL = "https://finscope.strivio.world";

export async function GET() {
    const categories = getAllCategories();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static Routes
    const staticRoutes = ['', '/about', '/contact', '/privacy-policy', '/terms'];
    staticRoutes.forEach(route => {
        xml += `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;
    });

    // Categories and Posts
    categories.forEach(category => {
        xml += `
  <url>
    <loc>${BASE_URL}/${category}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

        const posts = getAllPosts(category);
        posts.forEach(post => {
            xml += `
  <url>
    <loc>${BASE_URL}/${category}/${post.slug}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
        });
    });

    xml += `
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
