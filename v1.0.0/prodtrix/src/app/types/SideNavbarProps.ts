import type { ReactNode } from "react";

export interface SubMenuItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

export interface MenuItem {
  title: string;
  href?: string;
  icon: ReactNode;
  submenu?: SubMenuItem[];
}