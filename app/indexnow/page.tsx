"use client";

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function IndexNowPage() {
    const [status, setStatus] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [customUrls, setCustomUrls] = useState('');
    const [host, setHost] = useState('wify.my');

    // Generate full list of URLs based on the selected host
    const generateAllUrls = () => {
        // This is a simplified list. ideally fetched from an API or shared constant
        const categories = [
            'credit-cards', 'personal-loans', 'credit-score', 'insurance', 'tax-saving', 'banking'
        ];
        const staticRoutes = ['', '/about', '/contact', '/privacy-policy', '/terms', '/news', '/tools'];

        const urls = staticRoutes.map(r => `https://${host}${r}`);
        categories.forEach(c => urls.push(`https://${host}/${c}`));

        return urls;
    };

    const handleSubmit = async (urls: string[]) => {
        setIsLoading(true);
        setStatus('Submitting...');
        try {
            const res = await fetch('/api/trigger-indexnow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ urls, host }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus(`✅ Success! Submitted ${data.count} URLs.`);
            } else {
                setStatus(`❌ Error: ${data.details || data.error}`);
            }
        } catch (error: any) {
            setStatus(`❌ Network Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitAll = () => {
        const urls = generateAllUrls();
        if (confirm(`Submit ${urls.length} URLs for ${host} to IndexNow?`)) {
            handleSubmit(urls);
        }
    };

    const handleSubmitCustom = () => {
        const urls = customUrls.split('\n').map(u => u.trim()).filter(u => u.length > 0);
        if (urls.length === 0) return alert("Please enter at least one URL");
        handleSubmit(urls);
    };

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Breadcrumbs items={[{ name: "IndexNow", href: "/indexnow" }]} />

                <h1 className="text-3xl font-bold mb-6 mt-6 text-zinc-900 dark:text-white">IndexNow Submitter</h1>
                <p className="mb-8 text-zinc-600">Instantly notify search engines (Bing, Yandex, etc.) about content updates.</p>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
                    <label className="block text-sm font-bold text-blue-900 mb-2">Target Host</label>
                    <select
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                        className="w-full p-2 rounded border border-blue-200"
                    >
                        <option value="wify.my">wify.my (Primary)</option>
                        <option value="finscope.strivio.world">finscope.strivio.world (Secondary)</option>
                    </select>
                </div>

                <div className="grid gap-8">
                    {/* Auto Submit Section */}
                    <div className="border p-6 rounded-xl bg-gray-50 dark:bg-zinc-900">
                        <h2 className="text-xl font-bold mb-4">🚀 Quick Submit</h2>
                        <p className="text-sm text-gray-500 mb-4">Publishes all main category and static pages.</p>
                        <button
                            onClick={handleSubmitAll}
                            disabled={isLoading}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full transition disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Publish All URLs'}
                        </button>
                    </div>

                    {/* Custom Submit Section */}
                    <div className="border p-6 rounded-xl bg-gray-50 dark:bg-zinc-900">
                        <h2 className="text-xl font-bold mb-4">📝 Custom Submit</h2>
                        <textarea
                            value={customUrls}
                            onChange={(e) => setCustomUrls(e.target.value)}
                            placeholder={`https://${host}/new-page\nhttps://${host}/another-page`}
                            className="w-full h-40 p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 mb-4 font-mono text-sm"
                        />
                        <button
                            onClick={handleSubmitCustom}
                            disabled={isLoading}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Publish Custom List'}
                        </button>
                    </div>
                </div>

                {/* Status Output */}
                {status && (
                    <div className={`mt-8 p-4 rounded-lg font-mono text-sm ${status.startsWith('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}
