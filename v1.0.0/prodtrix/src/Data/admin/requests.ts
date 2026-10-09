import {DemoLearningRequest} from "@/interfaces/admin";

export const demoLearningRequests: DemoLearningRequest[] = [
  {
    id: "REQ-3012",

    userId: "USR-1001",
    userName: "Hasan Ahmed",

    chapter: "Thermodynamics",
    lesson: "First Law of Thermodynamics",
    topic: "Energy Conservation",

    text:
      "Can someone explain the first law with a simple real-world example?",

    status: "pending",

    createdAt: "2026-10-08T10:21:00+06:00",
  },

  {
    id: "REQ-3011",

    userId: "USR-1008",
    userName: "Mim Akter",

    chapter: "Cell Biology",
    lesson: "Cell Division",
    topic: "Mitosis vs Meiosis",

    text:
      "I need an organized explanation comparing mitosis and meiosis.",

    status: "in_progress",

    createdAt: "2026-10-08T09:44:00+06:00",
  },

  {
    id: "REQ-3010",

    userId: "USR-1003",
    userName: "Rahim Khan",

    chapter: "Programming Fundamentals",
    lesson: "Functions",
    topic: "Closures",

    text:
      "Please explain JavaScript closures with a practical example.",

    status: "completed",

    createdAt: "2026-10-07T21:18:00+06:00",
  },
];