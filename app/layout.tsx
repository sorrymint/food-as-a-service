import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { getUser, getTeamForUser } from "@/lib/db/queries";
// @ts-ignore
import { SWRConfig } from "swr";

// 🔹 NEW: Import your Header
import DineDirectHeader from "@/components/DineDirectHeader";

export const metadata: Metadata = {
  title: "Next.js SaaS Starter",
  description: "Get started quickly with Next.js, Postgres, and Stripe.",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html
          lang="en"
          className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
      >
      <body className="min-h-[100dvh] bg-gray-50">
      <SWRConfig
          value={{
            fallback: {
              "/api/user": getUser(),
              "/api/team": getTeamForUser(),
            },
          }}
      >
        {/* 🔹 NEW: Show Header globally */}
        <DineDirectHeader />

        {/* Page content */}
        {children}
      </SWRConfig>
      </body>
      </html>
  );
}
