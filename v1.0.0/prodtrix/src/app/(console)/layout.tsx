import React from "react";

import { BrandLogo } from "@/components/shared/BrandLogo";
import Link from "next/link";
import { Bell, Home, Search, Settings } from "lucide-react";
import { SiteFooter } from "@/components/shared/SiteFooter";

interface ConsoleLayoutProps {
  children: React.ReactNode;
}

export default function ConsoleLayout({ children }: ConsoleLayoutProps) {
  return (
    <>
        <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <header className="theme-nav sticky top-0 z-50">
        <div
          className="mx-auto flex w-full items-center justify-between py-4"
          style={{ paddingLeft: "10%", paddingRight: "10%" }}
        >
          {/* Omit "/public" from all links */}
          <Link href="/home" className="flex items-center gap-3">
            <BrandLogo className="h-10 w-10 rounded-lg" />
            <span className="text-[20px] font-medium tracking-tight">
              ProdTrix
            </span>
          </Link>

          <nav className="flex items-center gap-4 text-[15px] font-medium text-muted-foreground">
            <Link href="/home" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link
              href="/support"
              className="theme-button-primary px-4 py-2 font-medium"
            >
              Support
            </Link>
            <Link
              href="/login"
              className="theme-button-primary px-4 py-2 font-medium"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="theme-shell relative flex flex-1 flex-col">
        <div className="theme-grid pointer-events-none absolute inset-0 opacity-40" />
        <div
          className="relative z-10 mx-auto flex w-full flex-1 flex-col"
          style={{ paddingLeft: "10%", paddingRight: "10%" }}
        >
          {children}
        </div>
      </main>

      <div className="mt-auto">
        <SiteFooter />
      </div>
    </div>
    </>
  );
}
