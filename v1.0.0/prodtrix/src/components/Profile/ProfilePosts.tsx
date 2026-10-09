import type { ProfilePost } from "@/interfaces/ProfileProps";

interface ProfilePostsProps {
  posts: ProfilePost[];
  activeTopic: string;
  onTopicChange: (topic: string) => void;
}

const ProfilePosts = ({
  posts,
  activeTopic,
  onTopicChange,
}: ProfilePostsProps) => {
  const topics = ["All", ...Array.from(new Set(posts.map((p) => p.topic)))];

  const visiblePosts =
    activeTopic === "All"
      ? posts
      : posts.filter((p) => p.topic === activeTopic);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => onTopicChange(t)}
            className={`rounded-full px-3 py-1 text-xs ${
              activeTopic === t
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {visiblePosts.map((post) => (
          <li
            key={post.id}
            className="flex items-center justify-between gap-4 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{post.title}</p>
              <p className="text-xs text-muted-foreground">
                {post.topic} · {post.date}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4 text-xs text-muted-foreground">
              <span>👍 {post.likes}</span>
              <span>💬 {post.comments}</span>
            </div>
          </li>
        ))}
      </ul>

      {visiblePosts.length === 0 && (
        <p className="rounded-xl border border-border bg-card px-4 py-10 text-center text-sm text-muted-foreground">
          No posts match this topic.
        </p>
      )}
    </div>
  );
};

export default ProfilePosts;
