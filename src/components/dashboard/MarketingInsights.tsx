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
    <div className="space-y-8">
      {/* Section 1: Competitive Position Banner */}
      <Card className="bg-gradient-to-r from-metrics/10 to-metrics/5 border-metrics/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-metrics shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-foreground">{improvingTrend.message}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-300">
                  Behind by {improvingTrend.behindBy}
                </Badge>
                <Badge variant="outline" className="bg-muted text-muted-foreground">
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
          <BarChart3 className="h-5 w-5 text-metrics" />
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
      <Card className="border-teal-200 dark:border-teal-800 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-2">Monthly Review Target</h4>
              <div className="flex flex-wrap items-baseline gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Current: </span>
                  <span className="text-lg font-bold text-foreground">{monthlyTarget.current}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Target: </span>
                  <span className="text-lg font-bold text-teal-600 dark:text-teal-400">{monthlyTarget.target}</span>
                </div>
                <Badge className="bg-teal-600 text-white hover:bg-teal-700">
                  {monthlyTarget.percentageIncrease} increase needed
                </Badge>
              </div>
              {monthlyTarget.seasonalMessage && (
                <p className="text-sm text-muted-foreground mt-2">
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
            <Calendar className="h-5 w-5 text-metrics" />
            Seasonal Marketing Tips
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {seasonalTips.map((tip) => (
              <Card key={tip.month} className="border-border/50">
                <CardContent className="p-4">
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
