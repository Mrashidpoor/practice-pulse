import { Clock, Megaphone, Video, Heart, TrendingUp, DollarSign, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { MarketingRecommendation } from "@/types/review-analytics";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  recommendation: MarketingRecommendation;
}

const priorityConfig = {
  high: {
    color: "text-[hsl(var(--rating-negative))]",
    bg: "bg-[hsl(var(--rating-negative))]/10",
    progress: 90,
    label: "Urgent",
  },
  medium: {
    color: "text-[hsl(var(--rating-neutral))]",
    bg: "bg-[hsl(var(--rating-neutral))]/10",
    progress: 60,
    label: "Soon",
  },
  low: {
    color: "text-muted-foreground",
    bg: "bg-muted",
    progress: 30,
    label: "Plan",
  },
};

const timeframeConfig = {
  "short-term": { months: 3, label: "3mo" },
  "medium-term": { months: 6, label: "6mo" },
  "long-term": { months: 12, label: "12mo" },
};

function getIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("review")) return Megaphone;
  if (t.includes("video") || t.includes("trust")) return Video;
  if (t.includes("anxiety") || t.includes("comfort")) return Heart;
  if (t.includes("price") || t.includes("billing")) return DollarSign;
  if (t.includes("community") || t.includes("outreach")) return Users;
  return TrendingUp;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const config = priorityConfig[recommendation.priority];
  const timeframe = timeframeConfig[recommendation.timeframe];
  const Icon = getIcon(recommendation.title);

  return (
    <div className="group relative bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
      {/* Priority indicator bar */}
      <div className={cn("absolute top-0 left-4 right-4 h-1 rounded-b-full", config.bg)}>
        <div 
          className={cn("h-full rounded-b-full transition-all", config.color.replace("text-", "bg-"))}
          style={{ width: `${config.progress}%` }}
        />
      </div>

      {/* Icon + Title */}
      <div className="flex items-center gap-3 mt-2">
        <div className={cn("p-2.5 rounded-xl", config.bg)}>
          <Icon className={cn("h-5 w-5", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-foreground leading-tight line-clamp-2">
            {recommendation.title}
          </h4>
        </div>
      </div>

      {/* Visual timeline */}
      <div className="mt-4 flex items-center gap-2">
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full"
            style={{ width: `${(timeframe.months / 12) * 100}%` }}
          />
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">{timeframe.label}</span>
      </div>

      {/* Priority badge */}
      <div className={cn(
        "absolute top-3 right-3 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded",
        config.bg, config.color
      )}>
        {config.label}
      </div>
    </div>
  );
}
