import Link from "next/link";

const CREATORS = [
  { id: "c1", name: "Ayasha Malik", posts: 24 },
  { id: "c2", name: "Jin-ho Yoon", posts: 19 },
  { id: "c3", name: "Tomás Rivera", posts: 17 },
];

const TopCreatorsCard = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Top creators
      </h3>

      <ul className="space-y-3">
        {CREATORS.map((creator) => (
          <li
            key={creator.id}
            className="flex items-center justify-between gap-3"
          >
            <Link
              href="/Profile"
              className="truncate text-sm font-medium text-foreground hover:underline"
            >
              {creator.name}
            </Link>
            <span className="shrink-0 text-xs text-muted-foreground">
              {creator.posts} posts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TopCreatorsCard;
