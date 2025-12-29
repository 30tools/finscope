"use client";

/**
 * SearchVerifyWidget
 * 
 * NOTE: Logic has been moved to GlobalVerifyOverlay. 
 * This component now strictly serves as a visual placeholder/instruction block
 * for the SEO pages while the Global Overlay handles the actual state and timer.
 */
export default function SearchVerifyWidget() {
    return (
        <div className="my-10 p-8 bg-zinc-50 dark:bg-zinc-900 border-2 border-dashed border-blue-200 dark:border-zinc-700 rounded-2xl text-center shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Verification Required</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                To access your secure link, please check the verification box at the bottom of your screen and follow the instructions.
            </p>
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-blue-100 dark:border-zinc-800 inline-block">
                <p className="text-sm font-medium text-blue-600">Verification Widget Active ↓</p>
            </div>
        </div>
    );
}
