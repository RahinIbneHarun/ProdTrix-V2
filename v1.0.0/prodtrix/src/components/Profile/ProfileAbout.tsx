interface ProfileAboutProps {
  profile: {
    bio: string;
    field: string;
    status: string;
  };
}

export default function ProfileAbout({ profile }: ProfileAboutProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-sm text-muted-foreground">{profile.bio}</p>

      <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">Field</dt>
          <dd>{profile.field}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Status</dt>
          <dd>{profile.status}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Location</dt>
          <dd>Dhaka, Bangladesh</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Joined</dt>
          <dd>October 2026</dd>
        </div>
      </dl>
    </div>
  );
}