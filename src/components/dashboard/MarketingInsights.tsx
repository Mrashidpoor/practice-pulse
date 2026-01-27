import { TrendingUp, TrendingDown, Target, Calendar, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SWOTGrid } from "./SWOTGrid";
import { RecommendationCard } from "./RecommendationCard";
import { cn } from "@/lib/utils";
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

// Compact metric stat
const MetricStat = ({ 
  label, 
  you, 
  them, 
  suffix = "" 
}: { 
  label: string; 
  you: number | string; 
  them: number | string;
  suffix?: string;
}) => {
  const youNum = typeof you === "string" ? parseFloat(you) : you;
  const themNum = typeof them === "string" ? parseFloat(them) : them;
  const diff = youNum - themNum;
  const isAhead = diff > 0;
  
  return (
    <div className="text-center">
      <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>
      <p className="text-base font-bold text-foreground">{you}{suffix}</p>
      <p className={cn(
        "text-[10px] font-medium",
        isAhead ? "text-[hsl(var(--rating-positive))]" : "text-[hsl(var(--rating-negative))]"
      )}>
        {isAhead ? "+" : ""}{diff}{suffix}
      </p>
    </div>
  );
};

// Progress ring for monthly target
const TargetRing = ({ current, target }: { current: string; target: string }) => {
  const currentNum = parseFloat(current) || 0;
  const targetNum = parseFloat(target) || 1;
  const percentage = Math.min((currentNum / targetNum) * 100, 100);
  const size = 48;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="fill-none stroke-primary transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold">{current}/{target}</span>
      </div>
    </div>
  );
};

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

  const behindNum = parseInt(improvingTrend.behindBy) || 0;
  const isAhead = behindNum <= 0;

  return (
    <div className="space-y-4">
      {/* Unified Performance Card */}
      <Card className="bg-card border-border shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {/* Top: Status bar */}
          <div className={cn(
            "flex items-center justify-between px-4 py-2",
            isAhead ? "bg-[hsl(var(--rating-positive))]/10" : "bg-[hsl(var(--rating-negative))]/10"
          )}>
            <div className="flex items-center gap-2">
              {isAhead ? (
                <TrendingUp className="h-4 w-4 text-[hsl(var(--rating-positive))]" />
              ) : (
                <TrendingDown className="h-4 w-4 text-[hsl(var(--rating-negative))]" />
              )}
              <span className={cn(
                "text-xs font-semibold",
                isAhead ? "text-[hsl(var(--rating-positive))]" : "text-[hsl(var(--rating-negative))]"
              )}>
                {isAhead ? "Leading" : `${improvingTrend.behindBy} behind`}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">
              {improvingTrend.percentile}
            </span>
          </div>

          {/* Middle: Metrics grid */}
          <div className="grid grid-cols-5 divide-x divide-border py-4 px-2">
            <MetricStat 
              label="Total" 
              you={metrics.totalReviews} 
              them={metrics.totalReviewsCompetitor} 
            />
            <MetricStat 
              label="12 Mo" 
              you={metrics.last12MonthsReviews} 
              them={metrics.last12MonthsReviewsCompetitor} 
            />
            <MetricStat 
              label="Positive" 
              you={metrics.positiveReviews12Mo} 
              them={metrics.positiveReviews12MoCompetitor} 
            />
            <MetricStat 
              label="Rate" 
              you={metrics.positiveRate} 
              them={metrics.positiveRateCompetitor}
              suffix="%" 
            />
            
            {/* Monthly Target integrated */}
            <div className="flex flex-col items-center justify-center gap-1">
              <TargetRing current={monthlyTarget.current} target={monthlyTarget.target} />
              <div className="flex items-center gap-0.5 text-[10px] text-primary font-medium">
                <ArrowUp className="h-2.5 w-2.5" />
                {monthlyTarget.percentageIncrease}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SWOT Analysis */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">SWOT</h3>
        <SWOTGrid swot={swotAnalysis} />
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Actions</h3>
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
            Seasonal
          </h3>
          <div className="grid gap-2 grid-cols-2">
            {seasonalTips.map((tip) => (
              <div key={tip.month} className="bg-card border border-border rounded-lg p-2">
                <span className="font-medium text-[10px] text-foreground">{tip.month}: </span>
                <span className="text-[10px] text-muted-foreground">{tip.tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
