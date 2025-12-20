import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | FinScope',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <div className="prose prose-sm">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>At FinScope, we prioritize your privacy...</p>
                {/* Add actual policy text later */}
            </div>
        </div>
    );
}
