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

// Priority styling based on rank
const getPriorityStyles = (rank: number): { 
  label: string; 
  badgeClass: string; 
  cardClass: string;
  iconBgClass: string;
  negativeCardClass: string;
  negativeTextClass: string;
  negativeBorderClass: string;
} => {
  if (rank === 1) {
    return {
      label: "Important",
      badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0",
      cardClass: "border-l-4 border-l-red-400 bg-red-50/60 dark:bg-red-950/30",
      iconBgClass: "bg-red-100 dark:bg-red-900/30",
      negativeCardClass: "bg-red-50/80 dark:bg-red-950/40",
      negativeTextClass: "text-red-700 dark:text-red-400",
      negativeBorderClass: "border-l-red-400",
    };
  } else if (rank <= 3) {
    return {
      label: "Needs Improvement",
      badgeClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0",
      cardClass: "border-l-4 border-l-amber-300 bg-amber-50/40 dark:bg-amber-950/20",
      iconBgClass: "bg-amber-100 dark:bg-amber-900/30",
      negativeCardClass: "bg-amber-50/80 dark:bg-amber-950/40",
      negativeTextClass: "text-amber-700 dark:text-amber-400",
      negativeBorderClass: "border-l-amber-400",
    };
  } else {
    return {
      label: "Consider",
      badgeClass: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-0",
      cardClass: "border-l-4 border-l-slate-300 bg-slate-100/50 dark:bg-slate-800/30",
      iconBgClass: "bg-slate-100 dark:bg-slate-800",
      negativeCardClass: "bg-slate-100/80 dark:bg-slate-800/40",
      negativeTextClass: "text-slate-600 dark:text-slate-400",
      negativeBorderClass: "border-l-slate-400",
    };
  }
};

// Helper to calculate time ago
const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
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
  const priorityStyles = getPriorityStyles(rank);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={cn("border-border shadow-sm hover:shadow-md transition-shadow", priorityStyles.cardClass)}>
        <CollapsibleTrigger asChild>
          <button className="w-full text-left">
            <div className="p-4 flex items-center gap-3">
              <div className={cn("p-2 rounded-lg shrink-0", priorityStyles.iconBgClass)}>
                <Icon className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm text-foreground">{advantage.category}</h3>
                  <Badge className={cn("text-xs shrink-0", priorityStyles.badgeClass)}>
                    {priorityStyles.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{advantage.insight}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
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
          <CardContent className="pt-0 pb-4 px-4 space-y-3">
            {/* Two-column comparison */}
            <div className="grid md:grid-cols-2 gap-3">
              {/* Patient's Experience - color matches priority */}
              <Card className={cn("border-l-4 border-t-0 border-r-0 border-b-0", priorityStyles.negativeBorderClass, priorityStyles.negativeCardClass)}>
                <CardContent className="p-3">
                  <h4 className={cn("text-xs font-semibold mb-2", priorityStyles.negativeTextClass)}>
                    Patient's Experience
                  </h4>
                  <blockquote className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    "{advantage.userComplaint.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <StarRating rating={advantage.userComplaint.rating} />
                    <div className="text-xs text-muted-foreground text-right">
                      <span className="font-medium">{advantage.userComplaint.reviewerName}</span>
                      <span className="mx-1">•</span>
                      <span>{getTimeAgo(advantage.userComplaint.reviewDate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Competitor's Approach */}
              <Card className="border-l-4 border-l-[hsl(var(--rating-positive))] bg-[hsl(var(--rating-positive))]/5 dark:bg-[hsl(var(--rating-positive))]/10 border-t-0 border-r-0 border-b-0">
                <CardContent className="p-3">
                  <h4 className="text-xs font-semibold text-[hsl(var(--rating-positive))] mb-2">
                    How {advantage.competitorQuote.competitorName} Does It
                  </h4>
                  <blockquote className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    "{advantage.competitorQuote.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <StarRating rating={5} color="green" />
                    <div className="text-xs text-muted-foreground">
                      <span>{getTimeAgo(advantage.competitorQuote.reviewDate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendation - Shiny card */}
            <Card className="relative overflow-hidden border-primary/40 shadow-md bg-gradient-to-br from-primary/10 via-primary/15 to-primary/10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
              <CardContent className="p-3 flex gap-2.5 relative">
                <div className="p-1.5 rounded-md bg-primary/20 shrink-0">
                  <Lightbulb className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground mb-0.5 flex items-center gap-1">
                    Recommendation
                    <Sparkles className="h-3 w-3 text-primary" />
                  </h4>
                  <p className="text-xs text-muted-foreground">{advantage.competitorQuote.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
