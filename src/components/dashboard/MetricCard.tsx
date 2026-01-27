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

// Simple pie chart showing You vs Competitor proportion
const ComparisonPie = ({ 
  yourValue, 
  competitorValue,
  size = 40
}: { 
  yourValue: number; 
  competitorValue: number;
  size?: number;
}) => {
  const total = yourValue + competitorValue;
  const yourPercentage = total > 0 ? (yourValue / total) * 100 : 50;
  const isAhead = yourValue > competitorValue;
  
  // Calculate the stroke-dasharray for pie segments
  const circumference = Math.PI * (size - 4); // radius = (size-4)/2, so diameter = size-4
  const yourDash = (yourPercentage / 100) * circumference;
  const competitorDash = circumference - yourDash;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle (competitor portion) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 4) / 2}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={4}
        />
        {/* Your portion */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 4) / 2}
          fill="none"
          stroke={isAhead ? "hsl(var(--rating-positive))" : "hsl(var(--rating-negative))"}
          strokeWidth={4}
          strokeDasharray={`${yourDash} ${competitorDash}`}
          strokeDashoffset={circumference / 4} // Start from top
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
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
    <div className="flex flex-col items-center gap-1.5 text-center">
      <ComparisonPie yourValue={yourNum} competitorValue={compNum} size={36} />
      
      <div className="space-y-0.5">
        <h4 className="text-[10px] font-medium text-muted-foreground leading-tight">{title}</h4>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-sm font-bold text-foreground">{yourValue}</span>
          <span className="text-[10px] text-muted-foreground">vs {competitorValue}</span>
        </div>
        
        {showDifference && (
          <span
            className={cn(
              "flex items-center justify-center gap-0.5 text-[10px] font-medium",
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
              "Tied"
            )}
          </span>
        )}
      </div>
    </div>
  );
}
