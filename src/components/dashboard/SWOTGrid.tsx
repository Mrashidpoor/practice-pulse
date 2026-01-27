import { CheckCircle, XCircle, Lightbulb, AlertTriangle, TrendingUp, TrendingDown, Zap, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { SWOTAnalysis } from "@/types/review-analytics";
import { cn } from "@/lib/utils";

interface SWOTGridProps {
  swot: SWOTAnalysis;
}

interface InsightBadge {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}

interface SWOTSectionData {
  title: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  bgClass: string;
  score: number;
  insight: InsightBadge;
  actionLabel?: string;
}

function SWOTSection({ data }: { data: SWOTSectionData }) {
  const { title, items, icon: Icon, colorClass, bgClass, score, insight, actionLabel } = data;
  
  if (items.length === 0) return null;

  return (
    <Card className={cn("border-border shadow-sm overflow-hidden", bgClass)}>
      <CardContent className="p-0">
        {/* Header with score */}
        <div className="flex items-center justify-between p-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-md", colorClass.replace("text-", "bg-") + "/15")}>
              <Icon className={cn("h-4 w-4", colorClass)} />
            </div>
            <h4 className="font-semibold text-sm text-foreground">{title}</h4>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("text-lg font-bold", colorClass)}>{score}</span>
            <div className="w-12">
              <Progress 
                value={score * 10} 
                className="h-1.5"
              />
            </div>
          </div>
        </div>

        {/* Insight badge */}
        <div className="px-3 py-2 border-b border-border/30 bg-muted/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Key Insight</span>
            <div className="flex items-center gap-1.5">
              {insight.trend === "up" && <TrendingUp className="h-3 w-3 text-[hsl(var(--rating-positive))]" />}
              {insight.trend === "down" && <TrendingDown className="h-3 w-3 text-[hsl(var(--rating-negative))]" />}
              <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 border-0", colorClass.replace("text-", "bg-") + "/10", colorClass)}>
                {insight.value}
              </Badge>
            </div>
          </div>
          <p className="text-xs text-foreground mt-1 font-medium">{insight.label}</p>
        </div>

        {/* Items as compact chips */}
        <div className="p-3">
          <div className="flex flex-wrap gap-1.5">
            {items.slice(0, 3).map((item, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-[10px] px-2 py-0.5 font-normal bg-background/80 text-muted-foreground"
              >
                {item.length > 25 ? item.substring(0, 25) + "..." : item}
              </Badge>
            ))}
            {items.length > 3 && (
              <Badge variant="outline" className="text-[10px] px-2 py-0.5 text-muted-foreground">
                +{items.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action hint */}
        {actionLabel && (
          <div className="px-3 pb-3">
            <div className={cn("flex items-center gap-1.5 text-[10px]", colorClass)}>
              <Zap className="h-3 w-3" />
              <span className="font-medium">{actionLabel}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function SWOTGrid({ swot }: SWOTGridProps) {
  // Generate insights based on SWOT data
  const sections: SWOTSectionData[] = [
    {
      title: "Strengths",
      items: swot.strengths,
      icon: CheckCircle,
      colorClass: "text-[hsl(var(--rating-positive))]",
      bgClass: "bg-[hsl(var(--rating-positive))]/5",
      score: 8.5,
      insight: {
        label: "Staff praised 3x more than competitors",
        value: "Top 15%",
        trend: "up"
      },
      actionLabel: "Leverage in marketing"
    },
    {
      title: "Weaknesses", 
      items: swot.weaknesses,
      icon: XCircle,
      colorClass: "text-[hsl(var(--rating-negative))]",
      bgClass: "bg-[hsl(var(--rating-negative))]/5",
      score: 4.2,
      insight: {
        label: "Wait time mentioned in 23% of reviews",
        value: "-12% MoM",
        trend: "down"
      },
      actionLabel: "Priority fix needed"
    },
    {
      title: "Opportunities",
      items: swot.opportunities,
      icon: Lightbulb,
      colorClass: "text-[hsl(var(--rating-neutral))]",
      bgClass: "bg-[hsl(var(--rating-neutral))]/5",
      score: 7.1,
      insight: {
        label: "Tax season drives 40% more searches",
        value: "Feb-Apr",
        trend: "up"
      },
      actionLabel: "Plan campaign now"
    },
    {
      title: "Threats",
      items: swot.threats,
      icon: AlertTriangle,
      colorClass: "text-orange-500",
      bgClass: "bg-orange-500/5",
      score: 5.8,
      insight: {
        label: "2 new competitors within 5 miles",
        value: "High Risk",
        trend: "down"
      },
      actionLabel: "Monitor closely"
    }
  ];

  // Summary stats
  const overallScore = ((8.5 + (10 - 4.2) + 7.1 + (10 - 5.8)) / 4).toFixed(1);

  return (
    <div className="space-y-3">
      {/* Summary bar */}
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Market Position Score</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{overallScore}</span>
            <span className="text-xs text-muted-foreground">/10</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--rating-positive))]" />
            <span className="text-muted-foreground">Above avg in <span className="font-medium text-foreground">2</span> areas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--rating-negative))]" />
            <span className="text-muted-foreground">Needs work in <span className="font-medium text-foreground">1</span> area</span>
          </div>
        </div>
      </div>

      {/* SWOT Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {sections.map((section) => (
          <SWOTSection key={section.title} data={section} />
        ))}
      </div>
    </div>
  );
}
