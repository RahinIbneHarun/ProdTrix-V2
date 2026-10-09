"use client";

import { ReactNode, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-900">
      <AdminSidebar collapsed={sidebarCollapsed} />

      <div
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-[76px]" : "ml-[250px]"
        }`}
      >
        <AdminTopbar
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() =>
            setSidebarCollapsed((prev) => !prev)
          }
        />

        <main className="min-h-[calc(100vh-72px)] bg-[#F4F7FB] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}