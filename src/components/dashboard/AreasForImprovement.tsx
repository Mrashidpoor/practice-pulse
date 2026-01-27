import { AlertTriangle, ShieldAlert, Receipt, Heart, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ImprovementCard } from "./ImprovementCard";
import type { CompetitiveComparison } from "@/types/review-analytics";

interface AreasForImprovementProps {
  data: CompetitiveComparison;
}

// Icon mapping for categories
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "shield-alert": ShieldAlert,
  "receipt": Receipt,
  "heart": Heart,
  "clock": Clock,
};

export function AreasForImprovement({ data }: AreasForImprovementProps) {
  const topCategories = data.competitorAdvantages.slice(0, 4);

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="flex">
          {/* Left accent bar */}
          <div className="w-1 bg-gradient-to-b from-amber-400 to-orange-400 shrink-0" />
          
          <CardContent className="flex-1 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    Areas for Improvement
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Based on patient reviews and competitor analysis
                  </p>
                </div>
              </div>
              
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md shrink-0">
                {data.competitorAdvantages.length} items
              </span>
            </div>
            
            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
              {topCategories.map((advantage) => {
                const Icon = iconMap[advantage.icon] || AlertTriangle;
                return (
                  <div
                    key={advantage.category}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground"
                  >
                    <Icon className="h-3 w-3 text-amber-500" />
                    <span>{advantage.category}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Improvement Cards */}
      <div className="space-y-2">
        {data.competitorAdvantages.map((advantage, index) => (
          <ImprovementCard
            key={advantage.category}
            advantage={advantage}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
