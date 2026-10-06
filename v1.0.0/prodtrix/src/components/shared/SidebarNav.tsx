"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarDays,
  ChevronDown,
  DockIcon,
  FileText,
  Group,
  LayoutDashboard,
  Shield,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SubMenuItem, MenuItem } from "@/types/SideNavbarProps";
import * as React from "react";

const menuItems: MenuItem[] = [
  {
    title: "Supervisor",
    icon: <UserCog className="h-4 w-4" />,
    submenu: [
      {
        title: "Dashboard",
        href: "/supervisor/dashboard",
        icon: <LayoutDashboard className="h-3 w-3" />,
      },
      {
        title: "Groups",
        href: "/supervisor/groups",
        icon: <Group className="h-3 w-3" />,
      },
      {
        title: "Documents",
        href: "/supervisor/documents",
        icon: <FileText className="h-3 w-3" />,
      },
    ],
  },
  {
    title: "Admin",
    icon: <Shield className="h-4 w-4" />,
    submenu: [
      {
        title: "Semester",
        href: "/admin/semester",
        icon: <CalendarDays className="h-3 w-3" />,
      },
      {
        title: "Groups",
        href: "/admin/thesis-groups",
        icon: <Group className="h-3 w-3" />,
      },
      {
        title: "Documents",
        href: "/admin/documents",
        icon: <DockIcon className="h-3 w-3" />,
      },
      {
        title: "Approval Requests",
        href: "/admin/approval-requests",
        icon: <AlertTriangle className="h-3 w-3" />,
      },
    ],
  },
];

export function SidebarNav({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  const defaultOpenMenus = React.useMemo(() => {
    return menuItems.reduce<Record<string, boolean>>((acc, item) => {
      const isActiveMenu = item.submenu?.some((sub) => {
        return pathname === sub.href || pathname?.startsWith(`${sub.href}/`);
      });
      acc[item.title] = Boolean(isActiveMenu) || item.title === "Supervisor";
      return acc;
    }, {});
  }, [pathname]);

  const [openMenus, setOpenMenus] =
    React.useState<Record<string, boolean>>(defaultOpenMenus);

  React.useEffect(() => {
    setOpenMenus((prev) => ({ ...defaultOpenMenus, ...prev }));
  }, [defaultOpenMenus]);

  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <nav className={`flex flex-col gap-1 p-3 ${className}`}>
      {menuItems.map((item) => {
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isOpen = openMenus[item.title];

        if (hasSubmenu) {
          return (
            <div key={item.title} className="flex flex-col">
              <button
                type="button"
                onClick={() => toggleSubmenu(item.title)}
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary"
              >
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{item.icon}</span>
                  <span>{item.title}</span>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground"
                >
                  <ChevronDown className="h-3 w-3" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {item.submenu?.map((subitem) => {
                        const active = isActive(subitem.href);
                        return (
                          <Link
                            key={subitem.href}
                            href={subitem.href}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground transition-all hover:bg-secondary ${
                              active ? "bg-secondary" : ""
                            }`}
                          >
                            <span
                              className={
                                active
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }
                            >
                              {subitem.icon}
                            </span>
                            <span>{subitem.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <Link
            key={item.title}
            href={item.href!}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary"
          >
            <span className="text-muted-foreground">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default SidebarNav;
