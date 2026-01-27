import { cn } from "@/lib/utils";

// Sentiment breakdown component showing positive/negative split
const SentimentBreakdown = ({ 
  positive, 
  total 
}: { 
  positive: number; 
  total: number; 
}) => {
  const negative = total - positive;
  const positivePercent = total > 0 ? Math.round((positive / total) * 100) : 0;
  const negativePercent = 100 - positivePercent;

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium text-muted-foreground">Sentiment (12 Mo)</h4>
      
      {/* Stacked bar */}
      <div className="flex h-2.5 rounded-full overflow-hidden">
        <div 
          className="bg-[hsl(var(--rating-positive))] transition-all duration-500"
          style={{ width: `${positivePercent}%` }}
        />
        <div 
          className="bg-[hsl(var(--rating-negative))] transition-all duration-500"
          style={{ width: `${negativePercent}%` }}
        />
      </div>
      
      {/* Labels */}
      <div className="flex justify-between text-[10px]">
        <span className="text-[hsl(var(--rating-positive))] font-medium">
          {positivePercent}% positive ({positive})
        </span>
        <span className="text-[hsl(var(--rating-negative))] font-medium">
          {negativePercent}% ({negative})
        </span>
      </div>
    </div>
  );
};

export { SentimentBreakdown };
