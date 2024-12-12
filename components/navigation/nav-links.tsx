"use client";

import { FileText, Users, Building2, LayoutDashboard, Settings } from 'lucide-react';
import { NavLink } from './nav-link';

const navigationLinks = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/invoices",
    label: "Facturen",
    icon: FileText,
  },
  {
    href: "/clients",
    label: "Klanten",
    icon: Users,
  },
  {
    href: "/company",
    label: "Bedrijf",
    icon: Building2,
  },
  {
    href: "/settings",
    label: "Instellingen",
    icon: Settings,
  },
] as const;

export function NavLinks() {
  return (
    <nav className="flex items-center space-x-6">
      {navigationLinks.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
    </nav>
  );
}