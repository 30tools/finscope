import Link from 'next/link';

export default function Header() {
    return (
        <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tight text-blue-900">
                    Unstory
                </Link>
                <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                    <Link href="/credit-cards" className="hover:text-blue-600 transition">Credit Cards</Link>
                    <Link href="/personal-loans" className="hover:text-blue-600 transition">Personal Loans</Link>
                    <Link href="/credit-score" className="hover:text-blue-600 transition">Credit Score</Link>
                    <Link href="/insurance" className="hover:text-blue-600 transition">Insurance</Link>
                    <Link href="/tax-saving" className="hover:text-blue-600 transition">Tax Saving</Link>
                </nav>
                {/* Mobile menu button would go here */}
            </div>
        </header>
    );
}
