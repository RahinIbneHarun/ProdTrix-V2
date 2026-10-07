"use client";

import { useEffect, useState } from "react";
import type { ProfilePageData } from "@/types/ProfileProps";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfileDashboard from "./ProfileDashboard";
import ProfileAbout from "./ProfileAbout";
import ProfilePosts from "./ProfilePosts";

type Tab = "dashboard" | "about" | "posts";

const ProfilePage=()=> {
  const [data, setData] = useState<ProfilePageData | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [activeTopic, setActiveTopic] = useState("All");

  useEffect(() => {
    fetch("/Data/profile.json")
      .then((res) => res.json())
      .then((json: ProfilePageData) => setData(json));
  }, []);

  if (!data) return null;

  const handleCoverChange = (dataUrl: string) => {
    setData({
      ...data,
      profile: { ...data.profile, cover: dataUrl },
    });
  };

  const handleAvatarChange = (dataUrl: string) => {
    setData({
      ...data,
      profile: { ...data.profile, avatar: dataUrl },
    });
  };

  return (
    <div className="mx-auto container px-4 py-6">
      <ProfileHeader
        profile={data.profile}
        onCoverChange={handleCoverChange}
        onAvatarChange={handleAvatarChange}
      />
      <ProfileTabs active={tab} onChange={setTab} />

      <div className="mt-6">
        {tab === "dashboard" && (
          <ProfileDashboard stats={data.stats} weekly={data.weekly} />
        )}
        {tab === "about" && <ProfileAbout profile={data.profile} />}
        {tab === "posts" && (
          <ProfilePosts
            posts={data.posts}
            activeTopic={activeTopic}
            onTopicChange={setActiveTopic}
          />
        )}
      </div>
    </div>
  );
}
export default ProfilePage;