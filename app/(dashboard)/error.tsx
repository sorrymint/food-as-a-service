'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-6">
            <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
            <h1 className="text-4xl font-bold text-red-500 mb-4">It's not the end of the world though!</h1>
            <p className="text-lg text-gray-700 mb-6">{error.message}</p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Try Again
            </button>
        </div>
    );
}
