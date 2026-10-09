"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import {
  demoActivities,
} from "@/Data/admin/activities";

import { ActivityType } from "@/interfaces/admin";

type RoleFilter =
  | "all"
  | "consumer"
  | "creator"
  | "super_admin";

type ActivityFilter = "all" | ActivityType;

export default function ActivityPage() {
  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] =
    useState<RoleFilter>("all");

  const [activityFilter, setActivityFilter] =
    useState<ActivityFilter>("all");

  const [selectedActivity, setSelectedActivity] = useState<
    (typeof demoActivities)[number] | null
  >(null);

  const filteredActivities = useMemo(() => {
    return demoActivities.filter((activity) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        activity.userName.toLowerCase().includes(searchText) ||
        activity.actionLabel.toLowerCase().includes(searchText) ||
        activity.targetName.toLowerCase().includes(searchText) ||
        activity.targetId.toLowerCase().includes(searchText);

      const matchesRole =
        roleFilter === "all" ||
        activity.userRole === roleFilter;

      const matchesActivity =
        activityFilter === "all" ||
        activity.type === activityFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesActivity
      );
    });
  }, [search, roleFilter, activityFilter]);

  return (
    <div className="space-y-6">

      {/* =========================================
          Header
      ========================================== */}

      <div>
        <div className="flex items-center justify-between">

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              Activity
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              Activity Log
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor user activity and review platform audit records.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            {filteredActivities.length} activities
          </div>

        </div>
      </div>

      {/* =========================================
          Filters
      ========================================== */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px_200px_auto]">

          {/* Search */}

          <div className="relative">

            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search user, activity, target..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />

          </div>

          {/* Role */}

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(
                e.target.value as RoleFilter
              )
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          >
            <option value="all">
              All Roles
            </option>

            <option value="consumer">
              Consumer
            </option>

            <option value="creator">
              Creator
            </option>

            <option value="super_admin">
              Super Admin
            </option>
          </select>

          {/* Activity */}

          <select
            value={activityFilter}
            onChange={(e) =>
              setActivityFilter(
                e.target.value as ActivityFilter
              )
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          >
            <option value="all">
              All Activities
            </option>

            <option value="login">
              Login
            </option>

            <option value="post_created">
              Post Created
            </option>

            <option value="post_updated">
              Post Updated
            </option>

            <option value="like">
              Like
            </option>

            <option value="comment">
              Comment
            </option>

            <option value="share">
              Share
            </option>

            <option value="follow">
              Follow
            </option>

            <option value="profile_view">
              Profile View
            </option>

            <option value="request_created">
              Request Created
            </option>

            <option value="file_uploaded">
              File Uploaded
            </option>

            <option value="draw_saved">
              Draw Saved
            </option>
          </select>

          {/* Reset */}

          <button
            onClick={() => {
              setSearch("");
              setRoleFilter("all");
              setActivityFilter("all");
            }}
            className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            Reset
          </button>

        </div>
      </div>

      {/* =========================================
          Activity Table
      ========================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* Table Header */}

        <div className="border-b border-slate-200 px-5 py-4">

          <h2 className="text-sm font-semibold text-slate-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Latest actions performed across the platform.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead>

              <tr className="border-b border-slate-200 bg-slate-50 text-left">

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  User
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Activity
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Target
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Time
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Severity
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredActivities.map((activity) => (

                <tr
                  key={activity.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >

                  {/* User */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <img
                        src={activity.userAvatar}
                        alt={activity.userName}
                        width={36}
                        height={36}
                        className="rounded-full border border-slate-200"
                      />

                      <div>

                        <p className="text-sm font-medium text-slate-900">
                          {activity.userName}
                        </p>

                        <p className="mt-0.5 text-xs capitalize text-slate-400">
                          {activity.userRole.replace(
                            "_",
                            " "
                          )}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Activity */}

                  <td className="px-5 py-4">

                    <p className="text-sm font-medium text-slate-700">
                      {activity.actionLabel}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {activity.id}
                    </p>

                  </td>

                  {/* Target */}

                  <td className="max-w-[280px] px-5 py-4">

                    <p className="truncate text-sm text-slate-700">
                      {activity.targetName}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {activity.targetType} ·{" "}
                      {activity.targetId}
                    </p>

                  </td>

                  {/* Time */}

                  <td className="px-5 py-4">

                    <p className="text-sm text-slate-700">
                      {formatDate(activity.timestamp)}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatTime(activity.timestamp)}
                    </p>

                  </td>

                  {/* Severity */}

                  <td className="px-5 py-4">
                    <SeverityBadge
                      severity={activity.severity}
                    />
                  </td>

                  {/* Action */}

                  <td className="px-5 py-4 text-right">

                    <button
                      onClick={() =>
                        setSelectedActivity(activity)
                      }
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

              {/* Empty */}

              {filteredActivities.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                  >

                    <p className="text-sm font-medium text-slate-700">
                      No activities found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try changing your search or filters.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* =========================================
          Activity Drawer
      ========================================== */}

      {selectedActivity && (
        <ActivityDrawer
          activity={selectedActivity}
          onClose={() =>
            setSelectedActivity(null)
          }
        />
      )}

    </div>
  );
}

/* =====================================================
   Severity Badge
===================================================== */

function SeverityBadge({
  severity,
}: {
  severity:
    | "low"
    | "normal"
    | "medium"
    | "high";
}) {
  const styles = {
    low: "border-slate-200 bg-slate-100 text-slate-600",

    normal:
      "border-blue-200 bg-blue-50 text-blue-600",

    medium:
      "border-amber-200 bg-amber-50 text-amber-600",

    high:
      "border-red-200 bg-red-50 text-red-600",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${styles[severity]}`}
    >
      {severity}
    </span>
  );
}

/* =====================================================
   Activity Drawer
===================================================== */

function ActivityDrawer({
  activity,
  onClose,
}: {
  activity: (typeof demoActivities)[number];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50">

      {/* Overlay */}

      <button
        aria-label="Close activity details"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"
      />

      {/* Drawer */}

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col border-l border-slate-200 bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>

            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Activity Details
            </p>

            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              {activity.actionLabel}
            </h2>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

        </div>

        {/* Content */}

        <div className="flex-1 overflow-y-auto p-6">

          {/* User */}

          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">

            <img
              src={activity.userAvatar}
              alt={activity.userName}
              width={48}
              height={48}
              className="rounded-full border border-slate-200"
            />

            <div>

              <p className="font-medium text-slate-900">
                {activity.userName}
              </p>

              <p className="mt-1 text-sm capitalize text-slate-500">
                {activity.userRole.replace(
                  "_",
                  " "
                )}
              </p>

            </div>

          </div>

          {/* Details */}

          <div className="mt-6 space-y-5">

            <DetailItem
              label="Activity ID"
              value={activity.id}
            />

            <DetailItem
              label="Action"
              value={activity.actionLabel}
            />

            <DetailItem
              label="Target"
              value={activity.targetName}
            />

            <DetailItem
              label="Target ID"
              value={activity.targetId}
            />

            <DetailItem
              label="Target Type"
              value={activity.targetType}
            />

            <DetailItem
              label="Date & Time"
              value={`${formatDate(
                activity.timestamp
              )} · ${formatTime(
                activity.timestamp
              )}`}
            />

            <DetailItem
              label="IP Address"
              value={activity.ipAddress}
            />

            <DetailItem
              label="Device"
              value={activity.device}
            />

            <DetailItem
              label="Location"
              value={activity.location}
            />

            <div>

              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Severity
              </p>

              <div className="mt-2">
                <SeverityBadge
                  severity={activity.severity}
                />
              </div>

            </div>

            <div>

              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Details
              </p>

              <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-4">

                <p className="text-sm leading-6 text-slate-600">
                  {activity.details}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t border-slate-200 bg-white p-4">

          <button
            onClick={onClose}
            className="w-full rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Close
          </button>

        </div>

      </aside>

    </div>
  );
}

/* =====================================================
   Detail Item
===================================================== */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm text-slate-700">
        {value}
      </p>

    </div>
  );
}

/* =====================================================
   Date Helpers
===================================================== */

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}