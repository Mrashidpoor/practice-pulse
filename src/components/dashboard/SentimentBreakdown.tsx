import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Sentiment breakdown component comparing positive rates
const SentimentBreakdown = ({ 
  positive, 
  total,
  competitorPositive,
  competitorTotal,
}: { 
  positive: number; 
  total: number;
  competitorPositive: number;
  competitorTotal: number;
}) => {
  const positivePercent = total > 0 ? Math.round((positive / total) * 100) : 0;
  const competitorPercent = competitorTotal > 0 ? Math.round((competitorPositive / competitorTotal) * 100) : 0;
  const difference = positivePercent - competitorPercent;
  const isAhead = difference > 0;
  const isBehind = difference < 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium text-muted-foreground">Positive Sentiment</h4>
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
              +{Math.abs(difference)}%
            </>
          ) : isBehind ? (
            <>
              <ThumbsDown className="h-2.5 w-2.5" />
              -{Math.abs(difference)}%
            </>
          ) : (
            "="
          )}
        </span>
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
              style={{ width: `${positivePercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-foreground w-12 text-right">{positivePercent}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-muted-foreground/40 transition-all duration-500"
              style={{ width: `${competitorPercent}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-12 text-right">{competitorPercent}%</span>
        </div>
      </div>
    </div>
  );
};

export { SentimentBreakdown };
