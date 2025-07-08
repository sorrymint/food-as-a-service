'use client';
import AdminButtonManager from "@/components/ui/button";

import Link from 'next/link';
import { use, useState, Suspense, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CircleIcon, Home, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/db/schema';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push('/');
  }

  if (!user) {
    return (
        <>
          <Link
              href="/pricing"
              className="text-sm font-medium text-gray-900 md:hover:bg-gray-200 md:px-3 md:py-2 rounded-2xl"
          >
            Pricing
          </Link>
          <Button asChild className="rounded-full">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </>
    );
  }

  return (
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer size-9">
            <AvatarImage alt={user.name || ''} />
            <AvatarFallback>
              {user.email
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-1">
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/dashboard" className="flex w-full items-center">
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          {/* Admin Sidebar Edit Option */}
          {user.role === 'admin' && (
              <DropdownMenuItem
                  onClick={() => {
                    localStorage.setItem('sidebarEditMode', 'true');
                    window.dispatchEvent(new Event('sidebarEditModeChanged'));
                  }}
                  className="cursor-pointer text-blue-600"
              >
                <CircleIcon className="mr-2 h-4 w-4" />
                <span>Edit Sidebar</span>
              </DropdownMenuItem>
          )}

          <form action={handleSignOut} className="w-full">
            <button type="submit" className="flex w-full">
              <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
