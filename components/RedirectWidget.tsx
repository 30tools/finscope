"use client";

/**
 * RedirectWidget
 * 
 * NOTE: Logic has been moved to GlobalVerifyOverlay. 
 * This component now strictly serves as a visual placeholder/instruction block
 * for the SEO pages while the Global Overlay handles the actual state and timer.
 */
export default function RedirectWidget() {
    return (
        <div className="my-10 p-8 bg-zinc-50 dark:bg-zinc-900 border-2 border-dashed border-blue-200 dark:border-zinc-700 rounded-2xl text-center shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Link Generation Active</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
                Your secure video/download link is being prepared.
            </p>
            <div className="flex justify-center flex-col items-center space-y-2">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">See Sidebar or Bottom for Controls</p>
            </div>
        </div>
    );
}
