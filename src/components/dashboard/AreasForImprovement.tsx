import { XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ImprovementCard } from "./ImprovementCard";
import type { CompetitiveComparison } from "@/types/review-analytics";

interface AreasForImprovementProps {
  data: CompetitiveComparison;
}

export function AreasForImprovement({ data }: AreasForImprovementProps) {
  const topCategories = data.competitorAdvantages.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[hsl(var(--rating-negative))]/10">
              <XCircle className="h-6 w-6 text-[hsl(var(--rating-negative))]" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Common Weaknesses
              </h2>
              <p className="text-muted-foreground mb-4">
                Improvements in these areas are recommended based on patient reviews
              </p>
              
              {/* Quick-Access Chips */}
              <div className="flex flex-wrap gap-2">
                {topCategories.map((advantage, index) => (
                  <Badge
                    key={advantage.category}
                    variant="outline"
                    className="bg-muted hover:bg-muted/80 cursor-pointer transition-colors border-border text-foreground px-3 py-1.5"
                  >
                    <XCircle className="h-3.5 w-3.5 mr-1.5 text-[hsl(var(--rating-negative))]" />
                    {advantage.category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
