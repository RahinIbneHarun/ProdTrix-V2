export interface Profile {
  name: string;
  headline: string;
  following?: number;
  followers?: number;
}

export interface ProfilePost {
  id: string;
  title: string;
  topic: string;
  date: string;
  likes: number;
  comments: number;
}

export interface ProfileStat {
  label: string;
  value: string | number;
}

export interface WeeklyActivity {
  day: string;
  count: number;
}

export interface ProfilePageData {
  profile: Profile & {
    handle: string;
    bio: string;
    field: string;
    status: string;
  };
  stats: ProfileStat[];
  weekly: WeeklyActivity[];
  posts: ProfilePost[];
}