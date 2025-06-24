// components/DineDirectHeader/DineDirectHeader.tsx
//This is the DineDirectHeader, that is already styled
import Link from "next/link";

const DineDirectHeader = () => {
    return (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <Link href="/" className="text-orange-600 font-medium tracking-wide text-xl">
                    DineDirect
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-6 text-gray-700 text-base">
                    <Link href="/" className="hover:text-orange-500">
                        Home
                    </Link>
                    <Link href="/menu" className="hover:text-orange-500">
                        Menu
                    </Link>
                    <Link href="/#" className="hover:text-orange-500">
                        About
                    </Link>
                    <Link href="/#" className="hover:text-orange-500">
                        Contact
                    </Link>
                </nav>

                {/* Auth Buttons */}
                <div className="hidden md:flex space-x-4">
                    <Link
                        href="/login"
                        className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-50 transition"
                    >
                        Login
                    </Link>
                    <Link
                        href="/sign-up"
                        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Hamburger Menu Icon */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none"
                    aria-label="Open menu"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default DineDirectHeader;
