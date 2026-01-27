import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb, Star, ShieldAlert, Receipt, Heart, Clock, User, Sparkles } from "lucide-react";
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

// Priority tag based on rank
const getPriorityTag = (rank: number): { label: string; className: string } => {
  if (rank === 1) {
    return {
      label: "Important",
      className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0",
    };
  } else if (rank <= 3) {
    return {
      label: "Needs Improvement",
      className: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-0",
    };
  } else {
    return {
      label: "Consider",
      className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-0",
    };
  }
};

const StarRating = ({ rating, color = "orange" }: { rating: number; color?: "orange" | "green" }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={cn(
          "h-3.5 w-3.5",
          star <= rating 
            ? color === "green" 
              ? "fill-[hsl(var(--rating-positive))] text-[hsl(var(--rating-positive))]"
              : "fill-[hsl(var(--rating-neutral))] text-[hsl(var(--rating-neutral))]"
            : "text-border"
        )}
      />
    ))}
  </div>
);

export function ImprovementCard({ advantage, rank }: ImprovementCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = iconMap[advantage.icon] || ShieldAlert;
  const priorityTag = getPriorityTag(rank);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
        <CollapsibleTrigger asChild>
          <button className="w-full text-left">
            <div className="p-5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-muted">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <h3 className="font-semibold text-foreground">{advantage.category}</h3>
                  <Badge className={cn("text-xs shrink-0", priorityTag.className)}>
                    {priorityTag.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{advantage.insight}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-sm font-bold text-primary">#{rank}</span>
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
          <CardContent className="pt-0 pb-5 px-5 space-y-4">
            {/* Two-column comparison */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Patient's Experience (Left - Amber/Orange accent) */}
              <Card className="border-l-4 border-l-amber-400 bg-muted/30 border-t-0 border-r-0 border-b-0">
                <CardContent className="p-4">
                  <h4 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-3">
                    Patient's Experience
                  </h4>
                  <blockquote className="text-sm text-muted-foreground mb-3 leading-relaxed">
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
                </CardContent>
              </Card>

              {/* Competitor's Approach (Right - Green accent) */}
              <Card className="border-l-4 border-l-[hsl(var(--rating-positive))] bg-muted/30 border-t-0 border-r-0 border-b-0">
                <CardContent className="p-4">
                  <h4 className="text-sm font-semibold text-[hsl(var(--rating-positive))] mb-3">
                    How {advantage.competitorQuote.competitorName} Does It
                  </h4>
                  <blockquote className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    "{advantage.competitorQuote.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <StarRating rating={5} color="green" />
                    <div className="text-xs text-muted-foreground">
                      <span>{advantage.competitorQuote.reviewDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendation - Shiny card with gradient */}
            <Card className="relative overflow-hidden border-primary/30 shadow-md bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse" />
              <CardContent className="p-4 flex gap-3 relative">
                <div className="p-2 rounded-lg bg-primary/15 shrink-0">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-1.5">
                    Recommendation
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  </h4>
                  <p className="text-sm text-muted-foreground">{advantage.competitorQuote.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
