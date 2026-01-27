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
    <div>
      {/* Header Card - clean white, no color coding */}
      <Card className="bg-card border-border rounded-b-none border-b-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <AlertTriangle className="h-5 w-5 text-primary" />
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
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {data.competitorAdvantages.length} areas
              </span>
            </div>
          </div>
          
          {/* Category pills with color hints */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            {topCategories.map((advantage, index) => {
              const Icon = iconMap[advantage.icon] || AlertTriangle;
              const isImportant = index === 0;
              const needsImprovement = index > 0 && index < 3;
              return (
                <button
                  key={advantage.category}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                    isImportant 
                      ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800" 
                      : needsImprovement
                        ? "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
                        : "bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{advantage.category}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Improvement Cards - with priority colors */}
      <div className="border border-t-0 border-border rounded-b-lg bg-card p-3 space-y-2">
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
