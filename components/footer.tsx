"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t mt-30">
            <div className="px-10 py-12 flex flex-col text-center gap-2 sm:flex-row sm:text-left sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold">LOGO</h2>
                </div>

                <Link href="/footerLinks/aboutUs">About Us</Link>
                <Link href="/footerLinks/locations">Locations</Link>
                <Link href="/footerLinks/employment">Employment</Link>
                <Link href="/footerLinks/contact">Contact</Link>
            </div>

      
            <div className="max-w-7xl mx-auto px-10 pb-6">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-start sm:items-center sm:gap-6 text-sm text-gray-700">
                    <Link href="/footerLinks/privacyPolicy">Privacy Policy</Link>
                    <p>© 2025 FoodService</p>
                </div>
            </div>
        </footer>
    );
}