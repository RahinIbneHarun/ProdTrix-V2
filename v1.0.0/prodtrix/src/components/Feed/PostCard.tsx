"use client";

import { FormEvent, useState } from "react";
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from "lucide-react";
import { Post } from "@/interfaces/Post";
import { Comment } from "@/interfaces/Comment";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [shareCount, setShareCount] = useState(post.shares);
  const [copied, setCopied] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");

  const likeCount = post.likes + (liked ? 1 : 0);
  const commentCount = post.comments + comments.length;

  const handleShare = async () => {
    const link = `${window.location.origin}/Feed#post-${post.id}`;
    try {
      await navigator.clipboard.writeText(link);
      setShareCount((c) => c + 1);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  const handleComment = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [...prev, { id: `${Date.now()}`, text }]);
    setDraft("");
  };

  return (
    <article
      id={`post-${post.id}`}
      className="overflow-hidden rounded-lg border border-border bg-card"
    >
      {/* Header */}
      <div className="flex items-start gap-3 p-4 pb-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {post.author.name[0]}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {post.author.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {post.author.role} · {post.timeAgo}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setFollowing((f) => !f)}
          className="h-8 shrink-0 rounded-full border border-primary px-4 text-xs font-medium text-primary hover:bg-primary/10"
        >
          {following ? "Following" : "Follow"}
        </button>

        <button
          type="button"
          aria-label="More"
          className="p-1 text-muted-foreground hover:text-foreground"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 px-4 pb-3">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {post.topic}
        </span>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {post.chapter}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 pb-4">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
          {post.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3 text-muted-foreground">
        <button
          type="button"
          onClick={() => setLiked((l) => !l)}
          className={`flex items-center gap-2 text-xs transition-colors hover:text-primary ${
            liked ? "font-semibold text-primary" : ""
          }`}
        >
          <ThumbsUp className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          <span>{likeCount}</span>
        </button>

        <button
          type="button"
          onClick={() => setCommentsOpen((o) => !o)}
          className="flex items-center gap-2 text-xs transition-colors hover:text-primary"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{commentCount}</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-2 text-xs transition-colors hover:text-primary"
        >
          <Share2 className="h-4 w-4" />
          <span>{copied ? "Link copied" : shareCount}</span>
        </button>
      </div>

      {/* Comments */}
      {commentsOpen && (
        <div className="space-y-3 border-t border-border px-4 py-3">
          {comments.map((c) => (
            <p
              key={c.id}
              className="rounded-md bg-muted px-3 py-2 text-sm text-foreground"
            >
              {c.text}
            </p>
          ))}

          <form onSubmit={handleComment} className="flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a comment..."
              className="h-9 flex-1 rounded-full border border-input bg-muted/50 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </article>
  );
};
export default PostCard;
