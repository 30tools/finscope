import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';
export const dynamic = 'force-static';

// Image metadata
export const alt = 'Unstory - Financial Authority';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 40,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '20px solid #0284c7',
                }}
            >
                <div style={{ display: 'flex', fontSize: 120, fontWeight: 900, color: '#0284c7', letterSpacing: '-0.05em', lineHeight: 1 }}>
                    Unstory
                </div>
                <div style={{ display: 'flex', fontSize: 40, color: '#333', marginTop: 30, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Financial Clarity
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
