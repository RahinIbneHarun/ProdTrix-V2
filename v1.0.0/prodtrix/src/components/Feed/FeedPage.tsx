"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  Settings,
  ThumbsUp,
  MessageSquare,
  Share2,
} from "lucide-react";
import type { Post } from "@/types/Post";
import type { TopCreator } from "@/types/TopCreator";
import type { Profile } from "@/types/ProfileProps";

interface FeedData {
  profile: Profile;
  topics: string[];
  following: string[];
  topCreators: TopCreator[];
  posts: Post[];
}

const FeedPage = () => {
  const [data, setData] = useState<FeedData | null>(null);
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState("All");
  const [content, setContent] = useState("");
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/Data/feed.json")
      .then((res) => res.json())
      .then((json: FeedData) => setData(json));
  }, []);

  if (!data) return null;

  const toggleLike = (id: string) => {
    setData({
      ...data,
      posts: data.posts.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    });
  };

  const share = (id: string) => {
    const link = `${window.location.origin}/feed#post-${id}`;
    navigator.clipboard.writeText(link);
    setData({
      ...data,
      posts: data.posts.map((p) =>
        p.id === id ? { ...p, shares: p.shares + 1 } : p,
      ),
    });
  };

  const addComment = (id: string) => {
    const text = (commentText[id] ?? "").trim();
    if (!text) return;
    setData({
      ...data,
      posts: data.posts.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: p.comments + 1,
              commentList: [...(p.commentList ?? []), text],
            }
          : p,
      ),
    });
    setCommentText((prev) => ({ ...prev, [id]: "" }));
  };

  const addPost = () => {
    if (!content.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: { name: "You", role: "Creator" },
      topic: activeTopic === "All" ? "General" : activeTopic,
      chapter: "N/A",
      content,
      timeAgo: "just now",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      commentList: [],
    };

    setData({ ...data, posts: [post, ...data.posts] });
    setContent("");
  };

  const posts = data.posts.filter((p) => {
    if (activeTopic !== "All" && p.topic !== activeTopic) return false;
    if (search && !p.content.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
      {/* LEFT: profile + topics (desktop only) */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-20 space-y-4">
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
              {data.profile.name[0]}
            </div>
            <p className="mt-3 text-sm font-semibold">{data.profile.name}</p>
            <p className="text-xs text-muted-foreground">
              {data.profile.headline}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
              Topics
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTopic("All")}
                className={`rounded-full px-3 py-1 text-xs ${
                  activeTopic === "All"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground"
                }`}
              >
                All
              </button>
              {data.topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTopic(t)}
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
          </div>
        </div>
      </aside>

      {/* CENTER: feed */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="h-10 w-full rounded-full border border-input bg-muted/50 pl-9 pr-4 text-sm outline-none"
            />
          </div>

          <button className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card"
            >
              <Settings className="h-4 w-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-12 z-10 w-44 rounded-lg border border-border bg-card py-1 text-sm shadow-lg">
                <button className="block w-full px-4 py-2 text-left hover:bg-muted">
                  My profile
                </button>
                <button className="block w-full px-4 py-2 text-left hover:bg-muted">
                  Request a post
                </button>
                <button className="block w-full px-4 py-2 text-left hover:bg-muted">
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile topics strip */}
        <div className="mb-4 flex gap-2 overflow-x-auto lg:hidden">
          <button
            onClick={() => setActiveTopic("All")}
            className={`shrink-0 rounded-full px-3 py-1 text-xs ${
              activeTopic === "All"
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground"
            }`}
          >
            All
          </button>
          {data.topics.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTopic(t)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                activeTopic === t
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Composer */}
        <div className="mb-4 rounded-lg border border-border bg-card p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share an update..."
            rows={3}
            className="w-full resize-none rounded-md border border-input bg-background p-3 text-sm outline-none"
          />
          <button
            onClick={addPost}
            disabled={!content.trim()}
            className="mt-3 rounded-md bg-primary px-4 py-1.5 text-sm text-primary-foreground disabled:opacity-50"
          >
            Post
          </button>
        </div>

        {/* Posts */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="mb-4 rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {post.author.name[0]}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {post.author.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {post.author.role} · {post.timeAgo}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                {post.topic}
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                {post.chapter}
              </span>
            </div>

            <p className="mt-3 text-sm">{post.content}</p>

            <div className="mt-3 flex gap-6 border-t border-border pt-3 text-xs text-muted-foreground">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1 ${
                  post.liked ? "text-primary" : ""
                }`}
              >
                <ThumbsUp
                  className={`h-3.5 w-3.5 ${post.liked ? "fill-current" : ""}`}
                />
                {post.likes}
              </button>

              <button
                onClick={() =>
                  setOpenComments(openComments === post.id ? null : post.id)
                }
                className="flex items-center gap-1"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                {post.comments}
              </button>

              <button
                onClick={() => share(post.id)}
                className="flex items-center gap-1"
              >
                <Share2 className="h-3.5 w-3.5" />
                {post.shares}
              </button>
            </div>

            {openComments === post.id && (
              <div className="mt-3 border-t border-border pt-3">
                {(post.commentList ?? []).map((c, i) => (
                  <p
                    key={i}
                    className="mb-2 rounded bg-muted px-3 py-2 text-sm"
                  >
                    {c}
                  </p>
                ))}
                <div className="flex gap-2">
                  <input
                    value={commentText[post.id] ?? ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    placeholder="Write a comment..."
                    className="h-9 flex-1 rounded-full border border-input bg-background px-3 text-sm outline-none"
                  />
                  <button
                    onClick={() => addComment(post.id)}
                    className="rounded-md bg-primary px-3 text-sm text-primary-foreground"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {posts.length === 0 && (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-sm text-muted-foreground">No posts match.</p>
          </div>
        )}
      </div>

      {/* RIGHT: following + creators (desktop only) */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-20 space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
              Following
            </p>
            <ul className="space-y-2 text-sm">
              {data.following.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
              Top creators
            </p>
            <ul className="space-y-2 text-sm">
              {data.topCreators.map((c) => (
                <li key={c.name} className="flex justify-between">
                  <span>{c.name}</span>
                  <span className="text-muted-foreground">{c.posts}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default FeedPage;
