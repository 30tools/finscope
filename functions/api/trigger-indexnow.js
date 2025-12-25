export async function onRequestPost({ request }) {
    const API_KEY = '6770db5397184cacb0c3ea38d9827e06';
    const KEY_LOCATION = 'https://wify.my/6770db5397184cacb0c3ea38d9827e06.txt';
    const DEFAULT_HOST = 'wify.my';

    try {
        const { urls, host } = await request.json();

        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return new Response(JSON.stringify({ error: 'No URLs provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const hostToUse = host || DEFAULT_HOST;

        const payload = {
            host: hostToUse,
            key: API_KEY,
            keyLocation: KEY_LOCATION,
            urlList: urls
        };

        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(payload),
        });

        if (response.status === 200 || response.status === 202) {
            return new Response(JSON.stringify({ success: true, count: urls.length, message: 'Submitted successfully to IndexNow' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            const text = await response.text();
            return new Response(JSON.stringify({ error: `IndexNow API Error: ${response.status}`, details: text }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
