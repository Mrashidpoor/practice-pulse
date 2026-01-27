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
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-[hsl(var(--rating-positive))]/10">
            <CheckCircle className="h-5 w-5 text-[hsl(var(--rating-positive))]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">{strength.category}</h3>
            <p className="text-sm text-muted-foreground">{strength.description}</p>
          </div>
        </div>

        {/* Patient Feedback Callout */}
        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Quote className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">What patients say</span>
          </div>

          <div className="relative">
            <blockquote className="text-sm text-foreground mb-3 leading-relaxed">
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
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={prevQuote}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {currentQuoteIndex + 1}/{strength.patientFeedback.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={nextQuote}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
