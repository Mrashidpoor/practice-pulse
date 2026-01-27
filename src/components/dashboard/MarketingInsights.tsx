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
    <div className="space-y-6">
      {/* Section 1: Competitive Position Banner */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Reputation Momentum</h3>
              <p className="text-muted-foreground text-sm mb-3">{improvingTrend.message}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-[hsl(var(--rating-negative))]/10 text-[hsl(var(--rating-negative))] border-0">
                  Behind by {improvingTrend.behindBy}
                </Badge>
                <Badge variant="outline" className="bg-muted text-muted-foreground border-0">
                  {improvingTrend.percentile}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Review Metrics Grid */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Review Metrics Comparison
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <MetricCard
            title="Total Reviews"
            yourValue={metrics.totalReviews}
            competitorValue={metrics.totalReviewsCompetitor}
          />
          <MetricCard
            title="Last 12 Months"
            yourValue={metrics.last12MonthsReviews}
            competitorValue={metrics.last12MonthsReviewsCompetitor}
          />
          <MetricCard
            title="Positive Reviews (12 Mo)"
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

      {/* Section 3: Monthly Review Target */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-3">Monthly Review Target</h4>
              <div className="flex flex-wrap items-baseline gap-6">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Current</span>
                  <span className="text-2xl font-bold text-foreground">{monthlyTarget.current}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Target</span>
                  <span className="text-2xl font-bold text-primary">{monthlyTarget.target}</span>
                </div>
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {monthlyTarget.percentageIncrease} increase needed
                </Badge>
              </div>
              {monthlyTarget.seasonalMessage && (
                <p className="text-sm text-muted-foreground mt-3">
                  💡 {monthlyTarget.seasonalMessage}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: SWOT Analysis */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">SWOT Analysis</h3>
        <SWOTGrid swot={swotAnalysis} />
      </div>

      {/* Section 5: Marketing Recommendations */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Marketing Recommendations</h3>
        <div className="space-y-4">
          {sortedRecommendations.map((rec, index) => (
            <RecommendationCard key={index} recommendation={rec} />
          ))}
        </div>
      </div>

      {/* Section 6: Seasonal Tips */}
      {seasonalTips && seasonalTips.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Seasonal Marketing Tips
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {seasonalTips.map((tip) => (
              <Card key={tip.month} className="bg-card border-border shadow-sm">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-2">{tip.month}</h4>
                  <p className="text-sm text-muted-foreground">{tip.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
