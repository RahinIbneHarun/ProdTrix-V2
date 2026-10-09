"use client";

import { useState } from "react";
import Link from "next/link";
import { MacWindowControls } from "@/components/mac-window-controls";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only — no submission yet
  };

  return (
    <div className="relative px-4 py-16">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/20 blur-[140px] pointer-events-none dark:block hidden" />

      <div className="relative z-10 grid w-full grid-cols-1 gap-14 items-center lg:grid-cols-2">
        {/* Left brand column */}
        <div className="hidden lg:block space-y-6">
          <p className="theme-label">● ProdTrix PLATFORM</p>
          <h1 className="text-4xl font-semibold tracking-tight leading-tight text-foreground">
            Create your{" "}
            <span className="theme-heading-accent">ProdTrix account.</span>
          </h1>
          <p className="max-w-md text-muted-foreground leading-7">
            One account for every support request, update, and follow-up across
            your academic journey.
          </p>
        </div>

        {/* Right — terminal form */}
        <div className="w-full flex justify-center lg:justify-end">
          <form
            onSubmit={handleSubmit}
            className="theme-terminal w-full max-w-md"
          >
            <div className="flex items-center border-b border-border px-4 py-3">
              <MacWindowControls />
              <span className="ml-4 text-sm text-muted-foreground">
                ProdTrix Auth
              </span>
            </div>

            <div className="p-6 md:p-8 font-mono text-sm space-y-4">
              <div className="mb-2 space-y-1">
                <p className="theme-label">● NEW ACCOUNT</p>
                <p className="text-muted-foreground">
                  $ prodtrix auth --register
                </p>
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-primary">→</span> full name
                </label>
                <input
                  name="fullName"
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="theme-input"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-primary">→</span> email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                  className="theme-input"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-primary">→</span> password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="theme-input"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-primary">→</span> confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="theme-input"
                />
              </div>

              <button type="submit" className="theme-button-primary">
                $ create account
              </button>

              <p className="text-sm text-center text-muted-foreground pt-2">
                Already have one?{" "}
                <Link
                  href="/login"
                  className="text-primary underline underline-offset-2"
                >
                  log in →
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
