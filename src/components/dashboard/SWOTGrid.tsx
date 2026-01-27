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
        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-border/50">
          <div className="flex items-center gap-1.5">
            <Icon className={cn("h-3.5 w-3.5", colorClass)} />
            <h4 className="font-semibold text-xs text-foreground">{title}</h4>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={cn("text-sm font-bold", colorClass)}>{score}</span>
            <Progress value={score * 10} className="h-1 w-8" />
          </div>
        </div>

        {/* Insight badge */}
        <div className="px-2.5 py-1.5 border-b border-border/30 bg-muted/30">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] text-foreground font-medium leading-tight flex-1">{insight.label}</p>
            <div className="flex items-center gap-1 shrink-0">
              {insight.trend === "up" && <TrendingUp className="h-2.5 w-2.5 text-[hsl(var(--rating-positive))]" />}
              {insight.trend === "down" && <TrendingDown className="h-2.5 w-2.5 text-[hsl(var(--rating-negative))]" />}
              <Badge variant="outline" className={cn("text-[9px] px-1 py-0 border-0 h-4", colorClass.replace("text-", "bg-") + "/10", colorClass)}>
                {insight.value}
              </Badge>
            </div>
          </div>
        </div>

        {/* Items as compact chips */}
        <div className="px-2.5 py-1.5">
          <div className="flex flex-wrap gap-1">
            {items.slice(0, 3).map((item, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-[9px] px-1.5 py-0 h-4 font-normal bg-background/80 text-muted-foreground"
              >
                {item.length > 20 ? item.substring(0, 20) + "..." : item}
              </Badge>
            ))}
            {items.length > 3 && (
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 text-muted-foreground">
                +{items.length - 3}
              </Badge>
            )}
          </div>
          {/* Action hint inline */}
          {actionLabel && (
            <div className={cn("flex items-center gap-1 text-[9px] mt-1.5", colorClass)}>
              <Zap className="h-2.5 w-2.5" />
              <span className="font-medium">{actionLabel}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function SWOTGrid({ swot }: SWOTGridProps) {
  const sections: SWOTSectionData[] = [
    {
      title: "Strengths",
      items: swot.strengths,
      icon: CheckCircle,
      colorClass: "text-[hsl(var(--rating-positive))]",
      bgClass: "bg-[hsl(var(--rating-positive))]/5",
      score: 8.5,
      insight: { label: "Staff praised 3x more than competitors", value: "Top 15%", trend: "up" },
      actionLabel: "Leverage in marketing"
    },
    {
      title: "Weaknesses", 
      items: swot.weaknesses,
      icon: XCircle,
      colorClass: "text-[hsl(var(--rating-negative))]",
      bgClass: "bg-[hsl(var(--rating-negative))]/5",
      score: 4.2,
      insight: { label: "Wait time mentioned in 23% of reviews", value: "-12% MoM", trend: "down" },
      actionLabel: "Priority fix needed"
    },
    {
      title: "Opportunities",
      items: swot.opportunities,
      icon: Lightbulb,
      colorClass: "text-[hsl(var(--rating-neutral))]",
      bgClass: "bg-[hsl(var(--rating-neutral))]/5",
      score: 7.1,
      insight: { label: "Tax season drives 40% more searches", value: "Feb-Apr", trend: "up" },
      actionLabel: "Plan campaign now"
    },
    {
      title: "Threats",
      items: swot.threats,
      icon: AlertTriangle,
      colorClass: "text-orange-500",
      bgClass: "bg-orange-500/5",
      score: 5.8,
      insight: { label: "2 new competitors within 5 miles", value: "High Risk", trend: "down" },
      actionLabel: "Monitor closely"
    }
  ];

  const overallScore = ((8.5 + (10 - 4.2) + 7.1 + (10 - 5.8)) / 4).toFixed(1);

  return (
    <div className="space-y-2">
      {/* Summary bar */}
      <div className="flex items-center justify-between px-2.5 py-1.5 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-foreground">Market Position</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-primary">{overallScore}</span>
            <span className="text-[10px] text-muted-foreground">/10</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--rating-positive))]" />
            <span className="text-muted-foreground">Strong: <span className="font-medium text-foreground">2</span></span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--rating-negative))]" />
            <span className="text-muted-foreground">Needs work: <span className="font-medium text-foreground">1</span></span>
          </span>
        </div>
      </div>

      {/* SWOT Grid */}
      <div className="grid gap-2 sm:grid-cols-2">
        {sections.map((section) => (
          <SWOTSection key={section.title} data={section} />
        ))}
      </div>
    </div>
  );
}
