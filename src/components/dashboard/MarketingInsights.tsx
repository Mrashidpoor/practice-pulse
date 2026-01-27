import { TrendingUp, Target, Calendar, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "./MetricCard";
import { SWOTGrid } from "./SWOTGrid";
import { RecommendationCard } from "./RecommendationCard";
import type {
  ImprovingTrend,
  ReviewMetrics,
  MonthlyTarget,
  SWOTAnalysis,
  MarketingRecommendation,
  SeasonalTip,
} from "@/types/review-analytics";

interface MarketingInsightsProps {
  improvingTrend: ImprovingTrend;
  metrics: ReviewMetrics;
  monthlyTarget: MonthlyTarget;
  swotAnalysis: SWOTAnalysis;
  recommendations: MarketingRecommendation[];
  seasonalTips?: SeasonalTip[];
}

export function MarketingInsights({
  improvingTrend,
  metrics,
  monthlyTarget,
  swotAnalysis,
  recommendations,
  seasonalTips,
}: MarketingInsightsProps) {
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-4">
      {/* Section 1: Competitive Position Banner - compact */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="font-semibold text-sm text-foreground">Reputation Momentum</h3>
                <div className="flex gap-1.5">
                  <Badge variant="outline" className="bg-[hsl(var(--rating-negative))]/10 text-[hsl(var(--rating-negative))] border-0 text-xs px-2 py-0.5">
                    Behind by {improvingTrend.behindBy}
                  </Badge>
                  <Badge variant="outline" className="bg-muted text-muted-foreground border-0 text-xs px-2 py-0.5">
                    {improvingTrend.percentile}
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{improvingTrend.message}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Review Metrics Grid - compact 2x2 */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4 text-primary" />
          Review Metrics
        </h3>
        <div className="grid gap-2 grid-cols-2">
          <MetricCard
            title="Total Reviews"
            yourValue={metrics.totalReviews}
            competitorValue={metrics.totalReviewsCompetitor}
          />
          <MetricCard
            title="Last 12 Mo"
            yourValue={metrics.last12MonthsReviews}
            competitorValue={metrics.last12MonthsReviewsCompetitor}
          />
          <MetricCard
            title="Positive (12 Mo)"
            yourValue={metrics.positiveReviews12Mo}
            competitorValue={metrics.positiveReviews12MoCompetitor}
          />
          <MetricCard
            title="Positive Rate"
            yourValue={metrics.positiveRate}
            competitorValue={metrics.positiveRateCompetitor}
            type="percentage"
          />
        </div>
      </div>

      {/* Section 3: Monthly Review Target - compact inline */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-md bg-primary/10 shrink-0">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-center gap-4 flex-wrap flex-1">
              <h4 className="text-sm font-semibold text-foreground">Monthly Target</h4>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Current: <span className="font-bold text-foreground">{monthlyTarget.current}</span></span>
                <span className="text-xs text-muted-foreground">Target: <span className="font-bold text-primary">{monthlyTarget.target}</span></span>
                <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                  {monthlyTarget.percentageIncrease} increase
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: SWOT Analysis */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">SWOT Analysis</h3>
        <SWOTGrid swot={swotAnalysis} />
      </div>

      {/* Section 5: Marketing Recommendations */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Marketing Recommendations</h3>
        <div className="space-y-2">
          {sortedRecommendations.map((rec, index) => (
            <RecommendationCard key={index} recommendation={rec} />
          ))}
        </div>
      </div>

      {/* Section 6: Seasonal Tips - compact */}
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
