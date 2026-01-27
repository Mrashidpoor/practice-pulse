import { cn } from "@/lib/utils";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface CompetitorData {
  name: string;
  value: number;
  isYou?: boolean;
}

interface CompetitorRankChartProps {
  title: string;
  competitors: CompetitorData[];
  type?: "number" | "percentage";
  suffix?: string;
}

export function CompetitorRankChart({
  title,
  competitors,
  type = "number",
  suffix = "",
}: CompetitorRankChartProps) {
  // Sort by value descending
  const sorted = [...competitors].sort((a, b) => b.value - a.value);
  const maxValue = type === "percentage" ? 100 : Math.max(...sorted.map(c => c.value));
  
  // Find your rank
  const yourRank = sorted.findIndex(c => c.isYou) + 1;
  const isFirst = yourRank === 1;
  const isLast = yourRank === sorted.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium text-muted-foreground">{title}</h4>
        <span
          className={cn(
            "flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded",
            isFirst && "bg-[hsl(var(--rating-positive))]/10 text-[hsl(var(--rating-positive))]",
            isLast && "bg-[hsl(var(--rating-negative))]/10 text-[hsl(var(--rating-negative))]",
            !isFirst && !isLast && "bg-muted text-muted-foreground"
          )}
        >
          {isFirst ? (
            <>
              <Trophy className="h-2.5 w-2.5" />
              #1
            </>
          ) : (
            <>
              #{yourRank} of {sorted.length}
            </>
          )}
        </span>
      </div>
      
      {/* Compact bar visualization */}
      <div className="space-y-1">
        {sorted.map((comp, idx) => {
          const width = maxValue > 0 ? (comp.value / maxValue) * 100 : 0;
          return (
            <div key={comp.name} className="flex items-center gap-2">
              <span className={cn(
                "text-[10px] w-3 text-right",
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
                  style={{ width: `${width}%` }}
                />
              </div>
              <span className={cn(
                "text-[10px] w-14 text-right truncate",
                comp.isYou ? "font-bold text-foreground" : "text-muted-foreground"
              )}>
                {comp.isYou ? "You" : comp.name.split(" ")[0]}
              </span>
              <span className={cn(
                "text-[10px] w-8 text-right",
                comp.isYou ? "font-bold text-foreground" : "text-muted-foreground"
              )}>
                {comp.value}{suffix}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
