import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Quote, Star, Heart, Sparkles, Clock, HandHeart, DollarSign, Microscope, Baby, Siren, MapPin, MessageCircle, Award, Users, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { ClinicStrength } from "@/types/review-analytics";
import { cn } from "@/lib/utils";

interface StrengthCardProps {
  strength: ClinicStrength;
}

// Map strength categories to relevant Lucide icons and their colors
function getCategoryIcon(category: string): { icon: React.ComponentType<{ className?: string }>, color: string } {
  const cat = category.toLowerCase();
  if (cat.includes("chairside") || cat.includes("manner") || cat.includes("bedside")) return { icon: Heart, color: "text-red-500" };
  if (cat.includes("quality") || cat.includes("dental work") || cat.includes("procedure")) return { icon: Stethoscope, color: "text-blue-500" };
  if (cat.includes("friendly") || cat.includes("staff") || cat.includes("team")) return { icon: Users, color: "text-amber-500" };
  if (cat.includes("clean") || cat.includes("hygiene") || cat.includes("sanit")) return { icon: Sparkles, color: "text-cyan-500" };
  if (cat.includes("wait") || cat.includes("time") || cat.includes("punctual")) return { icon: Clock, color: "text-purple-500" };
  if (cat.includes("pain") || cat.includes("comfort") || cat.includes("gentle")) return { icon: HandHeart, color: "text-pink-500" };
  if (cat.includes("price") || cat.includes("billing") || cat.includes("afford")) return { icon: DollarSign, color: "text-emerald-500" };
  if (cat.includes("technology") || cat.includes("modern") || cat.includes("equipment")) return { icon: Microscope, color: "text-indigo-500" };
  if (cat.includes("child") || cat.includes("kid") || cat.includes("pediatric")) return { icon: Baby, color: "text-orange-500" };
  if (cat.includes("emergency") || cat.includes("urgent")) return { icon: Siren, color: "text-red-600" };
  if (cat.includes("location") || cat.includes("parking") || cat.includes("access")) return { icon: MapPin, color: "text-teal-500" };
  if (cat.includes("communication") || cat.includes("explain")) return { icon: MessageCircle, color: "text-sky-500" };
  return { icon: Award, color: "text-amber-500" };
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={cn(
          "h-3.5 w-3.5",
          star <= rating 
            ? "fill-[hsl(var(--rating-neutral))] text-[hsl(var(--rating-neutral))]"
            : "text-border"
        )}
      />
    ))}
  </div>
);

// Helper to calculate time ago
const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 1) return "today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return "1 week ago";
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 60) return "1 month ago";
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  if (diffInDays < 730) return "1 year ago";
  return `${Math.floor(diffInDays / 365)} years ago`;
};

export function StrengthCard({ strength }: StrengthCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const { icon: CategoryIcon, color: iconColor } = getCategoryIcon(strength.category);
  const feedback = strength.patientFeedback[currentQuoteIndex];
  const hasMultipleQuotes = strength.patientFeedback.length > 1;

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => 
      prev === strength.patientFeedback.length - 1 ? 0 : prev + 1
    );
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => 
      prev === 0 ? strength.patientFeedback.length - 1 : prev - 1
    );
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="bg-card border-border shadow-sm border-l-4 border-l-[hsl(var(--rating-positive))] hover:shadow-md transition-shadow">
        <CollapsibleTrigger asChild>
          <button className="w-full text-left">
            <div className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[hsl(var(--rating-positive))]/10 shrink-0">
                <CategoryIcon className={cn("h-5 w-5", iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground">
                  {strength.category}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{strength.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-[hsl(var(--rating-positive))] font-medium bg-[hsl(var(--rating-positive))]/10 px-2 py-0.5 rounded-full">
                  {strength.patientFeedback.length} reviews
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
          <CardContent className="pt-0 pb-4 px-4">
            {/* Patient Feedback - green left border */}
            <div className="border-l-4 border-l-[hsl(var(--rating-positive))] bg-[hsl(var(--rating-positive))]/5 rounded-r-lg p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Quote className="h-3.5 w-3.5 text-[hsl(var(--rating-positive))]" />
                <span className="text-xs font-semibold text-[hsl(var(--rating-positive))]">What patients say</span>
              </div>

              <blockquote className="text-xs text-muted-foreground mb-3 leading-relaxed">
                "{feedback.quote}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarRating rating={feedback.stars} />
                  <span className="text-xs text-muted-foreground">
                    <span className="font-medium">{feedback.reviewer}</span>
                    <span className="mx-1">•</span>
                    <span>{getTimeAgo(feedback.date)}</span>
                  </span>
                </div>
                
                {hasMultipleQuotes && (
                  <div className="flex items-center gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => { e.stopPropagation(); prevQuote(); }}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                    <span className="text-xs text-muted-foreground min-w-[24px] text-center">
                      {currentQuoteIndex + 1}/{strength.patientFeedback.length}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => { e.stopPropagation(); nextQuote(); }}
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
