"use client";

import { useMemo, useState } from "react";

import {
  demoPermissions,
  demoRoleSummary,
} from "@/Data/admin/permissions";

import { demoUsers } from "@/Data/admin/users";
import { UserRole, DemoRole } from "@/interfaces/admin";

export default function AuthorizationPage() {
  const [permissions, setPermissions] = useState(demoPermissions);

  const [selectedRole, setSelectedRole] =
    useState<DemoRole>("consumer");

  const [selectedUser, setSelectedUser] = useState<
    (typeof demoUsers)[number] | null
  >(null);

  const [saved, setSaved] = useState(false);

  const currentRole = useMemo(() => {
    return demoRoleSummary.find(
      (item) => item.role === selectedRole
    );
  }, [selectedRole]);

  function togglePermission(
    permissionId: string,
    role: DemoRole
  ) {
    setPermissions((current) =>
      current.map((permission) => {
        if (permission.id !== permissionId) {
          return permission;
        }

        return {
          ...permission,
          [role]: !permission[role],
        };
      })
    );

    setSaved(false);
  }

  function handleSave() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  function changeUserRole(
    userId: string,
    role: UserRole
  ) {
    /*
     * Demo only.
     *
     * Later this will become an API request.
     */
    console.log("Change user role:", {
      userId,
      role,
    });

    setSelectedUser((current) =>
      current
        ? {
            ...current,
            role,
          }
        : null
    );
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
            Access Control
          </p>

          <h1 className="mt-1 text-2xl font-semibold text-slate-900">
            Authorization
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage platform roles and their permissions.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      {/* Save Message */}
      {saved && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
          Permission changes saved successfully.
        </div>
      )}

      {/* Role Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {demoRoleSummary.map((role) => {
          const active = selectedRole === role.role;

          return (
            <button
              key={role.role}
              onClick={() => setSelectedRole(role.role)}
              className={`rounded-xl border p-5 text-left shadow-sm transition ${
                active
                  ? "border-blue-300 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {role.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {role.description}
                  </p>
                </div>

                <RoleBadge role={role.role} />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Users
                  </p>

                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {role.userCount.toLocaleString()}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Active Today
                  </p>

                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {role.activeToday.toLocaleString()}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Permission Matrix */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Permission Matrix
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Enable or disable permissions for each platform role.
            </p>
          </div>

          {currentRole && (
            <RoleBadge role={currentRole.role} />
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Permission
                </th>

                <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                  Consumer
                </th>

                <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                  Creator
                </th>

                <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                  Super Admin
                </th>
              </tr>
            </thead>

            <tbody>
              {permissions.map((permission) => (
                <tr
                  key={permission.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  {/* Permission */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-900">
                      {permission.label}
                    </p>

                    <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
                      {permission.description}
                    </p>
                  </td>

                  {/* Consumer */}
                  <td className="px-5 py-4 text-center">
                    <PermissionToggle
                      enabled={permission.consumer}
                      onChange={() =>
                        togglePermission(
                          permission.id,
                          "consumer"
                        )
                      }
                    />
                  </td>

                  {/* Creator */}
                  <td className="px-5 py-4 text-center">
                    <PermissionToggle
                      enabled={permission.creator}
                      onChange={() =>
                        togglePermission(
                          permission.id,
                          "creator"
                        )
                      }
                    />
                  </td>

                  {/* Super Admin */}
                  <td className="px-5 py-4 text-center">
                    <PermissionToggle
                      enabled={permission.super_admin}
                      onChange={() =>
                        togglePermission(
                          permission.id,
                          "super_admin"
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Role Management */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-900">
            User Role Management
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Change the Consumer or Creator role assigned to a user.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  User
                </th>

                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Current Role
                </th>

                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {demoUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                      />

                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {user.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-5 py-4">
                    <RoleBadge role={user.role} />
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={user.status} />
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedUser(user)}
                      disabled={user.role === "super_admin"}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Manage Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Modal */}
      {selectedUser && (
        <RoleManagementModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onChangeRole={changeUserRole}
        />
      )}
    </div>
  );
}

/* =====================================================
   Permission Toggle
===================================================== */

function PermissionToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-label={
        enabled
          ? "Disable permission"
          : "Enable permission"
      }
      className={`relative inline-flex h-6 w-11 items-center rounded-full border transition ${
        enabled
          ? "border-blue-500 bg-blue-600"
          : "border-slate-300 bg-slate-200"
      }`}
    >
      <span
        className={`h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* =====================================================
   Role Badge
===================================================== */

function RoleBadge({
  role,
}: {
  role: DemoRole | UserRole;
}) {
  const config = {
    consumer: {
      label: "Consumer",
      className:
        "border-slate-200 bg-slate-100 text-slate-600",
    },

    creator: {
      label: "Creator",
      className:
        "border-blue-200 bg-blue-50 text-blue-700",
    },

    super_admin: {
      label: "Super Admin",
      className:
        "border-purple-200 bg-purple-50 text-purple-700",
    },
  };

  const item = config[role];

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${item.className}`}
    >
      {item.label}
    </span>
  );
}

/* =====================================================
   Status Badge
===================================================== */

function StatusBadge({
  status,
}: {
  status: "active" | "suspended" | "pending";
}) {
  const config = {
    active: {
      label: "Active",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-600",
    },

    suspended: {
      label: "Suspended",
      className:
        "border-red-200 bg-red-50 text-red-600",
    },

    pending: {
      label: "Pending",
      className:
        "border-amber-200 bg-amber-50 text-amber-600",
    },
  };

  const item = config[status];

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${item.className}`}
    >
      {item.label}
    </span>
  );
}

/* =====================================================
   Role Management Modal
===================================================== */

function RoleManagementModal({
  user,
  onClose,
  onChangeRole,
}: {
  user: (typeof demoUsers)[number];
  onClose: () => void;
  onChangeRole: (userId: string, role: UserRole) => void;
}) {
  const [role, setRole] = useState<UserRole>(user.role);

  function handleSave() {
    onChangeRole(user.id, role);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Overlay */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px]"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Manage User Role
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Update the user's platform role.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {/* User */}
        <div className="p-5">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-full border border-slate-200 object-cover"
            />

            <div>
              <p className="text-sm font-medium text-slate-900">
                {user.name}
              </p>

              <p className="text-xs text-slate-500">
                {user.email}
              </p>
            </div>
          </div>

          {/* Role Selection */}
          <div className="mt-5">
            <label className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Assign Role
            </label>

            <div className="mt-3 space-y-2">
              <RoleOption
                role="consumer"
                selected={role === "consumer"}
                onClick={() => setRole("consumer")}
              />

              <RoleOption
                role="creator"
                selected={role === "creator"}
                onClick={() => setRole("creator")}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Save Role
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   Role Option
===================================================== */

function RoleOption({
  role,
  selected,
  onClick,
}: {
  role: "consumer" | "creator";
  selected: boolean;
  onClick: () => void;
}) {
  const label =
    role === "consumer"
      ? "Content Consumer"
      : "Content Creator";

  const description =
    role === "consumer"
      ? "Can discover and interact with educational content."
      : "Can create, publish and organize educational content.";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition ${
        selected
          ? "border-blue-300 bg-blue-50"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <div>
        <p className="text-sm font-medium text-slate-900">
          {label}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          selected
            ? "border-blue-500"
            : "border-slate-300"
        }`}
      >
        {selected && (
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
        )}
      </span>
    </button>
  );
}