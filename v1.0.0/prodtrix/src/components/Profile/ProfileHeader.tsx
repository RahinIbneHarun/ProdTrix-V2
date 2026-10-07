"use client";

import { useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { MoreHorizontal, Camera } from "lucide-react";

interface ProfileHeaderProps {
  profile: {
    name: string;
    handle: string;
    bio: string;
    cover?: string;
    avatar?: string;
  };
  onCoverChange: (dataUrl: string) => void;
  onAvatarChange: (dataUrl: string) => void;
}

const DEMO_AVATAR = "/images/Demo-picture.png";

const ProfileHeader = ({
  profile,
  onCoverChange,
  onAvatarChange,
}: ProfileHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const readFile = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (dataUrl: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const avatarSrc = profile.avatar || DEMO_AVATAR;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Cover photo */}
      <div className="group relative h-40 w-full bg-gradient-to-r from-primary/40 to-primary/10 sm:h-52">
        {profile.cover && (
          <Image
            src={profile.cover}
            alt="Cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        )}

        <button
          type="button"
          onClick={() => coverInputRef.current?.click()}
          aria-label="Change cover photo"
          className="absolute right-3 top-3 flex h-9 items-center gap-2 rounded-full bg-black/60 px-3 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Camera className="h-4 w-4" />
          Edit cover
        </button>

        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => readFile(e, onCoverChange)}
          className="hidden"
        />
      </div>

      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="group relative -mt-12 h-24 w-24">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-card bg-primary/10">
            <Image
              src={avatarSrc}
              alt={profile.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            aria-label="Change profile picture"
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary text-white"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => readFile(e, onAvatarChange)}
            className="hidden"
          />
        </div>

        {/* 3-dot menu */}
        <div className="absolute right-4 top-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Profile options"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-muted-foreground hover:text-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-border bg-card py-1 text-sm shadow-lg">
              <button className="block w-full px-4 py-2 text-left hover:bg-muted">
                Edit profile
              </button>
              <button className="block w-full px-4 py-2 text-left hover:bg-muted">
                Copy profile link
              </button>
            </div>
          )}
        </div>

        <div className="mt-3">
          <h1 className="text-xl font-semibold">{profile.name}</h1>
          <p className="text-sm text-muted-foreground">{profile.handle}</p>
          <p className="mt-2 max-w-xl text-sm">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
