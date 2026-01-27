import { ThumbsUp, ThumbsDown } from "lucide-react";
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
  type = "number",
  showDifference = true,
}: MetricCardProps) {
  const yourNum = typeof yourValue === "string" ? parseFloat(yourValue) : yourValue;
  const compNum = typeof competitorValue === "string" ? parseFloat(competitorValue) : competitorValue;
  const difference = yourNum - compNum;
  const isAhead = difference > 0;
  const isBehind = difference < 0;
  
  const maxValue = type === "percentage" ? 100 : Math.max(yourNum, compNum);
  const yourWidth = maxValue > 0 ? (yourNum / maxValue) * 100 : 0;
  const compWidth = maxValue > 0 ? (compNum / maxValue) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium text-muted-foreground">{title}</h4>
        {showDifference && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-[10px] font-medium",
              isAhead && "text-[hsl(var(--rating-positive))]",
              isBehind && "text-[hsl(var(--rating-negative))]",
              !isAhead && !isBehind && "text-muted-foreground"
            )}
          >
            {isAhead ? (
              <>
                <ThumbsUp className="h-2.5 w-2.5" />
                +{Math.abs(difference)}{type === "percentage" ? "%" : ""}
              </>
            ) : isBehind ? (
              <>
                <ThumbsDown className="h-2.5 w-2.5" />
                -{Math.abs(difference)}{type === "percentage" ? "%" : ""}
              </>
            ) : (
              "="
            )}
          </span>
        )}
      </div>
      
      {/* Bars */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isAhead ? "bg-[hsl(var(--rating-positive))]" : isBehind ? "bg-[hsl(var(--rating-negative))]" : "bg-primary"
              )}
              style={{ width: `${yourWidth}%` }}
            />
          </div>
          <span className="text-xs font-bold text-foreground w-12 text-right">{yourValue}{type === "percentage" ? "%" : ""}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-muted-foreground/40 transition-all duration-500"
              style={{ width: `${compWidth}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-12 text-right">{competitorValue}{type === "percentage" ? "%" : ""}</span>
        </div>
      </div>
    </div>
  );
}
