import Link from "next/link";

const FOLLOWING = [
  { id: "u1", name: "Ayasha Malik", role: "Creator" },
  { id: "u2", name: "Lucas Fernandes", role: "Creator" },
  { id: "u3", name: "Meera Krishnan", role: "Learner" },
];

const FollowingCard=()=> {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Following
      </h3>

      <ul className="space-y-3">
        {FOLLOWING.map((user) => (
          <li key={user.id} className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {user.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href="/Profile"
                className="block truncate text-sm font-medium text-foreground hover:underline"
              >
                {user.name}
              </Link>
              <p className="truncate text-xs text-muted-foreground">
                {user.role}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default FollowingCard;