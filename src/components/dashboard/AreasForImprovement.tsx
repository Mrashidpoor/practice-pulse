import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImprovementCard } from "./ImprovementCard";
import type { CompetitiveComparison } from "@/types/review-analytics";

interface AreasForImprovementProps {
  data: CompetitiveComparison;
}

export function AreasForImprovement({ data }: AreasForImprovementProps) {
  const topCategories = data.competitorAdvantages.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-muted-foreground">
          These are areas where competitors are outperforming your practice based on patient reviews
        </p>
      </div>

      {/* Focus Banner */}
      <div className="bg-gradient-to-r from-improvement/20 to-improvement/10 border border-improvement/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-improvement" />
          <h3 className="font-semibold text-foreground">
            Focus on these {topCategories.length} areas to improve your competitive position
          </h3>
        </div>
        
        {/* Quick-Access Chips */}
        <div className="flex flex-wrap gap-2">
          {topCategories.map((advantage, index) => (
            <Badge
              key={advantage.category}
              variant="outline"
              className="bg-background hover:bg-improvement/10 cursor-pointer transition-colors border-improvement/40 text-foreground"
            >
              <span className="text-improvement font-bold mr-1">#{index + 1}</span>
              {advantage.category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Improvement Cards */}
      <div className="space-y-4">
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
