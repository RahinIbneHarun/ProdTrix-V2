"use client";

import { useState } from "react";

interface AdminTopbarProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const roles = [
  "Super Admin",
  "Content Creator",
  "Content Consumer",
];

export default function AdminTopbar({
  onToggleSidebar,
}: AdminTopbarProps) {
  const [roleOpen, setRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] =
    useState("Super Admin");

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          ☰
        </button>

        {/* Page Title */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
            Administration
          </p>

          <h1 className="text-sm font-semibold text-slate-900">
            Platform Control Center
          </h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden h-9 w-[220px] items-center rounded-lg border border-slate-200 bg-slate-50 px-3 md:flex">
          <span className="mr-2 text-slate-400">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-xs text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleOpen((prev) => !prev)}
            className="flex h-9 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <span className="h-2 w-2 rounded-full bg-blue-600" />

            {selectedRole}

            <span className="ml-1 text-blue-500">
              ▾
            </span>
          </button>

          {roleOpen && (
            <div className="absolute right-0 top-11 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
              {/* Dropdown Header */}
              <div className="border-b border-slate-200 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  View As
                </p>
              </div>

              {/* Roles */}
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedRole(role);
                    setRoleOpen(false);
                  }}
                  className={`block w-full px-3 py-2.5 text-left text-xs transition ${
                    selectedRole === role
                      ? "bg-blue-50 font-medium text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{role}</span>

                    {selectedRole === role && (
                      <span className="text-blue-600">
                        ✓
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
          ♢

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <div className="hidden items-center gap-2 border-l border-slate-200 pl-3 sm:flex">
          <img
            src="https://i.pravatar.cc/80?img=32"
            alt="Super Admin"
            className="h-8 w-8 rounded-full border border-blue-100"
          />

          <div>
            <p className="text-xs font-medium text-slate-900">
              Dr. Eleanor Vance
            </p>

            <p className="text-[10px] text-slate-500">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}