import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';

export const alt = 'FinScope Article';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

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
                <div style={{ fontSize: 30, color: '#0284c7', marginBottom: 20, textTransform: 'uppercase', fontWeight: 900, fontFamily: 'sans-serif' }}>
                    FinScope • {post?.category?.replace(/-/g, ' ')}
                </div>
                <div style={{ fontSize: 70, fontWeight: 900, color: '#111', lineHeight: 1.1, marginBottom: 40, fontFamily: 'sans-serif' }}>
                    {post?.title || 'Finance Insights'}
                </div>
                <div style={{ fontSize: 30, color: '#666', fontFamily: 'sans-serif' }}>
                    By {post?.author || 'FinScope Team'}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
