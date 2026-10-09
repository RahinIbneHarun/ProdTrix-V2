"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  collapsed: boolean;
}

const navigation = [
  {
    section: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        href: "/super-admin",
        icon: "▦",
      },
    ],
  },
  {
    section: "ACTIVITY",
    items: [
      {
        label: "Activity Log",
        href: "/super-admin/activity",
        icon: "◷",
      },
    ],
  },
  {
    section: "ACCESS CONTROL",
    items: [
      {
        label: "Authorization",
        href: "/super-admin/authorization",
        icon: "◈",
      },
    ],
  },
];

export default function AdminSidebar({
  collapsed,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed ? "w-[76px]" : "w-[250px]"
      }`}
    >
      {/* Logo */}
      <div className="flex h-[72px] items-center border-b border-slate-200 px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
          E
        </div>

        {!collapsed && (
          <div className="ml-3">
            <p className="text-sm font-semibold tracking-wide text-slate-900">
              EDUPULSE
            </p>

            <p className="text-[10px] uppercase tracking-[0.2em] text-blue-600">
              Super Admin
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="px-3 py-5">
        {navigation.map((group) => (
          <div key={group.section} className="mb-7">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.18em] text-slate-400">
                {group.section}
              </p>
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const active =
                  item.href === "/super-admin"
                    ? pathname === "/super-admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`group flex items-center rounded-lg px-3 py-2.5 text-sm transition-all ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-base ${
                        active
                          ? "bg-blue-100 text-blue-600"
                          : "text-slate-500 group-hover:text-slate-800"
                      }`}
                    >
                      {item.icon}
                    </span>

                    {!collapsed && (
                      <span className="ml-2 font-medium">
                        {item.label}
                      </span>
                    )}

                    {!collapsed &&
                      item.label === "Activity Log" && (
                        <span className="ml-auto rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-600">
                          12
                        </span>
                      )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom System Status */}
      {!collapsed && (
        <div className="absolute bottom-5 left-4 right-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-medium text-emerald-700">
              System Operational
            </span>
          </div>

          <p className="mt-1 text-[10px] text-emerald-600/70">
            All core services are running
          </p>
        </div>
      )}
    </aside>
  );
}