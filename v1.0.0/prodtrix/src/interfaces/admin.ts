export type ActivityType =
  | "login"
  | "post_created"
  | "post_updated"
  | "like"
  | "comment"
  | "share"
  | "follow"
  | "profile_view"
  | "request_created"
  | "file_uploaded"
  | "draw_saved";

export interface AdminActivity {
  id: string;
  userId: string;
  userName: string;
  userRole: "consumer" | "creator" | "super_admin";
  userAvatar: string;
  type: ActivityType;
  actionLabel: string;
  targetType: "post" | "profile" | "user" | "request" | "file" | "system";
  targetId: string;
  targetName: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  location: string;
  severity: "low" | "normal" | "medium" | "high";
  details: string;
}


export type UserRole = "consumer" | "creator" | "super_admin";

export type UserStatus = "active" | "suspended" | "pending";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
  lastActive: string;
  totalPosts: number;
  followers: number;
  following: number;
}


export type DemoRole =
  | "consumer"
  | "creator"
  | "super_admin";

export interface Permission {
  id: string;
  label: string;
  description: string;

  consumer: boolean;
  creator: boolean;
  super_admin: boolean;
}


export interface DemoLearningRequest {
  id: string;

  userId: string;
  userName: string;

  chapter: string;
  lesson: string;
  topic: string;

  text: string;

  status:
    | "pending"
    | "in_progress"
    | "completed";

  createdAt: string;
}