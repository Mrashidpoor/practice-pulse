import { ImprovementCard } from "./ImprovementCard";
import type { CompetitiveComparison } from "@/types/review-analytics";

interface AreasForImprovementProps {
  data: CompetitiveComparison;
}

export function AreasForImprovement({ data }: AreasForImprovementProps) {
  const importantCount = 1; // First item is always "Important"
  const needsImprovementCount = Math.min(data.competitorAdvantages.length - 1, 2);

  return (
    <div className="space-y-3">
      {/* Improvement Cards */}
      {data.competitorAdvantages.map((advantage, index) => (
        <ImprovementCard
          key={advantage.category}
          advantage={advantage}
          rank={index + 1}
        />
      ))}
    </div>
  );
}
