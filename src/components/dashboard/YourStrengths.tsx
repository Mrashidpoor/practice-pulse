import { CheckCircle, Star, User, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StrengthCard } from "./StrengthCard";
import type { ClinicStrength, TopRatedEmployee } from "@/types/review-analytics";
import { cn } from "@/lib/utils";

interface YourStrengthsProps {
  strengths: ClinicStrength[];
  topEmployees?: TopRatedEmployee[];
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
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
    <span className="text-sm font-medium text-foreground ml-1">{rating}</span>
  </div>
);

export function YourStrengths({ strengths, topEmployees }: YourStrengthsProps) {
  return (
    <div className="space-y-4">
      {/* Top Strengths Section */}
      <div>
        {/* Header Card - attached to grid */}
        <Card className="bg-card border-border shadow-sm rounded-b-none border-b-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[hsl(var(--rating-positive))]/10">
                <CheckCircle className="h-5 w-5 text-[hsl(var(--rating-positive))]" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Top Strengths
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your practice is doing well in these areas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strength Cards List - connected container */}
        <div className="border border-t-0 border-border rounded-b-lg bg-card p-3 space-y-2">
          {strengths.map((strength) => (
            <StrengthCard key={strength.category} strength={strength} />
          ))}
        </div>
      </div>

      {/* Top Rated Employees Section */}
      {topEmployees && topEmployees.length > 0 && (
        <div>
          {/* Header Card - attached to grid */}
          <Card className="bg-card border-border shadow-sm rounded-b-none border-b-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    Top Employee Highlights
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Staff members frequently praised by patients
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Cards List - connected container */}
          <div className="border border-t-0 border-border rounded-b-lg bg-card p-3 space-y-2">
            {topEmployees.map((employee, index) => (
              <Card 
                key={employee.name} 
                className={cn(
                  "bg-card border-border shadow-sm hover:shadow-md transition-shadow border-l-4",
                  index === 0 ? "border-l-amber-400" : "border-l-[hsl(var(--rating-positive))]"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg shrink-0",
                      index === 0 ? "bg-amber-100 dark:bg-amber-900/30" : "bg-[hsl(var(--rating-positive))]/10"
                    )}>
                      <User className="h-4 w-4 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-foreground">{employee.name}</h3>
                        {index === 0 && (
                          <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium">
                            Top Rated
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Known for being {employee.topPraiseKeywords.slice(0, 2).join(" and ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <StarRating rating={employee.rating} />
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {employee.mentionCount} reviews
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
