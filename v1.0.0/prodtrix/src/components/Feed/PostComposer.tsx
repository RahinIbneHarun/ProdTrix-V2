"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { PostComposerProps } from "@/interfaces/PostComposerProps";

const EMPTY = { topic: "", chapter: "", content: "" };

const PostComposer = ({ onCreate }: PostComposerProps) => {
  const [form, setForm] = useState(EMPTY);

  const update = (field: keyof typeof EMPTY, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.content.trim()) return;

    onCreate({
      id: `post-${Date.now()}`,
      author: { name: "You", role: "Creator" },
      topic: form.topic.trim() || "General",
      chapter: form.chapter.trim() || "N/A",
      content: form.content.trim(),
      timeAgo: "just now",
      likes: 0,
      comments: 0,
      shares: 0,
    });
    setForm(EMPTY);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-card p-4"
    >
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          U
        </div>
        <textarea
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          placeholder="Share an update, note, or material..."
          className="min-h-[70px] w-full resize-none border-0 bg-transparent text-sm outline-none"
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 border-t border-border pt-3 sm:grid-cols-2">
        <input
          type="text"
          value={form.topic}
          onChange={(e) => update("topic", e.target.value)}
          placeholder="Topic (e.g. Web Development)"
          className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <input
          type="text"
          value={form.chapter}
          onChange={(e) => update("chapter", e.target.value)}
          placeholder="Chapter / Lesson"
          className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={!form.content.trim()}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
          Post
        </button>
      </div>
    </form>
  );
};

export default PostComposer;
