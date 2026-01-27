import { CheckCircle, Clock, Target, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MarketingRecommendation } from "@/types/review-analytics";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  recommendation: MarketingRecommendation;
}

const priorityStyles = {
  high: {
    badge: "bg-destructive/10 text-destructive border-destructive/30",
    border: "border-l-destructive",
  },
  medium: {
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-300 dark:border-orange-700",
    border: "border-l-orange-400",
  },
  low: {
    badge: "bg-muted text-muted-foreground border-border",
    border: "border-l-muted-foreground",
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
    <Card className={cn("border-l-4", styles.border)}>
      <CardContent className="p-4 space-y-3">
        {/* Header with badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={cn("text-xs uppercase", styles.badge)}>
            {recommendation.priority} Priority
          </Badge>
          <Badge variant="outline" className="text-xs bg-muted/50">
            <Clock className="h-3 w-3 mr-1" />
            {timeframeLabels[recommendation.timeframe]}
          </Badge>
        </div>

        {/* Title & Description */}
        <div>
          <h4 className="font-semibold text-foreground mb-1">{recommendation.title}</h4>
          <p className="text-sm text-muted-foreground">{recommendation.description}</p>
        </div>

        {/* Impact & Audience */}
        <div className="grid gap-2 sm:grid-cols-2 pt-2 border-t border-border/50">
          <div className="flex items-start gap-2">
            <Target className="h-4 w-4 text-metrics shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-medium text-muted-foreground">Impact</span>
              <p className="text-sm text-foreground">{recommendation.impact}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-metrics shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-medium text-muted-foreground">Target Audience</span>
              <p className="text-sm text-foreground">{recommendation.audience}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
