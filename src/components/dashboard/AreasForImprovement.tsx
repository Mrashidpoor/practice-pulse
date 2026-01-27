import { AlertCircle, ShieldAlert, Receipt, Heart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-foreground mb-1">
                Areas for Improvement
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                These insights are based on patient reviews and competitor analysis
              </p>
              
              {/* Quick-Access Chips */}
              <div className="flex flex-wrap gap-1.5">
                {topCategories.map((advantage) => {
                  const Icon = iconMap[advantage.icon] || AlertCircle;
                  return (
                    <Badge
                      key={advantage.category}
                      variant="outline"
                      className="bg-background hover:bg-muted cursor-pointer transition-colors border-border text-foreground text-xs px-2.5 py-1"
                    >
                      <Icon className="h-3 w-3 mr-1 text-amber-600 dark:text-amber-400" />
                      {advantage.category}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Cards - tighter spacing */}
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
