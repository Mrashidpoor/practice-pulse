import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="p-5">
        <h4 className="text-sm font-medium text-muted-foreground mb-4">{title}</h4>

        <div className="space-y-3">
          {/* Your Practice */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Your Practice</span>
              <span className="text-lg font-bold text-foreground">
                {yourValue}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${Math.min(percentageOfCompetitor, 100)}%` }}
              />
            </div>
          </div>

          {/* Competitor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">{competitorName}</span>
              <span className="text-sm font-medium text-muted-foreground">
                {competitorValue}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-muted-foreground/30 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Difference Indicator */}
          {showDifference && (
            <div
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium pt-2",
                isAhead && "text-[hsl(var(--rating-positive))]",
                isBehind && "text-[hsl(var(--rating-negative))]",
                !isAhead && !isBehind && "text-muted-foreground"
              )}
            >
              {isAhead ? (
                <>
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Ahead by {Math.abs(difference)}{type === "percentage" ? "%" : ""}</span>
                </>
              ) : isBehind ? (
                <>
                  <ThumbsDown className="h-3.5 w-3.5" />
                  <span>{Math.abs(difference)}{type === "percentage" ? "%" : ""} to catch up</span>
                </>
              ) : (
                <>
                  <Minus className="h-3.5 w-3.5" />
                  <span>Tied</span>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
