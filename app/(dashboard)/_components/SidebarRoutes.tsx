'use client';

import {
  AppWindow,
  Code2,
  FileQuestion,
  GraduationCap,
  Hexagon,
  Layout,
  Receipt,
  ScrollText,
  Shapes,
  Users,
  Users2,
} from 'lucide-react';
import SidebarItem from './SidebarItem';

const adminRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/admin/dashboard',
  },

  {
    icon: Users,
    label: 'Accounts',
    href: '/admin/accounts',
  },
  {
    icon: GraduationCap,
    label: 'Students',
    href: '/admin/students',
  },
  {
    icon: Receipt,
    label: 'Transactions',
    href: '/admin/transactions',
  },
  {
    icon: ScrollText,
    label: 'Registrations',
    href: '/admin/registrations/trial-class',
  },
  {
    icon: Code2,
    label: 'Programs',
    href: '/admin/programs',
  },
  {
    icon: Users2,
    label: 'Classes',
    href: '/admin/classes',
  },
  {
    icon: AppWindow,
    label: 'Hero',
    href: '/admin/hero',
  },
  {
    icon: FileQuestion,
    label: 'FAQ',
    href: '/admin/faq',
  },
  {
    icon: Shapes,
    label: 'Categories',
    href: '/admin/categories',
  },
  {
    icon: Hexagon,
    label: 'Logo',
    href: '/admin/logo',
  },
];

const SidebarRoutes = () => {
  const routes = adminRoutes;
  return (
    <div className='flex flex-col w-full px-3'>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
