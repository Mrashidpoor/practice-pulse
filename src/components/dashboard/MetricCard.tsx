import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  yourValue: number | string;
  competitorValue: number | string;
  competitorName?: string;
  type?: "number" | "percentage";
  showDifference?: boolean;
}

export function MetricCard({
  title,
  yourValue,
  competitorValue,
  competitorName = "Top Competitor",
  type = "number",
  showDifference = true,
}: MetricCardProps) {
  const yourNum = typeof yourValue === "string" ? parseFloat(yourValue) : yourValue;
  const compNum = typeof competitorValue === "string" ? parseFloat(competitorValue) : competitorValue;
  const difference = yourNum - compNum;
  const isAhead = difference > 0;
  const isBehind = difference < 0;
  const percentageOfCompetitor = compNum > 0 ? (yourNum / compNum) * 100 : 100;

  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-medium text-muted-foreground">{title}</h4>
        {showDifference && (
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              isAhead && "text-[hsl(var(--rating-positive))]",
              isBehind && "text-[hsl(var(--rating-negative))]",
              !isAhead && !isBehind && "text-muted-foreground"
            )}
          >
            {isAhead ? (
              <>
                <ThumbsUp className="h-3 w-3" />
                +{Math.abs(difference)}{type === "percentage" ? "%" : ""}
              </>
            ) : isBehind ? (
              <>
                <ThumbsDown className="h-3 w-3" />
                -{Math.abs(difference)}{type === "percentage" ? "%" : ""}
              </>
            ) : (
              <>
                <Minus className="h-3 w-3" />
                Tied
              </>
            )}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        {/* Your Practice */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16 shrink-0">You</span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${Math.min(percentageOfCompetitor, 100)}%` }}
            />
          </div>
          <span className="text-sm font-bold text-foreground w-12 text-right">{yourValue}</span>
        </div>

        {/* Competitor */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16 shrink-0 truncate">{competitorName.split(' ')[0]}</span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-muted-foreground/30 rounded-full w-full" />
          </div>
          <span className="text-xs text-muted-foreground w-12 text-right">{competitorValue}</span>
        </div>
      </div>
    </div>
  );
}
