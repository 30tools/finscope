import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
            <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white text-lg font-bold mb-4">FinScope</h3>
                    <p className="text-sm">Your trusted guide to financial freedom. Owned and operated by unstory.app.</p>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-4">Products</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/credit-cards" className="hover:text-white">Credit Cards</Link></li>
                        <li><Link href="/personal-loans" className="hover:text-white">Personal Loans</Link></li>
                        <li><Link href="/insurance" className="hover:text-white">Insurance</Link></li>
                        <li><Link href="/tools" className="hover:text-white font-medium text-yellow-500">All Tools</Link></li>
                        <li><Link href="https://finscope-calculators.strivio.world/" className="hover:text-white text-blue-400 font-medium" target="_blank" rel="noopener noreferrer">Free Calculators ↗</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/credit-score" className="hover:text-white">Credit Score</Link></li>
                        <li><Link href="/tax-saving" className="hover:text-white">Tax Saving</Link></li>
                        <li><Link href="/banking" className="hover:text-white">Banking</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-medium mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                        <li><Link href="/terms" className="hover:text-white">Terms of Use</Link></li>
                        <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
                        <li><Link href="/cookie-policy" className="hover:text-white">Cookie Policy</Link></li>
                        <li><Link href="/dmca" className="hover:text-white">DMCA</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 border-t border-gray-800 mt-12 pt-8 text-sm text-center">
                © {new Date().getFullYear()} FinScope. All rights reserved.
            </div>
        </footer>
    );
}
