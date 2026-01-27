import { AlertCircle, ShieldAlert, Receipt, Heart, Clock } from "lucide-react";
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
      {/* Header Section - cleaner inline design */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Areas for Improvement
            </h2>
            <p className="text-sm text-muted-foreground">
              Based on patient reviews and competitor analysis
            </p>
          </div>
        </div>
        
        {/* Quick-Access Chips - horizontal scroll on mobile */}
        <div className="flex flex-wrap gap-2">
          {topCategories.map((advantage) => {
            const Icon = iconMap[advantage.icon] || AlertCircle;
            return (
              <button
                key={advantage.category}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border hover:bg-muted transition-colors text-sm text-foreground shadow-sm"
              >
                <Icon className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span>{advantage.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

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
