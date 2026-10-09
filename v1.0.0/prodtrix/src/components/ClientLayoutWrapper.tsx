"use client";

import { BrandLogo } from "@/components/shared/BrandLogo";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SidebarNav } from "@/components/shared/SidebarNav";
import { Bell, Home, Menu, Search, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

const ClientLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicShellRoute =
    pathname === "/" ||
    pathname.startsWith("/home") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/support") ||
    pathname.startsWith("/feed") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/profile");

  if (pathname.startsWith("/drawPage")) {
    return <div className="h-screen w-screen overflow-hidden">{children}</div>;
  }

  // ── Public shell ──────────────────────────────────────────
  if (isPublicShellRoute) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
        <header className="theme-nav sticky top-0 z-50">
          <div
            className="mx-auto flex w-full items-center justify-between py-4"
            style={{ paddingLeft: "10%", paddingRight: "10%" }}
          >
            <Link href="/Home" className="flex items-center gap-3">
              <BrandLogo className="h-10 w-10 rounded-lg" />
              <span className="text-[20px] font-medium tracking-tight text-foreground">
                ProdTrix
              </span>
            </Link>

            <nav className="flex items-center gap-4 text-[15px] font-medium text-muted-foreground">
              <Link href="/Home" className="hover:text-foreground">
                Home
              </Link>
              <Link href="/About" className="hover:text-foreground">
                About
              </Link>
              <Link
                href="/support"
                className="theme-button-primary px-4 py-2 font-medium"
              >
                Support
              </Link>
              {pathname !== "/login" && (
                <Link
                  href="/login"
                  className="theme-button-primary px-4 py-2 font-medium"
                >
                  Login
                </Link>
              )}
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
    );
  }

  // ── App shell (with sidebar) ──────────────────────────────
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-card">
        <div className="flex h-16 items-center border-b border-border px-4">
          <Link href="/Home" className="flex items-center gap-3">
            <BrandLogo className="h-8 w-8 rounded-md" />
            <span className="text-lg font-medium tracking-tight text-foreground">
              ProdTrix
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          <SidebarNav />
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card shadow-sm md:hidden"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-primary/30 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 h-full w-64 bg-card shadow-xl md:hidden">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <Link
                href="/Home"
                className="flex items-center gap-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BrandLogo className="h-8 w-8 rounded-md" />
                <span className="text-lg font-medium tracking-tight text-foreground">
                  ProdTrix
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-1 hover:bg-secondary"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarNav />
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-card/95 px-4 pr-8">
          <div className="flex items-center gap-4">
            <Link
              href="/Feed"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Home className="h-3.5 w-3.5" />
              Dashboard
            </Link>

            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search…"
                className="theme-input w-64 pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/notifications"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground hover:text-foreground"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
            </Link>

            <Link
              href="/feed/settings"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground hover:text-foreground"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </Link>

            <Link
              href="/user/profile"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-xs font-medium text-foreground"
              title="Profile"
            >
              U
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex min-h-[200px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
              </div>
            }
          >
            <div>{children}</div>
          </Suspense>
        </main>
      </div>
    </div>
  );
};
export default ClientLayoutWrapper;
