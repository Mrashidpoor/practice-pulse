import { Trophy, Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StrengthCard } from "./StrengthCard";
import type { ClinicStrength, TopRatedEmployee } from "@/types/review-analytics";

interface YourStrengthsProps {
  strengths: ClinicStrength[];
  topEmployees?: TopRatedEmployee[];
}

export function YourStrengths({ strengths, topEmployees }: YourStrengthsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-strength/10 to-strength/5 border border-strength/20 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-strength" />
          <p className="text-foreground font-medium">
            These are areas where your practice excels according to patient feedback. Keep up the great work!
          </p>
        </div>
      </div>

      {/* Strength Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {strengths.map((strength) => (
          <StrengthCard key={strength.category} strength={strength} />
        ))}
      </div>

      {/* Top Rated Employees */}
      {topEmployees && topEmployees.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-strength" />
            Top Rated Team Members
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topEmployees.map((employee) => (
              <Card key={employee.name} className="border-strength/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-strength/10">
                      <User className="h-4 w-4 text-strength" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{employee.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-strength text-strength" />
                        <span className="text-sm text-strength font-medium">{employee.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({employee.mentionCount} mentions)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {employee.topPraiseKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="text-xs bg-strength/5 border-strength/20 text-strength"
                      >
                        {keyword}
                      </Badge>
                    ))}
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
