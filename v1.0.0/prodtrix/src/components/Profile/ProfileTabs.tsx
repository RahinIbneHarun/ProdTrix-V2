type Tab = "dashboard" | "about" | "posts";

interface ProfileTabsProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const TABS: { key: Tab; label: string }[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "about", label: "About" },
  { key: "posts", label: "Posts" },
];

const ProfileTabs=({ active, onChange }: ProfileTabsProps) =>{
  return (
    <div className="mt-6 flex gap-1 border-b border-border">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`border-b-2 px-4 py-2 text-sm font-medium ${
            active === tab.key
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
export default ProfileTabs;
