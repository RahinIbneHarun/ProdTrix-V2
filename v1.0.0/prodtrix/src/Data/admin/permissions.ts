import {Permission, DemoRole} from "@/interfaces/admin";

export const demoPermissions: Permission[] = [
  {
    id: "view_feed",
    label: "View Feed",
    description: "Browse published posts in the main feed.",

    consumer: true,
    creator: true,
    super_admin: true,
  },

  {
    id: "like_post",
    label: "Like / React",
    description: "React to published posts.",

    consumer: true,
    creator: true,
    super_admin: true,
  },

  {
    id: "comment_post",
    label: "Comment",
    description: "Add comments to published posts.",

    consumer: true,
    creator: true,
    super_admin: true,
  },

  {
    id: "share_post",
    label: "Share Post",
    description: "Share posts with the user's network.",

    consumer: true,
    creator: true,
    super_admin: true,
  },

  {
    id: "follow_user",
    label: "Follow User",
    description: "Follow other users and creators.",

    consumer: true,
    creator: true,
    super_admin: true,
  },

  {
    id: "create_post",
    label: "Create Post",
    description: "Create and publish educational content.",

    consumer: false,
    creator: true,
    super_admin: true,
  },

  {
    id: "edit_own_post",
    label: "Edit Own Post",
    description: "Modify content created by the current user.",

    consumer: false,
    creator: true,
    super_admin: true,
  },

  {
    id: "create_request",
    label: "Create Learning Request",
    description:
      "Submit chapter, lesson, topic, and text requests.",

    consumer: true,
    creator: true,
    super_admin: true,
  },

  {
    id: "draw_studio",
    label: "Draw Studio",
    description:
      "Use the visual canvas and save educational drafts.",

    consumer: false,
    creator: true,
    super_admin: true,
  },

  {
    id: "manage_profile",
    label: "Manage Own Profile",
    description:
      "Update profile, cover photo, about section, and public information.",

    consumer: true,
    creator: true,
    super_admin: true,
  },

  {
    id: "view_activity_logs",
    label: "View Activity Logs",
    description:
      "Review platform user activity and audit records.",

    consumer: false,
    creator: false,
    super_admin: true,
  },

  {
    id: "manage_authorization",
    label: "Manage Authorization",
    description:
      "View and modify role permissions.",

    consumer: false,
    creator: false,
    super_admin: true,
  },

  {
    id: "change_user_role",
    label: "Change User Role",
    description:
      "Change a user's Consumer/Creator role.",

    consumer: false,
    creator: false,
    super_admin: true,
  },
];

export const demoRoleSummary = [
  {
    role: "consumer" as DemoRole,
    label: "Content Consumer",
    description:
      "Discover and interact with educational content.",
    userCount: 892,
    activeToday: 317,
  },

  {
    role: "creator" as DemoRole,
    label: "Content Creator",
    description:
      "Create, publish and organize educational content.",
    userCount: 326,
    activeToday: 142,
  },

  {
    role: "super_admin" as DemoRole,
    label: "Super Admin",
    description:
      "Full governance, authorization and security control.",
    userCount: 3,
    activeToday: 1,
  },
];