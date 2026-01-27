import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Quote, Star, UserCheck, Smile } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ClinicStrength } from "@/types/review-analytics";
import { cn } from "@/lib/utils";

interface StrengthCardProps {
  strength: ClinicStrength;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "user-check": UserCheck,
  "star": Star,
  "smile": Smile,
};

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

export function StrengthCard({ strength }: StrengthCardProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const Icon = iconMap[strength.icon] || CheckCircle;
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
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[hsl(var(--rating-positive))]/10">
            <CheckCircle className="h-4 w-4 text-[hsl(var(--rating-positive))]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-foreground">{strength.category}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{strength.description}</p>
          </div>
        </div>

        {/* Patient Feedback Callout - green left border */}
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
                <span>{new Date(feedback.date).toLocaleDateString()}</span>
              </span>
            </div>
            
            {hasMultipleQuotes && (
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={prevQuote}
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
                  onClick={nextQuote}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
