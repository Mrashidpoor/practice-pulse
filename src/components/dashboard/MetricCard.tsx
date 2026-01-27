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

// Circular progress component
const CircularProgress = ({ 
  percentage, 
  size = 64, 
  strokeWidth = 6,
  color = "primary"
}: { 
  percentage: number; 
  size?: number; 
  strokeWidth?: number;
  color?: "primary" | "positive" | "negative";
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  const colorClass = {
    primary: "text-primary",
    positive: "text-[hsl(var(--rating-positive))]",
    negative: "text-[hsl(var(--rating-negative))]",
  }[color];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("fill-none transition-all duration-500", colorClass)}
          style={{ stroke: "currentColor" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-foreground">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export function MetricCard({
  title,
  yourValue,
  competitorValue,
  competitorName = "Competitor",
  type = "number",
  showDifference = true,
}: MetricCardProps) {
  const yourNum = typeof yourValue === "string" ? parseFloat(yourValue) : yourValue;
  const compNum = typeof competitorValue === "string" ? parseFloat(competitorValue) : competitorValue;
  const difference = yourNum - compNum;
  const isAhead = difference > 0;
  const isBehind = difference < 0;
  
  // Calculate percentage for circular progress (your value as % of competitor)
  const percentage = compNum > 0 ? (yourNum / compNum) * 100 : 100;
  const color = isAhead ? "positive" : isBehind ? "negative" : "primary";

  return (
    <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
      <CircularProgress percentage={percentage} size={56} strokeWidth={5} color={color} />
      
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-medium text-muted-foreground mb-1 truncate">{title}</h4>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">{yourValue}</span>
          <span className="text-xs text-muted-foreground">vs {competitorValue}</span>
        </div>
        
        {showDifference && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium mt-0.5",
              isAhead && "text-[hsl(var(--rating-positive))]",
              isBehind && "text-[hsl(var(--rating-negative))]",
              !isAhead && !isBehind && "text-muted-foreground"
            )}
          >
            {isAhead ? (
              <>
                <ThumbsUp className="h-3 w-3" />
                +{Math.abs(difference)}{type === "percentage" ? "%" : ""} ahead
              </>
            ) : isBehind ? (
              <>
                <ThumbsDown className="h-3 w-3" />
                {Math.abs(difference)}{type === "percentage" ? "%" : ""} behind
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
