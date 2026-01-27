import { useState } from "react";
import { 
  Calendar, ChevronDown, Clock, Target, Users, Megaphone, Video, Heart, 
  TrendingUp, Zap, CheckCircle, ArrowRight, Sparkles, DollarSign
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MarketingRecommendation, SeasonalTip } from "@/types/review-analytics";

interface RecommendationsTabProps {
  recommendations: MarketingRecommendation[];
  seasonalTips?: SeasonalTip[];
}

const priorityConfig = {
  high: {
    badge: "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-600 border-red-500/30",
    glow: "shadow-red-500/20",
    ring: "ring-red-500/30",
    gradient: "from-red-500/10 via-orange-500/5 to-transparent",
    icon: "text-red-500",
    label: "HIGH PRIORITY",
    impactScore: 95,
  },
  medium: {
    badge: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 border-amber-500/30",
    glow: "shadow-amber-500/20",
    ring: "ring-amber-500/30",
    gradient: "from-amber-500/10 via-yellow-500/5 to-transparent",
    icon: "text-amber-500",
    label: "MEDIUM",
    impactScore: 70,
  },
  low: {
    badge: "bg-muted text-muted-foreground border-border",
    glow: "shadow-muted/20",
    ring: "ring-muted/30",
    gradient: "from-muted/30 via-muted/10 to-transparent",
    icon: "text-muted-foreground",
    label: "CONSIDER",
    impactScore: 45,
  },
};

const timeframeConfig = {
  "short-term": { label: "1-3 months", weeks: "4-12 weeks", color: "text-emerald-600 bg-emerald-500/10" },
  "medium-term": { label: "3-6 months", weeks: "12-24 weeks", color: "text-blue-600 bg-blue-500/10" },
  "long-term": { label: "6-12 months", weeks: "24-48 weeks", color: "text-purple-600 bg-purple-500/10" },
};

function getRecommendationIcon(title: string) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("review")) return Megaphone;
  if (titleLower.includes("video") || titleLower.includes("trust")) return Video;
  if (titleLower.includes("anxiety") || titleLower.includes("comfort")) return Heart;
  if (titleLower.includes("price") || titleLower.includes("billing")) return DollarSign;
  return TrendingUp;
}

function RecommendationCard({ recommendation, index }: { recommendation: MarketingRecommendation; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = priorityConfig[recommendation.priority];
  const timeframe = timeframeConfig[recommendation.timeframe];
  const Icon = getRecommendationIcon(recommendation.title);
  
  const actionSteps = recommendation.description.split('. ').filter(s => s.length > 0);

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-300 cursor-pointer border-2",
        "hover:shadow-lg",
        isExpanded && "ring-2",
        config.ring,
        config.glow
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Priority gradient accent */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r opacity-50",
        config.gradient
      )} />
      
      {/* Priority indicator bar */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1",
        recommendation.priority === "high" && "bg-gradient-to-b from-red-500 to-orange-500",
        recommendation.priority === "medium" && "bg-gradient-to-b from-amber-500 to-yellow-500",
        recommendation.priority === "low" && "bg-muted-foreground/30"
      )} />

      <CardContent className="p-0">
        {/* Main header - always visible */}
        <div className="relative flex items-center gap-4 p-4 pl-5">
          {/* Animated icon container */}
          <div className={cn(
            "relative p-3 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110",
            recommendation.priority === "high" && "bg-gradient-to-br from-red-500/20 to-orange-500/20",
            recommendation.priority === "medium" && "bg-gradient-to-br from-amber-500/20 to-yellow-500/20",
            recommendation.priority === "low" && "bg-muted"
          )}>
            <Icon className={cn("h-5 w-5", config.icon)} />
            {recommendation.priority === "high" && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
            )}
          </div>

          {/* Title and metadata */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className="font-bold text-base text-foreground">{recommendation.title}</h4>
              <Badge className={cn("text-[10px] font-bold uppercase px-2 py-0.5 border", config.badge)}>
                {config.label}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              <Badge variant="outline" className={cn("font-medium px-2 py-0.5 border-0", timeframe.color)}>
                <Clock className="h-3 w-3 mr-1" />
                {timeframe.label}
              </Badge>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Target className="h-3 w-3 text-primary" />
                {recommendation.impact.split(' ').slice(0, 4).join(' ')}...
              </span>
            </div>
          </div>

          {/* Impact score indicator */}
          <div className="hidden sm:flex flex-col items-center gap-1 px-3">
            <div className="text-lg font-bold text-foreground">{config.impactScore}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Impact</div>
          </div>

          {/* Expand indicator */}
          <ChevronDown className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-300 shrink-0",
            isExpanded && "rotate-180"
          )} />
        </div>

        {/* Expanded content */}
        <div className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}>
          <div className="overflow-hidden">
            <div className="border-t border-border bg-muted/30 p-4 pl-5 space-y-4">
              {/* Description with action steps */}
              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  Action Steps
                </h5>
                <div className="space-y-2">
                  {actionSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="p-0.5 rounded-full bg-primary/20 mt-0.5 shrink-0">
                        <CheckCircle className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{step.trim()}.</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact & Audience cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card rounded-lg p-3 border border-border">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                    <Sparkles className="h-3 w-3 text-primary" />
                    Expected Impact
                  </div>
                  <p className="text-sm text-foreground">{recommendation.impact}</p>
                </div>
                <div className="bg-card rounded-lg p-3 border border-border">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                    <Users className="h-3 w-3 text-primary" />
                    Target Audience
                  </div>
                  <p className="text-sm text-foreground">{recommendation.audience}</p>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
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

  const gradients = [
    "from-blue-500/20 via-cyan-500/10 to-transparent",
    "from-pink-500/20 via-rose-500/10 to-transparent",
    "from-emerald-500/20 via-green-500/10 to-transparent",
    "from-purple-500/20 via-violet-500/10 to-transparent",
  ];

  return (
    <Card className="group relative overflow-hidden hover:shadow-md transition-all duration-300 border-border">
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-60",
        gradients[index % gradients.length]
      )} />
      <CardContent className="relative p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border shrink-0">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-foreground mb-1">{tip.month}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{tip.tip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RecommendationsTab({ recommendations, seasonalTips }: RecommendationsTabProps) {
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const highPriorityCount = recommendations.filter(r => r.priority === "high").length;
  const totalImpactScore = sortedRecommendations.reduce((sum, r) => sum + priorityConfig[r.priority].impactScore, 0);

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Marketing Action Plan
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {recommendations.length} strategic recommendations to boost your practice
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{highPriorityCount}</div>
                <div className="text-[10px] text-muted-foreground uppercase">High Priority</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.round(totalImpactScore / recommendations.length)}</div>
                <div className="text-[10px] text-muted-foreground uppercase">Avg Impact</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations list */}
      <div className="space-y-3">
        {sortedRecommendations.map((rec, index) => (
          <RecommendationCard key={index} recommendation={rec} index={index} />
        ))}
      </div>

      {/* Seasonal Tips */}
      {seasonalTips && seasonalTips.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Seasonal Opportunities
          </h3>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {seasonalTips.map((tip, index) => (
              <SeasonalTipCard key={tip.month} tip={tip} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
