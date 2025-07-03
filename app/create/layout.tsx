'use client';

import { use, useState, Suspense } from 'react';
import { AppSidebar } from '@/components/app-sidebar'
import Header from '@/components/ui/header'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  
    const [open, setOpen] = useState(false)
  
    return (
    <section className="flex flex-col min-h-screen">
      <SidebarProvider defaultOpen={false} open={open}>
        <AppSidebar />
        <main className='w-full'>
          <Header />
          <div className='container mx-auto p-4'>
            {children}
          </div>
        </main>
      </SidebarProvider>
    </section>
  );
}
