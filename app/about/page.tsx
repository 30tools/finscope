import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Unstory',
    description: 'Learn more about Unstory and our mission to help you achieve financial freedom.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">About Unstory</h1>
            <div className="prose prose-lg text-gray-700 leading-relaxed space-y-6">
                <p>Welcome to Unstory, your trusted guide to navigating the complex world of personal finance.</p>
                <p>Our mission is to provide unbiased, accurate, and actionable advice on credit cards, loans, insurance, and more. We believe that everyone deserves a clear path to financial freedom, free from jargon and confusing terms.</p>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Transparency & Ownership</h2>
                    <p>
                        Unstory is a fully independent publishing platform owned and operated by **Unstory.app**.
                        We are a self-funded organization, which allows us to maintain absolute editorial independence.
                        We do not have any investors from the banking or loan industries, ensuring that our recommendations are always in the best interest of our readers.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Make Money</h2>
                    <p>
                        To keep our content free for everyone, we earn revenue through display advertising and affiliate partnerships.
                        When you click on a link or apply for a product through our site, we may receive a small commission at no extra cost to you.
                        However, our editorial integrity is paramount: our reviews and rankings are never influenced by our partners.
                    </p>
                </section>
            </div>
        </div>
    );
}
