"use client";

import { useMemo, useState } from "react";

import { Post } from "@/types/Post";
import ProfileMiniCard from "./ProfileMiniCard";
import PostComposer from "./PostComposer";
import PostCard from "./PostCard";
import TopicsCard from "./TopicsCard";
import FollowingCard from "./FollowingCard";
import TopCreatorsCard from "./TopCreatorsCard";

const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    author: { name: "Ayasha Malik", role: "Creator" },
    topic: "Web Development",
    chapter: "Chapter 4 · Closures",
    content:
      "Closures capture the lexical scope. A quick way to remember: a function remembers the variables from where it was defined, not where it was called.",
    timeAgo: "10 min ago",
    likes: 24,
    comments: 5,
    shares: 2,
  },
  {
    id: "p2",
    author: { name: "Priya Nair", role: "Learner" },
    topic: "System Design",
    chapter: "Chapter 2 · Scaling",
    content:
      "REST vs GraphQL — the biggest practical difference is how you fetch related data. REST needs multiple endpoints; GraphQL lets the client ask for exactly what it needs.",
    timeAgo: "1 hour ago",
    likes: 18,
    comments: 3,
    shares: 1,
  },
  {
    id: "p3",
    author: { name: "Lucas Fernandes", role: "Creator" },
    topic: "Programming",
    chapter: "Chapter 6 · Pointers",
    content:
      "Pointers in C++ are just addresses. Once you see them as numbers that point to memory, everything else falls into place.",
    timeAgo: "3 hours ago",
    likes: 31,
    comments: 7,
    shares: 4,
  },
];

const ALL_TOPICS = "All";

const FeedPage = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState<string>(ALL_TOPICS);

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => counts.set(p.topic, (counts.get(p.topic) ?? 0) + 1));
    return Array.from(counts, ([name, count]) => ({ name, count }));
  }, [posts]);

  const visiblePosts = useMemo(() => {
    return posts.filter((post) => {
      if (activeTopic !== ALL_TOPICS && post.topic !== activeTopic)
        return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        post.content.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        post.topic.toLowerCase().includes(q)
      );
    });
  }, [posts, activeTopic, search]);

  const handleCreate = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top search bar */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts, topics, creators..."
            className="h-10 w-full rounded-full border border-input bg-muted/50 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* 3-column grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
        {/* Left rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <ProfileMiniCard />
          </div>
        </aside>

        {/* Center feed */}
        <section className="min-w-0 space-y-4">
          <PostComposer onCreate={handleCreate} />

          {visiblePosts.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-12 text-center">
              <h3 className="text-lg font-semibold text-foreground">
                No posts match
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try another topic or clear the search.
              </p>
            </div>
          ) : (
            visiblePosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </section>

        {/* Right rail */}
        <aside className="hidden space-y-4 lg:block">
          <div className="sticky top-20 space-y-4">
            <TopicsCard
              topics={topics}
              activeTopic={activeTopic}
              onSelect={setActiveTopic}
            />
            <FollowingCard />
            <TopCreatorsCard />
          </div>
        </aside>
      </div>
    </div>
  );
};
export default FeedPage;
