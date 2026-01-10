import { NextRequest, NextResponse } from 'next/server';

const YTDOWN_BASE_URL = 'https://ytdown.to/proxy.php';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { url, action } = body;

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        if (!action || !['info', 'download'].includes(action)) {
            return NextResponse.json(
                { error: 'Invalid action. Must be "info" or "download"' },
                { status: 400 }
            );
        }

        // Construct FormData for ytdown.to
        const formData = new URLSearchParams();
        formData.append('url', url);

        console.log(`[Proxy] Action: ${action}, URL: ${url}`);

        const response = await fetch(YTDOWN_BASE_URL, {
            method: 'POST',
            headers: {
                'Origin': 'https://ytdown.to',
                'Referer': 'https://ytdown.to/en2/',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            body: formData.toString(),
        });

        if (!response.ok) {
            console.error(`[Proxy] Upstream error: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: `Upstream error: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('[Proxy] Internal Handler Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
