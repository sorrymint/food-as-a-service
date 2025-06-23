import Link from "next/link"
import ShoppingCart from '@/components/ui/shopingcart';
import { Suspense } from "react";


export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
        {/*TODO you can add this back later: <SidebarTrigger />*/}
        <Link href="/" className="flex items-center ml-2 text-xl font-semibold text-gray-900">
          LOGO
        </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Suspense fallback={<div className="h-9" />}>
            <ShoppingCart/>
            {/*TODO you can add this back later: <UserMenu />*/}
          </Suspense>
        </div>
      </div>
    </header>
  );
}
