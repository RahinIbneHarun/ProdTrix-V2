import type { ProfileStat, WeeklyActivity } from "@/types/ProfileProps";

interface ProfileDashboardProps {
  stats: ProfileStat[];
  weekly: WeeklyActivity[];
}

const MAX_BAR_HEIGHT = 96;

const ProfileDashboard=({
  stats,
  weekly,
}: ProfileDashboardProps)=> {
  const maxCount = Math.max(...weekly.map((w) => w.count));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <p className="text-xl font-semibold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs text-muted-foreground">Activity this week</p>
        <div className="mt-4 flex items-end gap-3">
          {weekly.map((item) => (
            <div
              key={item.day}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <div
                className="w-full rounded-md bg-primary/70"
                style={{ height: (item.count / maxCount) * MAX_BAR_HEIGHT }}
                title={`${item.count} activities`}
              />
              <span className="text-[10px] text-muted-foreground">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ProfileDashboard;