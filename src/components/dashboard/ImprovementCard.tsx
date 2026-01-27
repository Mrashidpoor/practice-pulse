import { useState } from "react";
import { ChevronDown, Clock, Target, Lightbulb, Star, ShieldAlert, Receipt, Heart, Clock as ClockIcon, User, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  "clock": ClockIcon,
  "user-check": User,
};

// Priority config matching Recommendations style
const priorityConfig = {
  important: {
    badge: "bg-[hsl(var(--rating-negative))]/15 text-[hsl(var(--rating-negative))] border-[hsl(var(--rating-negative))]/30",
    icon: "text-[hsl(var(--rating-negative))]",
    iconBg: "bg-[hsl(var(--rating-negative))]/10",
    label: "IMPORTANT",
    bar: "bg-[hsl(var(--rating-negative))]",
    cardBg: "bg-[hsl(var(--rating-negative))]/5",
  },
  needsImprovement: {
    badge: "bg-[hsl(var(--rating-neutral))]/15 text-[hsl(var(--rating-neutral))] border-[hsl(var(--rating-neutral))]/30",
    icon: "text-[hsl(var(--rating-neutral))]",
    iconBg: "bg-[hsl(var(--rating-neutral))]/10",
    label: "NEEDS IMPROVEMENT",
    bar: "bg-[hsl(var(--rating-neutral))]",
    cardBg: "bg-[hsl(var(--rating-neutral))]/5",
  },
  consider: {
    badge: "bg-muted text-muted-foreground border-border",
    icon: "text-muted-foreground",
    iconBg: "bg-muted",
    label: "CONSIDER",
    bar: "bg-muted-foreground/40",
    cardBg: "bg-muted/30",
  },
};

const getConfig = (rank: number) => {
  if (rank === 1) return priorityConfig.important;
  if (rank <= 3) return priorityConfig.needsImprovement;
  return priorityConfig.consider;
};

// Estimated improvement projections based on rank
function getImprovementProjection(rank: number, category: string) {
  const base = rank === 1 
    ? { perfMin: 20, perfMax: 35, patientsMin: 12, patientsMax: 20, reach: 2.5 }
    : rank <= 3
      ? { perfMin: 12, perfMax: 22, patientsMin: 6, patientsMax: 12, reach: 1.8 }
      : { perfMin: 5, perfMax: 12, patientsMin: 2, patientsMax: 6, reach: 1.3 };

  // Small deterministic jitter based on category
  const hash = category.split("").reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0);
  const jitter = ((hash % 21) - 10) / 100; // -0.10 to +0.10

  return {
    performance: `+${Math.round(base.perfMin * (1 + jitter))}-${Math.round(base.perfMax * (1 + jitter))}%`,
    patients: `${Math.round(base.patientsMin * (1 + jitter))}-${Math.round(base.patientsMax * (1 + jitter))}`,
    reach: `${(base.reach * (1 + jitter / 2)).toFixed(1).replace(/\.0$/, "")}x`,
  };
}

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
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[advantage.icon] || ShieldAlert;
  const config = getConfig(rank);
  const projection = getImprovementProjection(rank, advantage.category);

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-200 cursor-pointer hover:bg-muted/30 border-border",
        config.cardBg
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Priority indicator bar */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-l-xl", config.bar)} />

      <CardContent className="p-0">
        {/* Main row content */}
        <div className="flex items-center gap-4 p-4 pl-5">
          {/* Icon */}
          <div className={cn("relative p-2.5 rounded-xl shrink-0", config.iconBg)}>
            <Icon className={cn("h-5 w-5", config.icon)} />
            {rank === 1 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--rating-negative))] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[hsl(var(--rating-negative))]" />
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className="font-semibold text-sm text-foreground">{advantage.category}</h4>
              <Badge className={cn("text-[10px] font-semibold uppercase px-1.5 py-0 border", config.badge)}>
                {config.label}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Target className="h-3 w-3 text-primary shrink-0" />
                <span>{advantage.insight}</span>
              </span>
            </div>
          </div>

          {/* Impact metrics */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="flex flex-col items-center px-2 border-r border-border">
              <div className="text-sm font-bold text-[hsl(var(--rating-positive))]">{projection.performance}</div>
              <div className="text-[8px] text-muted-foreground uppercase tracking-wider">If Fixed</div>
            </div>
            <div className="flex flex-col items-center px-2 border-r border-border">
              <div className="text-sm font-bold text-primary">{projection.patients}</div>
              <div className="text-[8px] text-muted-foreground uppercase tracking-wider">Patients/Mo</div>
            </div>
            <div className="flex flex-col items-center px-2">
              <div className="text-sm font-bold text-foreground">{projection.reach}</div>
              <div className="text-[8px] text-muted-foreground uppercase tracking-wider">Trust</div>
            </div>
          </div>

          {/* Chevron */}
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0",
            isExpanded && "rotate-180"
          )} />
        </div>

        {/* Expanded content */}
        <div className={cn(
          "grid transition-all duration-200 ease-out",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}>
          <div className="overflow-hidden">
            <div className="border-t border-border bg-muted/40 p-4 pl-5 space-y-4">
              {/* Two-column comparison */}
              <div className="grid md:grid-cols-2 gap-3">
                {/* Patient's Experience */}
                <div className="border-l-4 border-l-[hsl(var(--rating-negative))] bg-[hsl(var(--rating-negative))]/5 rounded-r-lg p-3">
                  <h5 className="text-xs font-semibold text-[hsl(var(--rating-negative))] mb-2">
                    Patient's Experience
                  </h5>
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
                </div>

                {/* Competitor's Approach */}
                <div className="border-l-4 border-l-[hsl(var(--rating-positive))] bg-[hsl(var(--rating-positive))]/5 rounded-r-lg p-3">
                  <h5 className="text-xs font-semibold text-[hsl(var(--rating-positive))] mb-2">
                    How {advantage.competitorQuote.competitorName} Does It
                  </h5>
                  <blockquote className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    "{advantage.competitorQuote.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <StarRating rating={5} color="green" />
                    <div className="text-xs text-muted-foreground">
                      <span>{getTimeAgo(advantage.competitorQuote.reviewDate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  <Lightbulb className="h-3 w-3 text-primary" />
                  Recommended Action
                </div>
                <p className="text-xs text-foreground">{advantage.competitorQuote.recommendation}</p>
              </div>

              {/* CTA */}
              <button 
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Start Improvement Plan
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
