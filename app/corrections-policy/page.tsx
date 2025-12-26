import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Corrections Policy | Unstory',
    description: 'Unstory is committed to accuracy. Learn how we handle errors and updates.',
};

export default function CorrectionsPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl font-sans">
            <h1 className="text-4xl font-bold mb-8">Corrections Policy</h1>
            <div className="prose prose-lg text-gray-700 leading-relaxed space-y-6">
                <p>
                    Unstory strives for 100% accuracy. However, in the fast-moving world of finance, errors can occasionally occur.
                    When they do, we are committed to being transparent and correcting them promptly.
                </p>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Handle Errors</h2>
                    <p>
                        If we discover a substantial factual error, we will update the article and include a clear "Correction" note
                        at either the top or bottom of the page, explaining what was changed and when.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Clarifications</h2>
                    <p>
                        If the facts are correct but the wording is misleading or lacks important context,
                        we may issue a "Clarification" to ensure the reader has the full picture.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Updates</h2>
                    <p>
                        Financial rates and terms change frequently. Updates to interest rates, fees, or product features are
                        considered "Updates" rather than "Corrections." Large updates will be marked with an "Updated On" timestamp
                        at the top of the article.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Reporting an Error</h2>
                    <p>
                        We welcome feedback from our readers. If you spot an error, please contact us at
                        <strong className="ml-1 text-blue-600">contact@unstory.app</strong>.
                        Please include the URL of the article and the specific information you believe is incorrect.
                    </p>
                </section>
            </div>
        </div>
    );
}
