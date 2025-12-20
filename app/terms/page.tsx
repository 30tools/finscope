import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | FinScope',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
            <div className="prose prose-sm">
                <p>By accessing FinScope, you agree to these terms...</p>
            </div>
        </div>
    );
}
