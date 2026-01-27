import { TrendingUp, Target, Calendar, Zap, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "./MetricCard";
import { SentimentBreakdown } from "./SentimentBreakdown";
import { SWOTGrid } from "./SWOTGrid";
import { RecommendationCard } from "./RecommendationCard";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
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
      {/* Combined: Review Gap + Metrics + Monthly Target + Trend Chart */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-4">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Review Gap</h3>
                <p className="text-xs text-muted-foreground">{improvingTrend.message}</p>
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <Badge variant="outline" className="bg-[hsl(var(--rating-negative))]/10 text-[hsl(var(--rating-negative))] border-0 text-xs px-2 py-0.5">
                Behind by {improvingTrend.behindBy}
              </Badge>
              <Badge variant="outline" className="bg-muted text-muted-foreground border-0 text-xs px-2 py-0.5">
                {improvingTrend.percentile}
              </Badge>
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-4 divide-x divide-border/50 pt-4 border-t border-border">
            <div className="px-4 first:pl-0 last:pr-0">
              <MetricCard
                title="Lifetime Reviews"
                yourValue={metrics.totalReviews}
                competitorValue={metrics.totalReviewsCompetitor}
              />
            </div>
            <div className="px-4 first:pl-0 last:pr-0">
              <MetricCard
                title="Reviews (12 Mo)"
                yourValue={metrics.last12MonthsReviews}
                competitorValue={metrics.last12MonthsReviewsCompetitor}
              />
            </div>
            <div className="px-4 first:pl-0 last:pr-0">
              <SentimentBreakdown 
                positive={metrics.positiveReviews12Mo} 
                total={metrics.last12MonthsReviews}
                competitorPositive={metrics.positiveReviews12MoCompetitor}
                competitorTotal={metrics.last12MonthsReviewsCompetitor}
              />
            </div>
            <div className="px-4 first:pl-0 last:pr-0">
              <MetricCard
                title="Satisfaction Rate"
                yourValue={metrics.positiveRate}
                competitorValue={metrics.positiveRateCompetitor}
                type="percentage"
              />
            </div>
          </div>

          {/* Monthly Target + Action Stats + Trend Chart Row */}
          <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-border">
            {/* Monthly Target with Progress */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10 shrink-0">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <h4 className="text-xs font-medium text-muted-foreground">Monthly Target</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">{monthlyTarget.current}</span>
                  <span className="text-lg font-bold text-primary">{monthlyTarget.target}</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Current avg</span>
                  <Badge className="bg-primary/10 text-primary border-0 text-[10px] px-1.5 py-0">
                    +{monthlyTarget.percentageIncrease} needed
                  </Badge>
                  <span>Goal</span>
                </div>
              </div>
            </div>

            {/* Catch-up Stats */}
            <div className="space-y-3 border-l border-border pl-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-[hsl(var(--rating-positive))]/10 shrink-0">
                  <Zap className="h-4 w-4 text-[hsl(var(--rating-positive))]" />
                </div>
                <h4 className="text-xs font-medium text-muted-foreground">Weekly Breakdown</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-foreground">4</div>
                  <div className="text-[10px] text-muted-foreground">Reviews/week</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-foreground">22</div>
                  <div className="text-[10px] text-muted-foreground">Months to parity</div>
                </div>
              </div>
              {monthlyTarget.seasonalMessage && (
                <div className="flex items-start gap-1.5 text-[10px] text-primary">
                  <Clock className="h-3 w-3 mt-0.5 shrink-0" />
                  <span className="line-clamp-2">{monthlyTarget.seasonalMessage}</span>
                </div>
              )}
            </div>

            {/* Mini Trend Chart */}
            {improvingTrend.monthlyData && (
              <div className="flex flex-col border-l border-border pl-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-muted-foreground">12 Month Trend</span>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      You
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[hsl(38,92%,50%)]" />
                      Competitor
                    </span>
                  </div>
                </div>
                <div className="h-16 flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={improvingTrend.monthlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="youGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" hide />
                      <YAxis hide domain={[0, 'auto']} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px',
                          fontSize: '11px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="you" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        fill="url(#youGradient)" 
                        name="You"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="competitor" 
                        stroke="hsl(38, 92%, 50%)" 
                        strokeWidth={2}
                        strokeDasharray="4 2"
                        fill="none" 
                        name="Competitor"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SWOT Analysis */}
      <SWOTGrid swot={swotAnalysis} />

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
