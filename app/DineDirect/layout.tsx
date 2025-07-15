'use client'

import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Footer from '@/components/ui/Footer';


export default function Layout ({children} : { children: React.ReactNode }){
    return (
        <section className='flex flex-col min-h-screen '>
            <SidebarProvider>
                <AppSidebar />
                    <main className='w-full'>
                        <PlaceHolderHeader/>
                        {children}
                        <Footer/>
                    </main>
            </SidebarProvider>
        </section>
    )
}

function PlaceHolderHeader(){
    return (
        <header className='flex justify-between items-center px-8 py-3'>
            <SidebarTrigger/>
            <Button>Button</Button>
        </header>
    );
}

