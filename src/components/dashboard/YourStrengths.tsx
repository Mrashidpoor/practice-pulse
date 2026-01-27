import { CheckCircle, Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StrengthCard } from "./StrengthCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[hsl(var(--rating-positive))]/10">
              <CheckCircle className="h-6 w-6 text-[hsl(var(--rating-positive))]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Top Strengths
              </h2>
              <p className="text-muted-foreground">
                Your practice is doing well in these areas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strength Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {strengths.map((strength) => (
          <StrengthCard key={strength.category} strength={strength} />
        ))}
      </div>

      {/* Top Rated Employees */}
      {topEmployees && topEmployees.length > 0 && (
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Top Employee Highlights
            </h3>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground">Description</TableHead>
                  <TableHead className="text-muted-foreground text-right">Google rating</TableHead>
                  <TableHead className="text-muted-foreground text-right"># of Reviews</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topEmployees.map((employee) => (
                  <TableRow key={employee.name} className="border-border">
                    <TableCell className="font-medium text-foreground">
                      {employee.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Known for being {employee.topPraiseKeywords.slice(0, 2).join(" and ")}.
                    </TableCell>
                    <TableCell className="text-right">
                      <StarRating rating={employee.rating} />
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {employee.mentionCount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
