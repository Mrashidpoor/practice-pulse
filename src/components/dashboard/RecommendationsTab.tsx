import { Calendar } from "lucide-react";
import { RecommendationCard } from "./RecommendationCard";
import type { MarketingRecommendation, SeasonalTip } from "@/types/review-analytics";

interface RecommendationsTabProps {
  recommendations: MarketingRecommendation[];
  seasonalTips?: SeasonalTip[];
}

export function RecommendationsTab({ recommendations, seasonalTips }: RecommendationsTabProps) {
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-4">
      {/* Marketing Recommendations */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Marketing Recommendations</h3>
        <div className="space-y-2">
          {sortedRecommendations.map((rec, index) => (
            <RecommendationCard key={index} recommendation={rec} />
          ))}
        </div>
      </div>

      {/* Seasonal Tips */}
      {seasonalTips && seasonalTips.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            Seasonal Tips
          </h3>
          <div className="grid gap-2 grid-cols-2">
            {seasonalTips.map((tip) => (
              <div key={tip.month} className="bg-card border border-border rounded-lg p-3">
                <h4 className="font-medium text-xs text-foreground mb-1">{tip.month}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
