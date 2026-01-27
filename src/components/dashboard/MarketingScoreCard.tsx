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

          {/* Key Insights - Redesigned */}
          <div className="w-56 px-4 py-3 border-l border-border bg-muted/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 rounded-md bg-primary/10">
                <Target className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">Key Insights</span>
            </div>
            
            <div className="space-y-2">
              {/* Market Average Insight */}
              <div className={cn(
                "flex items-center gap-2.5 p-2 rounded-lg",
                isAboveAvg 
                  ? "bg-[hsl(var(--rating-positive))]/10" 
                  : "bg-amber-500/10"
              )}>
                <div className={cn(
                  "p-1 rounded-md shrink-0",
                  isAboveAvg 
                    ? "bg-[hsl(var(--rating-positive))]/20" 
                    : "bg-amber-500/20"
                )}>
                  <BarChart3 className={cn(
                    "h-3 w-3",
                    isAboveAvg ? "text-[hsl(var(--rating-positive))]" : "text-amber-600"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={cn(
                    "text-xs font-medium",
                    isAboveAvg ? "text-[hsl(var(--rating-positive))]" : "text-amber-600"
                  )}>
                    {isAboveAvg ? "Above" : "Below"} Average
                  </span>
                  <p className="text-[10px] text-muted-foreground">
                    Market avg: {avgScore.toFixed(1)}
                  </p>
                </div>
              </div>

              {/* Gap to #1 Insight */}
              {yourRank !== 1 && (
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-primary/5">
                  <div className="p-1 rounded-md bg-primary/10 shrink-0">
                    <ArrowUp className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-primary">
                      +{gapToFirst} to #1
                    </span>
                    <p className="text-[10px] text-muted-foreground">
                      Points needed
                    </p>
                  </div>
                </div>
              )}

              {/* Focus Area */}
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/50">
                <div className="p-1 rounded-md bg-muted shrink-0">
                  <Zap className="h-3 w-3 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-foreground">
                    Focus Areas
                  </span>
                  <p className="text-[10px] text-muted-foreground">
                    Reviews & wait times
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
