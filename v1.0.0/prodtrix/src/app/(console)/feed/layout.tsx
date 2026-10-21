import { FeedShell } from "@/components/Feed/FeedShell";

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return <FeedShell>{children}</FeedShell>;
}
