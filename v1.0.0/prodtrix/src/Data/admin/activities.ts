import { AdminActivity } from "@/interfaces/admin";

export const demoActivities: AdminActivity[] = [
  {
    id: "ACT-9001",
    userId: "USR-1001",
    userName: "Hasan Ahmed",
    userRole: "consumer",
    userAvatar: "https://i.pravatar.cc/150?img=12",

    type: "like",
    actionLabel: "Liked a post",

    targetType: "post",
    targetId: "POST-2004",
    targetName: "Newton's Laws — An Easy Explanation",

    timestamp: "2026-10-08T10:42:00+06:00",

    ipAddress: "192.168.10.24",
    device: "Chrome · Windows",
    location: "Dhaka, Bangladesh",

    severity: "low",

    details:
      "User reacted with Like to a creator's educational post.",
  },

  {
    id: "ACT-9002",
    userId: "USR-1002",
    userName: "Nabila Rahman",
    userRole: "creator",
    userAvatar: "https://i.pravatar.cc/150?img=47",

    type: "comment",
    actionLabel: "Commented on a post",

    targetType: "post",
    targetId: "POST-2008",
    targetName: "React Hooks: useEffect Explained",

    timestamp: "2026-10-08T10:39:00+06:00",

    ipAddress: "103.92.14.81",
    device: "Chrome · Windows",
    location: "Dhaka, Bangladesh",

    severity: "low",

    details:
      "Creator added a comment to continue the discussion.",
  },

  {
    id: "ACT-9003",
    userId: "USR-1003",
    userName: "Rahim Khan",
    userRole: "consumer",
    userAvatar: "https://i.pravatar.cc/150?img=68",

    type: "follow",
    actionLabel: "Followed a creator",

    targetType: "user",
    targetId: "USR-1006",
    targetName: "Fahim Ahmed",

    timestamp: "2026-10-08T10:35:00+06:00",

    ipAddress: "192.168.12.41",
    device: "Edge · Windows",
    location: "Chattogram, Bangladesh",

    severity: "low",

    details:
      "User started following a content creator.",
  },

  {
    id: "ACT-9004",
    userId: "USR-1004",
    userName: "Tanvir Hossain",
    userRole: "consumer",
    userAvatar: "https://i.pravatar.cc/150?img=13",

    type: "share",
    actionLabel: "Shared a post",

    targetType: "post",
    targetId: "POST-2012",
    targetName: "Database Normalization — 1NF to 3NF",

    timestamp: "2026-10-08T10:31:00+06:00",

    ipAddress: "10.0.0.74",
    device: "Chrome · Android",
    location: "Dhaka, Bangladesh",

    severity: "normal",

    details:
      "User shared the post with their network.",
  },

  {
    id: "ACT-9005",
    userId: "USR-1005",
    userName: "Sadia Islam",
    userRole: "creator",
    userAvatar: "https://i.pravatar.cc/150?img=44",

    type: "profile_view",
    actionLabel: "Viewed a profile",

    targetType: "profile",
    targetId: "USR-1006",
    targetName: "Fahim Ahmed",

    timestamp: "2026-10-08T10:27:00+06:00",

    ipAddress: "103.45.91.22",
    device: "Safari · iPhone",
    location: "Dhaka, Bangladesh",

    severity: "low",

    details:
      "User opened another creator's public profile.",
  },

  {
    id: "ACT-9006",
    userId: "USR-1001",
    userName: "Hasan Ahmed",
    userRole: "consumer",
    userAvatar: "https://i.pravatar.cc/150?img=12",

    type: "request_created",
    actionLabel: "Created a learning request",

    targetType: "request",
    targetId: "REQ-3012",
    targetName: "Thermodynamics — First Law",

    timestamp: "2026-10-08T10:21:00+06:00",

    ipAddress: "192.168.10.24",
    device: "Chrome · Windows",
    location: "Dhaka, Bangladesh",

    severity: "normal",

    details:
      "Request path: Physics → Thermodynamics → First Law.",
  },

  {
    id: "ACT-9007",
    userId: "USR-1006",
    userName: "Fahim Ahmed",
    userRole: "creator",
    userAvatar: "https://i.pravatar.cc/150?img=11",

    type: "post_created",
    actionLabel: "Published a post",

    targetType: "post",
    targetId: "POST-2015",
    targetName:
      "JavaScript Closures — From Basics to Practical Use",

    timestamp: "2026-10-08T10:18:00+06:00",

    ipAddress: "103.112.21.19",
    device: "Chrome · macOS",
    location: "Dhaka, Bangladesh",

    severity: "normal",

    details:
      "Creator published a new educational post under Programming.",
  },

  {
    id: "ACT-9008",
    userId: "USR-1005",
    userName: "Sadia Islam",
    userRole: "creator",
    userAvatar: "https://i.pravatar.cc/150?img=44",

    type: "post_updated",
    actionLabel: "Updated a post",

    targetType: "post",
    targetId: "POST-1987",
    targetName:
      "Calculus Basics — Limits & Continuity",

    timestamp: "2026-10-08T10:12:00+06:00",

    ipAddress: "103.45.91.22",
    device: "Safari · iPhone",
    location: "Dhaka, Bangladesh",

    severity: "normal",

    details:
      "Creator updated the body text of an existing post.",
  },

  {
    id: "ACT-9009",
    userId: "USR-1008",
    userName: "Mim Akter",
    userRole: "consumer",
    userAvatar: "https://i.pravatar.cc/150?img=49",

    type: "file_uploaded",
    actionLabel: "Uploaded a file",

    targetType: "file",
    targetId: "FILE-4102",
    targetName: "Biology Cell Notes.pdf",

    timestamp: "2026-10-08T10:05:00+06:00",

    ipAddress: "192.168.14.32",
    device: "Chrome · Android",
    location: "Rajshahi, Bangladesh",

    severity: "normal",

    details:
      "File uploaded while preparing educational content.",
  },

  {
    id: "ACT-9010",
    userId: "USR-1002",
    userName: "Nabila Rahman",
    userRole: "creator",
    userAvatar: "https://i.pravatar.cc/150?img=47",

    type: "draw_saved",
    actionLabel: "Saved a Draw Studio draft",

    targetType: "file",
    targetId: "DRAW-5011",
    targetName: "OSI Model Visual Diagram",

    timestamp: "2026-10-08T09:58:00+06:00",

    ipAddress: "103.92.14.81",
    device: "Chrome · Windows",
    location: "Dhaka, Bangladesh",

    severity: "normal",

    details:
      "Canvas draft saved with 14 objects across 3 layers.",
  },

  {
    id: "ACT-9011",
    userId: "USR-1007",
    userName: "Rafiul Karim",
    userRole: "consumer",
    userAvatar: "https://i.pravatar.cc/150?img=53",

    type: "login",
    actionLabel: "Logged in",

    targetType: "system",
    targetId: "SESSION-7781",
    targetName: "Platform",

    timestamp: "2026-10-07T18:12:00+06:00",

    ipAddress: "172.16.4.91",
    device: "Chrome · Windows",
    location: "Khulna, Bangladesh",

    severity: "medium",

    details:
      "Login recorded before the account was suspended.",
  },
];