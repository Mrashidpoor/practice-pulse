import { Clock, Target, Users, Megaphone, Video, Heart, Star, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MarketingRecommendation } from "@/types/review-analytics";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  recommendation: MarketingRecommendation;
}

const priorityStyles = {
  high: {
    badge: "bg-[hsl(var(--rating-negative))]/10 text-[hsl(var(--rating-negative))] border-0",
    iconBg: "bg-[hsl(var(--rating-negative))]/10",
    iconColor: "text-[hsl(var(--rating-negative))]",
  },
  medium: {
    badge: "bg-[hsl(var(--rating-neutral))]/10 text-[hsl(var(--rating-neutral))] border-0",
    iconBg: "bg-[hsl(var(--rating-neutral))]/10",
    iconColor: "text-[hsl(var(--rating-neutral))]",
  },
  low: {
    badge: "bg-muted text-muted-foreground border-0",
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
  },
};

const timeframeLabels = {
  "short-term": "1-3 mo",
  "medium-term": "3-6 mo",
  "long-term": "6-12 mo",
};

// Map recommendation titles to icons
function getRecommendationIcon(title: string) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("review")) return Megaphone;
  if (titleLower.includes("video") || titleLower.includes("trust")) return Video;
  if (titleLower.includes("anxiety") || titleLower.includes("comfort")) return Heart;
  if (titleLower.includes("star") || titleLower.includes("rating")) return Star;
  return TrendingUp;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const styles = priorityStyles[recommendation.priority];
  const Icon = getRecommendationIcon(recommendation.title);

  return (
    <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg hover:bg-muted/30 transition-colors">
      {/* Icon */}
      <div className={cn("p-2 rounded-lg shrink-0", styles.iconBg)}>
        <Icon className={cn("h-4 w-4", styles.iconColor)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-semibold text-sm text-foreground truncate">{recommendation.title}</h4>
          <Badge className={cn("text-[10px] uppercase px-1.5 py-0", styles.badge)}>
            {recommendation.priority}
          </Badge>
          <Badge variant="outline" className="text-[10px] bg-muted border-0 px-1.5 py-0">
            <Clock className="h-2.5 w-2.5 mr-0.5" />
            {timeframeLabels[recommendation.timeframe]}
          </Badge>
        </div>
        
        {/* Compact metrics row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Target className="h-3 w-3 text-primary shrink-0" />
            <span className="truncate">{recommendation.impact}</span>
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3 text-primary shrink-0" />
            <span className="truncate">{recommendation.audience}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
