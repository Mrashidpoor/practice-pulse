import { Trophy, TrendingUp, TrendingDown, Target, Users, BarChart3, Zap, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CompetitorScore {
  name: string;
  score: number;
  isYou?: boolean;
}

interface MarketingScoreCardProps {
  yourScore: number;
  competitors: CompetitorScore[];
  trend?: "up" | "down" | "stable";
  trendValue?: string;
}

export function MarketingScoreCard({ 
  yourScore, 
  competitors, 
  trend = "up",
  trendValue = "+0.3 vs last month"
}: MarketingScoreCardProps) {
  const allScores = [
    { name: "You", score: yourScore, isYou: true },
    ...competitors.map(c => ({ ...c, isYou: false })),
  ].sort((a, b) => b.score - a.score);
  
  const yourRank = allScores.findIndex(s => s.isYou) + 1;
  const topScore = allScores[0].score;
  const avgScore = allScores.reduce((sum, s) => sum + s.score, 0) / allScores.length;
  const isAboveAvg = yourScore > avgScore;
  const gapToFirst = yourRank === 1 ? 0 : (topScore - yourScore).toFixed(1);

  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-[hsl(var(--rating-positive))]";
    if (score >= 5) return "text-amber-500";
    return "text-[hsl(var(--rating-negative))]";
  };

  const getScoreBg = (score: number) => {
    if (score >= 7) return "bg-[hsl(var(--rating-positive))]/10";
    if (score >= 5) return "bg-amber-500/10";
    return "bg-[hsl(var(--rating-negative))]/10";
  };

  return (
    <Card className="bg-card border-border shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-stretch">
          {/* Your Score - Hero Section */}
          <div className={cn("flex flex-col items-center justify-center px-6 py-4", getScoreBg(yourScore))}>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Your Marketing Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-4xl font-bold", getScoreColor(yourScore))}>{yourScore}</span>
              <span className="text-sm text-muted-foreground">/10</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {trend === "up" && <TrendingUp className="h-3 w-3 text-[hsl(var(--rating-positive))]" />}
              {trend === "down" && <TrendingDown className="h-3 w-3 text-[hsl(var(--rating-negative))]" />}
              <span className={cn(
                "text-[10px]",
                trend === "up" ? "text-[hsl(var(--rating-positive))]" : "text-[hsl(var(--rating-negative))]"
              )}>
                {trendValue}
              </span>
            </div>
          </div>

          {/* Ranking visualization */}
          <div className="flex-1 px-5 py-3 border-l border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Market Position</span>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                #{yourRank} of {allScores.length}
              </span>
            </div>

            {/* Competitor bars - cleaner design */}
            <div className="space-y-2">
              {allScores.slice(0, 5).map((comp, idx) => {
                const barWidth = (comp.score / 10) * 100;
                return (
                  <div key={comp.name} className="flex items-center gap-3">
                    <span className={cn(
                      "text-xs w-3 text-right tabular-nums",
                      comp.isYou ? "font-bold text-foreground" : "text-muted-foreground"
                    )}>
                      {idx + 1}
                    </span>
                    <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden relative">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-700 ease-out",
                          comp.isYou 
                            ? "bg-gradient-to-r from-primary/80 to-primary" 
                            : "bg-muted-foreground/25"
                        )}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <span className={cn(
                      "text-xs w-14 text-right",
                      comp.isYou ? "font-bold text-foreground" : "text-muted-foreground"
                    )}>
                      {comp.isYou ? "You" : comp.name.split(" ")[0]}
                    </span>
                    <span className={cn(
                      "text-xs w-8 text-right tabular-nums",
                      comp.isYou && "font-bold",
                      getScoreColor(comp.score)
                    )}>
                      {comp.score}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Insights - Compact inline badges */}
          <div className="w-44 px-4 py-3 border-l border-border flex flex-col justify-center gap-2">
            <Badge 
              variant="outline" 
              className={cn(
                "justify-start gap-1.5 py-1 px-2 border-0 text-xs font-medium",
                isAboveAvg 
                  ? "bg-[hsl(var(--rating-positive))]/10 text-[hsl(var(--rating-positive))]" 
                  : "bg-amber-500/10 text-amber-600"
              )}
            >
              <BarChart3 className="h-3 w-3" />
              {isAboveAvg ? "Above" : "Below"} avg ({avgScore.toFixed(1)})
            </Badge>
            
            {yourRank !== 1 && (
              <Badge 
                variant="outline" 
                className="justify-start gap-1.5 py-1 px-2 border-0 text-xs font-medium bg-primary/10 text-primary"
              >
                <ArrowUp className="h-3 w-3" />
                +{gapToFirst} pts to #1
              </Badge>
            )}
            
            <Badge 
              variant="outline" 
              className="justify-start gap-1.5 py-1 px-2 border-0 text-xs font-medium bg-muted text-muted-foreground"
            >
              <Zap className="h-3 w-3" />
              Focus: Reviews
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
