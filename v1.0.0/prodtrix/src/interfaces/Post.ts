export interface Post {
  id: string;
  author: {
    name: string;
    role: string;
  };
  topic: string;
  chapter: string;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  shares: number;
}
