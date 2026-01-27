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

// Mini donut chart
const MiniDonut = ({ 
  value, 
  maxValue,
  color,
  size = 32
}: { 
  value: number; 
  maxValue: number;
  color: "you" | "competitor";
  size?: number;
}) => {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  const strokeColor = color === "you" 
    ? "stroke-primary" 
    : "stroke-muted-foreground/50";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("fill-none transition-all duration-500", strokeColor)}
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
  
  // For percentage type, max is 100; for numbers, max is the larger value
  const maxValue = type === "percentage" ? 100 : Math.max(yourNum, compNum);

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <h4 className="text-xs font-medium text-muted-foreground">{title}</h4>
      
      {/* Dual pie charts */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <MiniDonut value={yourNum} maxValue={maxValue} color="you" size={36} />
          <span className="text-[10px] text-muted-foreground">You</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <MiniDonut value={compNum} maxValue={maxValue} color="competitor" size={36} />
          <span className="text-[10px] text-muted-foreground">Comp</span>
        </div>
      </div>
      
      {/* Values */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-bold text-foreground">{yourValue}{type === "percentage" ? "%" : ""}</span>
        <span className="text-[10px] text-muted-foreground">vs {competitorValue}{type === "percentage" ? "%" : ""}</span>
      </div>
      
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
            "Tied"
          )}
        </span>
      )}
    </div>
  );
}
