"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t mt-30">
            <div className="px-10 py-12 flex flex-col text-center gap-12 sm:flex-row sm:text-left sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold">LOGO</h2>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Learn More</h3>
                    <ul className="space-y-1">
                        <li><Link href="/footerLinks/aboutUs">About Us</Link></li>
                        <li><Link href="/footerLinks/locations">Locations</Link></li>
                        <li><Link href="/footerLinks/linkedIn">Linked In</Link></li>
                        <li><Link href="/footerLinks/missions">Mission</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Business</h3>
                    <ul className="space-y-1">
                        <li><Link href="/footerLinks/registerBusiness">Register Business</Link></li>
                    </ul>
                </div>
            </div>

      
            <div className="max-w-7xl mx-auto px-10 pb-6">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-start sm:items-center sm:gap-6 text-sm text-gray-700">
                    <Link href="/footerLinks/Pricing">Pricing</Link>
                    <Link href="/footerLinks/terms">Terms</Link>
                    <Link href="/footerLinks/privacyPolicy">Privacy Policy</Link>
                    <p>© 2025 FoodService</p>
                </div>
            </div>
        </footer>
    );
}