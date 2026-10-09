"use client";

import { TopicOption } from "@/interfaces/TopicOption";

interface TopicsCardProps {
  topics: TopicOption[];
  activeTopic: string;
  onSelect: (topic: string) => void;
}

const TopicsCard = ({ topics, activeTopic, onSelect }: TopicsCardProps) => {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Post topics
      </h3>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelect("All")}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            activeTopic === "All"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>

        {topics.map((topic) => (
          <button
            key={topic.name}
            type="button"
            onClick={() => onSelect(topic.name)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              activeTopic === topic.name
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {topic.name} · {topic.count}
          </button>
        ))}
      </div>
    </div>
  );
};
export default TopicsCard;
