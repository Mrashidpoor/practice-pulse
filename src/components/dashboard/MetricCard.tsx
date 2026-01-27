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

// Comparison bar showing You vs Competitor
const ComparisonBar = ({ 
  yourValue, 
  competitorValue,
  isAhead
}: { 
  yourValue: number; 
  competitorValue: number;
  isAhead: boolean;
}) => {
  const maxValue = Math.max(yourValue, competitorValue);
  const yourWidth = maxValue > 0 ? (yourValue / maxValue) * 100 : 0;
  const compWidth = maxValue > 0 ? (competitorValue / maxValue) * 100 : 0;

  return (
    <div className="space-y-1 w-full">
      <div className="flex items-center gap-1.5">
        <span className="text-[9px] text-muted-foreground w-8">You</span>
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-500",
              isAhead ? "bg-[hsl(var(--rating-positive))]" : "bg-[hsl(var(--rating-negative))]"
            )}
            style={{ width: `${yourWidth}%` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[9px] text-muted-foreground w-8">Comp</span>
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full bg-muted-foreground/40 transition-all duration-500"
            style={{ width: `${compWidth}%` }}
          />
        </div>
      </div>
    </div>
  );
};

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

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium text-muted-foreground">{title}</h4>
      
      <ComparisonBar yourValue={yourNum} competitorValue={compNum} isAhead={isAhead} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-base font-bold text-foreground">{yourValue}{type === "percentage" ? "%" : ""}</span>
          <span className="text-xs text-muted-foreground">vs {competitorValue}{type === "percentage" ? "%" : ""}</span>
        </div>
        
        {showDifference && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
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
                {Math.abs(difference)}{type === "percentage" ? "%" : ""}
              </>
            ) : (
              "Tied"
            )}
          </span>
        )}
      </div>
    </div>
  );
}
