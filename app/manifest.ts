import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'FinScope',
        short_name: 'FinScope',
        description: 'Your guide to credit cards, personal loans, and financial freedom.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0284c7',
        icons: [
            {
                src: '/icon',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/apple-icon',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    };
}
