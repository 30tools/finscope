import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Editorial Policy | Unstory',
    description: 'Learn about the editorial standards and content creation process at Unstory.',
};

export default function EditorialPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl font-sans">
            <h1 className="text-4xl font-bold mb-8">Editorial Policy</h1>
            <div className="prose prose-lg text-gray-700 leading-relaxed space-y-6">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Accuracy</h2>
                    <p>
                        At Unstory, our mission is to provide the most accurate, unbiased, and actionable financial information available.
                        Every article we publish undergoes a rigorous editorial process to ensure it meets our high standards of quality and integrity.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Independent Journalism</h2>
                    <p>
                        Our editorial team is strictly separated from our business and advertising departments.
                        No advertiser, partner, or third party has any influence over the content we create or the opinions we express.
                        We do not accept payment in exchange for positive reviews or specific rankings.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Production Workflow</h2>
                    <p>
                        1. **Research**: Our writers use primary sources, government data, and direct communications with financial providers to gather information.
                    </p>
                    <p>
                        2. **Drafting**: Content is written by experts with deep knowledge in their respective fields.
                    </p>
                    <p>
                        3. **Fact-Checking**: Every data point, rate, and claim is verified by a second pair of eyes.
                    </p>
                    <p>
                        4. **Final Review**: An editor reviews the piece for clarity, tone, and adherence to our editorial voice before publication.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Disclosure</h2>
                    <p>
                        While we may use AI tools to assist with data organization and research, all final content is human-written, human-edited, and human-verified.
                        We do not publish unmediated AI-generated content.
                    </p>
                </section>
            </div>
        </div>
    );
}
