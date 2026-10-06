import Link from "next/link";

const CURRENT_USER = {
  name: "ProdTrix Demo",
  headline: "Learner · Web Development",
  following: 54,
  followers: 128,
};

const ProfileMiniCard=() =>{
  return (
    <div className="rounded-lg border border-border bg-card p-5 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
        {CURRENT_USER.name[0]}
      </div>

      <Link
        href="/Profile"
        className="mt-3 block text-base font-semibold text-foreground hover:underline"
      >
        {CURRENT_USER.name}
      </Link>
      <p className="text-xs text-muted-foreground">{CURRENT_USER.headline}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {CURRENT_USER.following}
          </p>
          <p className="text-xs text-muted-foreground">Following</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {CURRENT_USER.followers}
          </p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileMiniCard;