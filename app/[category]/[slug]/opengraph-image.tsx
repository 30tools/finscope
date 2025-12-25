import { ImageResponse } from 'next/og';
import { getPostBySlug, getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';
export const alt = 'Unstory Article';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

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

export default async function Image({ params }: { params: { category: string; slug: string } }) {
    const { category, slug } = await params;
    const post = getPostBySlug(category, slug);

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 40,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: 80,
                    borderBottom: '20px solid #0284c7',
                }}
            >
                <div style={{ display: 'flex', fontSize: 30, color: '#0284c7', marginBottom: 20, textTransform: 'uppercase', fontWeight: 900, fontFamily: 'sans-serif' }}>
                    Unstory • {post?.category?.replace(/-/g, ' ')}
                </div>
                <div style={{ display: 'flex', fontSize: 70, fontWeight: 900, color: '#111', lineHeight: 1.1, marginBottom: 40, fontFamily: 'sans-serif' }}>
                    {post?.title || 'Finance Insights'}
                </div>
                <div style={{ display: 'flex', fontSize: 30, color: '#666', fontFamily: 'sans-serif' }}>
                    By {post?.author || 'Unstory Team'}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
