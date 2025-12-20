import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';
export const dynamic = 'force-static';

// Image metadata
export const size = {
    width: 180,
    height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 100,
                    background: '#0284c7', // Sky-600
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '20%', // Slightly rounded square for iOS
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
