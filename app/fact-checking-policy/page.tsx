import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fact-Checking Policy | Unstory',
    description: 'Learn about our rigorous fact-checking process at Unstory.',
};

export default function FactCheckingPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl font-sans">
            <h1 className="text-4xl font-bold mb-8">Fact-Checking Policy</h1>
            <div className="prose prose-lg text-gray-700 leading-relaxed space-y-6">
                <p>
                    Accuracy is the bedrock of financial advice. At Unstory, we go to great lengths to ensure every
                    number, claim, and recommendation is backed by verifiable data.
                </p>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Primary Sources</h2>
                    <p>
                        We prioritize primary sources over secondary ones. This includes:
                        <ul className="list-disc ml-6 mt-2 space-y-2">
                            <li>Official government websites (IRS, SEC, RBI, etc.).</li>
                            <li>Direct product terms and conditions from banks and lenders.</li>
                            <li>Academic research and peer-reviewed financial studies.</li>
                            <li>Direct interviews with certified financial experts.</li>
                        </ul>
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Verfication Process</h2>
                    <p>
                        Before publication, a dedicated researcher or editor cross-references all specific data points against original sources.
                        If a source cannot be verified, the information is removed or marked as unverified.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Transparency</h2>
                    <p>
                        Whenever possible, we link directly to the sources we use so that you can verify the information yourself.
                        We believe in "showing our work."
                    </p>
                </section>
            </div>
        </div>
    );
}
