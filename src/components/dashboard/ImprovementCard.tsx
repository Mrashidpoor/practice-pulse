import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb, Star, ShieldAlert, Receipt, Heart, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { CompetitorAdvantage } from "@/types/review-analytics";
import { cn } from "@/lib/utils";

interface ImprovementCardProps {
  advantage: CompetitorAdvantage;
  rank: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "shield-alert": ShieldAlert,
  "receipt": Receipt,
  "heart": Heart,
  "clock": Clock,
  "user-check": User,
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={cn(
          "h-3.5 w-3.5",
          star <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
        )}
      />
    ))}
  </div>
);

export function ImprovementCard({ advantage, rank }: ImprovementCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = iconMap[advantage.icon] || ShieldAlert;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-improvement/30 bg-card overflow-hidden transition-all hover:shadow-md">
        <CollapsibleTrigger asChild>
          <button className="w-full text-left">
            <div className="p-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-improvement/10">
                <Icon className="h-5 w-5 text-improvement" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">{advantage.category}</h3>
                  <Badge className="bg-improvement/20 text-improvement-foreground hover:bg-improvement/30 text-xs shrink-0">
                    Improve
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{advantage.insight}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-xs font-bold text-improvement bg-improvement/10 px-2 py-1 rounded-full">
                  #{rank}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 pb-4 px-4 space-y-4">
            {/* Two-column comparison */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Patient's Experience (Left - Orange) */}
              <div className="border-l-4 border-orange-400 bg-orange-50 dark:bg-orange-950/20 rounded-r-lg p-4">
                <h4 className="text-sm font-semibold text-orange-700 dark:text-orange-400 mb-2">
                  Patient's Experience
                </h4>
                <blockquote className="text-sm italic text-muted-foreground mb-3">
                  "{advantage.userComplaint.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <StarRating rating={advantage.userComplaint.rating} />
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">{advantage.userComplaint.reviewerName}</span>
                    <span className="mx-1">•</span>
                    <span>{advantage.userComplaint.reviewDate}</span>
                  </div>
                </div>
              </div>

              {/* Competitor's Approach (Right - Green) */}
              <div className="border-l-4 border-strength bg-strength/5 rounded-r-lg p-4">
                <h4 className="text-sm font-semibold text-strength mb-2">
                  How {advantage.competitorQuote.competitorName} Does It
                </h4>
                <blockquote className="text-sm italic text-muted-foreground mb-3">
                  "{advantage.competitorQuote.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <StarRating rating={5} />
                  <div className="text-xs text-muted-foreground">
                    <span>{advantage.competitorQuote.reviewDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-muted/50 rounded-lg p-4 flex gap-3">
              <Lightbulb className="h-5 w-5 text-improvement shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">Recommendation</h4>
                <p className="text-sm text-muted-foreground">{advantage.competitorQuote.recommendation}</p>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
