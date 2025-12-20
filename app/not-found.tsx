import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">404</h1>
                <h2 className="text-4xl font-bold text-gray-900 mt-4">Page Not Found</h2>
                <p className="text-gray-600 mt-4 max-w-lg mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    href="/"
                    className="inline-block mt-8 px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
