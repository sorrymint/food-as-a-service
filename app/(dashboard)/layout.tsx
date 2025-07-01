'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/header';
import { SessionProvider } from 'next-auth/react';

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SessionProvider>
      <section className="flex flex-col min-h-screen">
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <main className="w-full">
            <Header />
            {children}
          </main>
        </SidebarProvider>
      </section>
    </SessionProvider>
  );
}