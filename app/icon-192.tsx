import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';
export const dynamic = 'force-static';

// Image metadata
export const size = {
    width: 192,
    height: 192,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 120,
                    background: '#0284c7', // Sky-600
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '20%',
                }}
            >
                F
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
