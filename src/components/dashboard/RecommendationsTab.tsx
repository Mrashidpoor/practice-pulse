import { useState } from "react";
import { 
  Calendar, ChevronDown, Clock, Target, Users, Megaphone, Video, Heart, 
  TrendingUp, Zap, CheckCircle, ArrowRight, Sparkles, DollarSign, Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { MarketingRecommendation, SeasonalTip } from "@/types/review-analytics";

interface RecommendationsTabProps {
  recommendations: MarketingRecommendation[];
  seasonalTips?: SeasonalTip[];
}

const priorityConfig = {
  high: {
    badge: "bg-[hsl(var(--rating-negative))]/15 text-[hsl(var(--rating-negative))] border-[hsl(var(--rating-negative))]/30",
    icon: "text-[hsl(var(--rating-negative))]",
    iconBg: "bg-[hsl(var(--rating-negative))]/10",
    label: "HIGH PRIORITY",
    impactScore: 95,
    bar: "bg-[hsl(var(--rating-negative))]",
    marketingBoost: "25-40%",
    newPatients: "15-25",
    reachMultiplier: "3x",
  },
  medium: {
    badge: "bg-[hsl(var(--rating-neutral))]/15 text-[hsl(var(--rating-neutral))] border-[hsl(var(--rating-neutral))]/30",
    icon: "text-[hsl(var(--rating-neutral))]",
    iconBg: "bg-[hsl(var(--rating-neutral))]/10",
    label: "MEDIUM",
    impactScore: 70,
    bar: "bg-[hsl(var(--rating-neutral))]",
    marketingBoost: "15-25%",
    newPatients: "8-15",
    reachMultiplier: "2x",
  },
  low: {
    badge: "bg-muted text-muted-foreground border-border",
    icon: "text-muted-foreground",
    iconBg: "bg-muted",
    label: "CONSIDER",
    impactScore: 45,
    bar: "bg-muted-foreground/40",
    marketingBoost: "5-15%",
    newPatients: "3-8",
    reachMultiplier: "1.5x",
  },
};

const timeframeConfig = {
  "short-term": { label: "1-3 months", color: "text-[hsl(var(--rating-positive))] bg-[hsl(var(--rating-positive))]/10" },
  "medium-term": { label: "3-6 months", color: "text-primary bg-primary/10" },
  "long-term": { label: "6-12 months", color: "text-muted-foreground bg-muted" },
};

type Range = { min: number; max: number };

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

// Deterministic (no randomness) small variation per recommendation so cards don't all show identical ranges.
function hashString(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

function applyJitter(range: Range, jitterPct: number): Range {
  const min = range.min * (1 + jitterPct);
  const max = range.max * (1 + jitterPct);
  return { min: Math.min(min, max), max: Math.max(min, max) };
}

function formatRange(range: Range, suffix = "") {
  return `${Math.round(range.min)}-${Math.round(range.max)}${suffix}`;
}

function estimateRecommendationProjection(rec: MarketingRecommendation) {
  const base = {
    high: { perf: { min: 25, max: 40 }, patients: { min: 15, max: 25 }, reach: 3 },
    medium: { perf: { min: 15, max: 25 }, patients: { min: 8, max: 15 }, reach: 2 },
    low: { perf: { min: 5, max: 15 }, patients: { min: 3, max: 8 }, reach: 1.5 },
  }[rec.priority];

  const timeframeMultiplier = {
    "short-term": 1.0,
    "medium-term": 0.9,
    "long-term": 0.8,
  }[rec.timeframe];

  const jitterSeed = hashString(`${rec.title}|${rec.impact}|${rec.audience}`) % 21; // 0..20
  const jitterPct = (jitterSeed - 10) / 100; // -0.10 .. +0.10

  const perf = applyJitter(
    { min: base.perf.min * timeframeMultiplier, max: base.perf.max * timeframeMultiplier },
    jitterPct,
  );
  const patients = applyJitter(
    { min: base.patients.min * timeframeMultiplier, max: base.patients.max * timeframeMultiplier },
    jitterPct,
  );

  const reach = clamp(base.reach * (1 + jitterPct / 2), 1.2, 3.5);
  const reachLabel = `${reach.toFixed(1).replace(/\.0$/, "")}x`;

  return {
    performanceLabel: `+${formatRange(perf, "%")}`,
    newPatientsLabel: formatRange(patients),
    reachLabel,
  };
}

function getRecommendationIcon(title: string) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("review")) return Megaphone;
  if (titleLower.includes("video") || titleLower.includes("trust")) return Video;
  if (titleLower.includes("anxiety") || titleLower.includes("comfort")) return Heart;
  if (titleLower.includes("price") || titleLower.includes("billing")) return DollarSign;
  return TrendingUp;
}

interface RecommendationCardProps {
  recommendation: MarketingRecommendation;
}

function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = priorityConfig[recommendation.priority];
  const timeframe = timeframeConfig[recommendation.timeframe];
  const Icon = getRecommendationIcon(recommendation.title);
  const projection = estimateRecommendationProjection(recommendation);
  
  const actionSteps = recommendation.description.split('. ').filter(s => s.length > 0);

  return (
    <Card 
      className="relative overflow-hidden transition-all duration-200 cursor-pointer hover:bg-muted/30 border-border"
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
          {recommendation.priority === "high" && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--rating-negative))] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[hsl(var(--rating-negative))]" />
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="font-semibold text-sm text-foreground">{recommendation.title}</h4>
            <Badge className={cn("text-[10px] font-semibold uppercase px-1.5 py-0 border", config.badge)}>
              {config.label}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3 text-xs">
            <Badge variant="outline" className={cn("font-medium px-1.5 py-0 border-0 text-[10px]", timeframe.color)}>
              <Clock className="h-2.5 w-2.5 mr-1" />
              {timeframe.label}
            </Badge>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Target className="h-3 w-3 text-primary shrink-0" />
              <span>{recommendation.impact}</span>
            </span>
          </div>
        </div>

        {/* Impact metrics */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="flex flex-col items-center px-2 border-r border-border">
            <div className="text-sm font-bold text-[hsl(var(--rating-positive))]">{projection.performanceLabel}</div>
            <div className="text-[8px] text-muted-foreground uppercase tracking-wider">Performance</div>
          </div>
          <div className="flex flex-col items-center px-2 border-r border-border">
            <div className="text-sm font-bold text-primary">{projection.newPatientsLabel}</div>
            <div className="text-[8px] text-muted-foreground uppercase tracking-wider">New Patients</div>
          </div>
          <div className="flex flex-col items-center px-2">
            <div className="text-sm font-bold text-foreground">{projection.reachLabel}</div>
            <div className="text-[8px] text-muted-foreground uppercase tracking-wider">Reach</div>
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
              {/* Action steps */}
              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  Action Steps
                </h5>
                <div className="space-y-1.5">
                  {actionSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{step.trim()}.</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact & Audience */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card rounded-lg p-3 border border-border">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    <Sparkles className="h-3 w-3 text-primary" />
                    Expected Impact
                  </div>
                  <p className="text-xs text-foreground">{recommendation.impact}</p>
                </div>
                <div className="bg-card rounded-lg p-3 border border-border">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    <Users className="h-3 w-3 text-primary" />
                    Target Audience
                  </div>
                  <p className="text-xs text-foreground">{recommendation.audience}</p>
                </div>
              </div>

              {/* CTA */}
              <button 
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Start Implementation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SeasonalTipCard({ tip, index }: { tip: SeasonalTip; index: number }) {
  const monthIcons: Record<string, typeof Calendar> = {
    January: Sparkles,
    February: Heart,
  };
  const Icon = monthIcons[tip.month] || Calendar;

  return (
    <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg hover:bg-muted/30 transition-colors">
      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-foreground mb-0.5">{tip.month}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{tip.tip}</p>
      </div>
    </div>
  );
}

export function RecommendationsTab({ recommendations, seasonalTips }: RecommendationsTabProps) {
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-3">

      {/* Recommendations list */}
      <div className="space-y-3">
        {sortedRecommendations.map((rec, index) => (
          <RecommendationCard 
            key={index} 
            recommendation={rec}
          />
        ))}
      </div>

      {/* Seasonal Tips */}
      {seasonalTips && seasonalTips.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Seasonal Opportunities
          </h3>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
            {seasonalTips.map((tip, index) => (
              <SeasonalTipCard key={tip.month} tip={tip} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
