import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Unstory',
    description: 'Learn more about Unstory and our mission to help you achieve financial freedom.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">About Unstory</h1>
            <div className="prose prose-lg">
                <p>Welcome to Unstory, your trusted guide to navigating the complex world of personal finance.</p>
                <p>Our mission is to provide unbiased, accurate, and actionable advice on credit cards, loans, insurance, and more.</p>
            </div>
        </div>
    );
}
