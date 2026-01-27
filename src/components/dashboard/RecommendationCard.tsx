import { Clock, Target, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MarketingRecommendation } from "@/types/review-analytics";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  recommendation: MarketingRecommendation;
}

const priorityStyles = {
  high: {
    badge: "bg-[hsl(var(--rating-negative))]/10 text-[hsl(var(--rating-negative))] border-0",
    dot: "bg-[hsl(var(--rating-negative))]",
  },
  medium: {
    badge: "bg-[hsl(var(--rating-neutral))]/10 text-[hsl(var(--rating-neutral))] border-0",
    dot: "bg-[hsl(var(--rating-neutral))]",
  },
  low: {
    badge: "bg-muted text-muted-foreground border-0",
    dot: "bg-muted-foreground",
  },
};

const timeframeLabels = {
  "short-term": "1-3 months",
  "medium-term": "3-6 months",
  "long-term": "6-12 months",
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const styles = priorityStyles[recommendation.priority];

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="p-5 space-y-4">
        {/* Header with badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={cn("text-xs uppercase", styles.badge)}>
            <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", styles.dot)} />
            {recommendation.priority} Priority
          </Badge>
          <Badge variant="outline" className="text-xs bg-muted border-0">
            <Clock className="h-3 w-3 mr-1" />
            {timeframeLabels[recommendation.timeframe]}
          </Badge>
        </div>

        {/* Title & Description */}
        <div>
          <h4 className="font-semibold text-foreground mb-1.5">{recommendation.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{recommendation.description}</p>
        </div>

        {/* Impact & Audience */}
        <div className="grid gap-3 sm:grid-cols-2 pt-3 border-t border-border">
          <div className="flex items-start gap-2.5">
            <Target className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-medium text-muted-foreground block mb-0.5">Impact</span>
              <p className="text-sm text-foreground">{recommendation.impact}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Users className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-medium text-muted-foreground block mb-0.5">Target Audience</span>
              <p className="text-sm text-foreground">{recommendation.audience}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
