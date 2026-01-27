import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ImprovementCard } from "./ImprovementCard";
import type { CompetitiveComparison } from "@/types/review-analytics";

interface AreasForImprovementProps {
  data: CompetitiveComparison;
}

// Emoji mapping for categories
const categoryEmojis: Record<string, string> = {
  "Overtreatment Concerns / Trust": "🛡️",
  "Billing & Insurance Transparency": "💳",
  "Dentist Anxiety & Emotional Comfort": "💆",
  "Wait Times & Scheduling": "⏰",
};

export function AreasForImprovement({ data }: AreasForImprovementProps) {
  const topCategories = data.competitorAdvantages.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                📊 Areas for Improvement
              </h2>
              <p className="text-muted-foreground mb-4">
                These insights are based on patient reviews and competitor analysis
              </p>
              
              {/* Quick-Access Chips */}
              <div className="flex flex-wrap gap-2">
                {topCategories.map((advantage) => {
                  const emoji = categoryEmojis[advantage.category] || "📌";
                  return (
                    <Badge
                      key={advantage.category}
                      variant="outline"
                      className="bg-muted hover:bg-muted/80 cursor-pointer transition-colors border-border text-foreground px-3 py-1.5"
                    >
                      <span className="mr-1.5">{emoji}</span>
                      {advantage.category}
                    </Badge>
                  );
                })}
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
