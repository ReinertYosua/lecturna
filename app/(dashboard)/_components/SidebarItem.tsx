'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();

  const isActive =
    (pathname === '/' && href === '/') ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-sky-200/20 rounded-xl',
        isActive &&
          'text-primary-blue bg-sky-200/20 hover:bg-sky-200/20 hover:text-primary-blue'
      )}
    >
      <div className='flex items-center gap-x-2 py-4'>
        <Icon
          size={22}
          className={cn('text-slate-500', isActive && 'text-primary-blue')}
        />
        {label}
      </div>
      {/* <div
        className={cn(
          'ml-auto opacity-0 border-2 border-sky-700 h-full transition-all',
          isActive && 'opacity-100'
        )}
      /> */}
    </Link>
  );
};

export default SidebarItem;