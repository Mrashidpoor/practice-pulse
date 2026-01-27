import { Trophy, TrendingUp, TrendingDown, Target, Users } from "lucide-react";
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
          <div className="flex-1 px-4 py-3 border-l border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Market Position</span>
              </div>
              <Badge 
                className={cn(
                  "text-[10px] px-1.5 py-0 border-0",
                  yourRank === 1 
                    ? "bg-[hsl(var(--rating-positive))]/15 text-[hsl(var(--rating-positive))]" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {yourRank === 1 ? (
                  <><Trophy className="h-2.5 w-2.5 mr-0.5" /> #1 in Market</>
                ) : (
                  `#${yourRank} of ${allScores.length}`
                )}
              </Badge>
            </div>

            {/* Competitor bars */}
            <div className="space-y-1">
              {allScores.slice(0, 5).map((comp, idx) => (
                <div key={comp.name} className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] w-3",
                    comp.isYou ? "font-bold text-foreground" : "text-muted-foreground"
                  )}>
                    {idx + 1}
                  </span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        comp.isYou ? "bg-primary" : "bg-muted-foreground/30"
                      )}
                      style={{ width: `${(comp.score / 10) * 100}%` }}
                    />
                  </div>
                  <span className={cn(
                    "text-[10px] w-12 truncate",
                    comp.isYou ? "font-bold text-foreground" : "text-muted-foreground"
                  )}>
                    {comp.isYou ? "You" : comp.name.split(" ")[0]}
                  </span>
                  <span className={cn(
                    "text-[10px] w-6 text-right",
                    comp.isYou ? "font-bold" : "text-muted-foreground",
                    getScoreColor(comp.score)
                  )}>
                    {comp.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="w-48 px-4 py-3 border-l border-border bg-muted/30">
            <div className="flex items-center gap-1.5 mb-2">
              <Target className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground">Key Insights</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-start gap-1.5">
                <span className={cn(
                  "w-1 h-1 rounded-full mt-1.5 shrink-0",
                  isAboveAvg ? "bg-[hsl(var(--rating-positive))]" : "bg-amber-500"
                )} />
                <span className="text-[10px] text-muted-foreground leading-tight">
                  {isAboveAvg ? "Above market average" : "Below market average"} ({avgScore.toFixed(1)})
                </span>
              </div>
              {yourRank !== 1 && (
                <div className="flex items-start gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="text-[10px] text-muted-foreground leading-tight">
                    {gapToFirst} points to reach #1
                  </span>
                </div>
              )}
              <div className="flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span className="text-[10px] text-muted-foreground leading-tight">
                  Focus: Reviews & wait times
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
