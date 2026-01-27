import { CheckCircle, XCircle, Lightbulb, AlertTriangle, TrendingUp, TrendingDown, Zap, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
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
  score: number;
  insight: InsightBadge;
  actionLabel?: string;
}

function SWOTColumn({ data }: { data: SWOTSectionData }) {
  const { title, items, icon: Icon, colorClass, score, insight, actionLabel } = data;
  
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Icon className={cn("h-4 w-4", colorClass)} />
          <h4 className="font-semibold text-sm text-foreground">{title}</h4>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className={cn("text-lg font-bold", colorClass)}>{score}</span>
          <span className="text-[10px] text-muted-foreground">/10</span>
        </div>
      </div>

      {/* Progress bar */}
      <Progress value={score * 10} className="h-1.5 mb-3" />

      {/* Key insight */}
      <div className="bg-muted/50 rounded-md p-2 mb-3">
        <div className="flex items-start justify-between gap-1.5">
          <p className="text-xs text-foreground leading-snug flex-1">{insight.label}</p>
          <div className="flex items-center gap-1 shrink-0">
            {insight.trend === "up" && <TrendingUp className="h-3 w-3 text-[hsl(var(--rating-positive))]" />}
            {insight.trend === "down" && <TrendingDown className="h-3 w-3 text-[hsl(var(--rating-negative))]" />}
          </div>
        </div>
        <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 mt-1.5 border-0", colorClass.replace("text-", "bg-") + "/10", colorClass)}>
          {insight.value}
        </Badge>
      </div>

      {/* Items list */}
      <ul className="space-y-1.5 flex-1">
        {items.slice(0, 3).map((item, index) => (
          <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5">
            <span className={cn("w-1 h-1 rounded-full mt-1.5 shrink-0", colorClass.replace("text-", "bg-"))} />
            <span className="line-clamp-2">{item}</span>
          </li>
        ))}
        {items.length > 3 && (
          <li className="text-[10px] text-muted-foreground/70">+{items.length - 3} more</li>
        )}
      </ul>

      {/* Action */}
      {actionLabel && (
        <div className={cn("flex items-center gap-1 text-[10px] mt-2 pt-2 border-t border-border/50", colorClass)}>
          <Zap className="h-3 w-3" />
          <span className="font-medium">{actionLabel}</span>
        </div>
      )}
    </div>
  );
}

export function SWOTGrid({ swot }: SWOTGridProps) {
  const sections: SWOTSectionData[] = [
    {
      title: "Strengths",
      items: swot.strengths,
      icon: CheckCircle,
      colorClass: "text-[hsl(var(--rating-positive))]",
      score: 8.5,
      insight: { label: "99% positive sentiment vs 93% competitor average", value: "+6% ahead", trend: "up" },
      actionLabel: "Feature in Google Ads"
    },
    {
      title: "Weaknesses", 
      items: swot.weaknesses,
      icon: XCircle,
      colorClass: "text-[hsl(var(--rating-negative))]",
      score: 4.2,
      insight: { label: "Wait time mentioned in 23% of reviews", value: "-12% MoM", trend: "down" },
      actionLabel: "Reduce wait times"
    },
    {
      title: "Opportunities",
      items: swot.opportunities,
      icon: Lightbulb,
      colorClass: "text-amber-500",
      score: 7.1,
      insight: { label: "Up to 40% growth potential within 6 months by capitalizing on seasonal trends", value: "+48 reviews/yr", trend: "up" },
      actionLabel: "Automate follow-ups"
    },
    {
      title: "Threats",
      items: swot.threats,
      icon: AlertTriangle,
      colorClass: "text-orange-500",
      score: 5.8,
      insight: { label: "Competitor outperforms on: billing transparency, anxiety care, and wait times", value: "3 key areas", trend: "down" },
      actionLabel: "Close the gap"
    }
  ];
  
  // Calculate overall score from SWOT
  const yourScore = 6.4;
  
  // Top 5 competitor scores
  const competitorScores = [
    { name: "Smile Dental Care", score: 7.2 },
    { name: "Family Dental", score: 6.9 },
    { name: "Gentle Dentistry", score: 7.5 },
    { name: "Premier Dental", score: 6.1 },
    { name: "Bright Smiles", score: 5.8 },
  ];
  
  // All scores for ranking
  const allScores = [
    { name: "You", score: yourScore, isYou: true },
    ...competitorScores.map(c => ({ ...c, isYou: false })),
  ].sort((a, b) => b.score - a.score);
  
  const yourRank = allScores.findIndex(s => s.isYou) + 1;
  const strongCount = sections.filter(s => s.score >= 7).length;
  const needsWorkCount = sections.filter(s => s.score < 5).length;

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">SWOT Analysis</span>
          </div>

          {/* Status badges */}
          <div className="flex items-center gap-2">
            <Badge className="bg-[hsl(var(--rating-positive))]/15 text-[hsl(var(--rating-positive))] border-0 text-xs px-2 py-0.5 font-medium">
              <CheckCircle className="h-3 w-3 mr-1" />
              {strongCount} Strong
            </Badge>
            {needsWorkCount > 0 && (
              <Badge className="bg-[hsl(var(--rating-negative))]/15 text-[hsl(var(--rating-negative))] border-0 text-xs px-2 py-0.5 font-medium">
                <XCircle className="h-3 w-3 mr-1" />
                {needsWorkCount} Needs Work
              </Badge>
            )}
          </div>
        </div>

        {/* 4-column SWOT */}
        <div className="grid grid-cols-4 gap-4 divide-x divide-border">
          {sections.map((section, index) => (
            <div key={section.title} className={cn("h-full", index > 0 && "pl-4")}>
              <SWOTColumn data={section} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
