"use client";

import Link from "next/link";

import {
  demoAdminStats,
  demoActivitySummary,
} from "@/Data/admin/stats";

import { demoActivities } from "@/Data/admin/activities";

export default function AdminDashboard() {
  const recentActivities = demoActivities.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* =========================================
          Page Header
      ========================================== */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
            Overview
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            Super Admin Dashboard
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monitor platform activity and authorization.
          </p>
        </div>

        {/* System Status */}
        <div className="rounded-lg border border-emerald-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            System Status
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-medium text-emerald-600">
              Operational
            </span>
          </div>
        </div>
      </div>

      {/* =========================================
          Stats
      ========================================== */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {demoAdminStats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <p className="text-xs font-medium text-slate-500">
              {stat.label}
            </p>

            <div className="mt-3 flex items-end justify-between">
              <h3 className="text-2xl font-semibold text-slate-900">
                {stat.value}
              </h3>

              <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600">
                {stat.change}
              </span>
            </div>

            <p className="mt-2 text-[10px] text-slate-400">
              {stat.helper}
            </p>
          </div>
        ))}
      </div>

      {/* =========================================
          Activity Overview
      ========================================== */}
      <section>
        <div className="mb-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Engagement
          </p>

          <h3 className="mt-1 text-sm font-semibold text-slate-900">
            Activity Overview
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <ActivityMetric
            label="Likes"
            value={demoActivitySummary.likes}
          />

          <ActivityMetric
            label="Comments"
            value={demoActivitySummary.comments}
          />

          <ActivityMetric
            label="Shares"
            value={demoActivitySummary.shares}
          />

          <ActivityMetric
            label="Follows"
            value={demoActivitySummary.follows}
          />

          <ActivityMetric
            label="Requests"
            value={demoActivitySummary.requests}
          />

          <ActivityMetric
            label="Uploads"
            value={demoActivitySummary.uploads}
          />
        </div>
      </section>

      {/* =========================================
          Recent Activity
      ========================================== */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Live Feed
            </p>

            <h3 className="mt-1 text-sm font-semibold text-slate-900">
              Recent Activity
            </h3>
          </div>

          <Link
            href="/super-admin/activity"
            className="text-xs font-medium text-blue-600 transition hover:text-blue-700"
          >
            View all →
          </Link>
        </div>

        {/* Activities */}
        <div className="divide-y divide-slate-100">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-50"
            >
              {/* Avatar */}
              <img
                src={activity.userAvatar}
                alt={activity.userName}
                className="h-9 w-9 rounded-full border border-slate-200 object-cover"
              />

              {/* Activity Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold text-slate-900">
                    {activity.userName}
                  </p>

                  <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-medium uppercase text-blue-600">
                    {activity.userRole}
                  </span>
                </div>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {activity.actionLabel} ·{" "}
                  {activity.targetName}
                </p>
              </div>

              {/* Time */}
              <div className="hidden text-right sm:block">
                <p className="text-[10px] font-medium text-slate-500">
                  {formatTime(activity.timestamp)}
                </p>

                <p className="mt-1 text-[9px] uppercase text-slate-400">
                  {activity.location.split(",")[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* =========================================
   Activity Metric
========================================= */

function ActivityMetric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-slate-900">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

/* =========================================
   Format Time
========================================= */

function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}