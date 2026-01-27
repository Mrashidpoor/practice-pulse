import { CheckCircle, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SWOTAnalysis } from "@/types/review-analytics";
import { cn } from "@/lib/utils";

interface SWOTGridProps {
  swot: SWOTAnalysis;
}

interface SWOTSectionProps {
  title: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

function SWOTSection({ title, items, icon: Icon, colorClass, bgClass, borderClass }: SWOTSectionProps) {
  if (items.length === 0) return null;

  return (
    <Card className={cn("border", borderClass)}>
      <CardContent className={cn("p-4", bgClass)}>
        <div className="flex items-center gap-2 mb-3">
          <Icon className={cn("h-4 w-4", colorClass)} />
          <h4 className={cn("font-semibold text-sm", colorClass)}>{title}</h4>
        </div>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-foreground">
              <span className={cn("mt-1.5 h-1.5 w-1.5 rounded-full shrink-0", colorClass.replace("text-", "bg-"))} />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function SWOTGrid({ swot }: SWOTGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SWOTSection
        title="Strengths"
        items={swot.strengths}
        icon={CheckCircle}
        colorClass="text-strength"
        bgClass="bg-strength/5"
        borderClass="border-strength/20"
      />
      <SWOTSection
        title="Weaknesses"
        items={swot.weaknesses}
        icon={AlertTriangle}
        colorClass="text-destructive"
        bgClass="bg-destructive/5"
        borderClass="border-destructive/20"
      />
      <SWOTSection
        title="Opportunities"
        items={swot.opportunities}
        icon={Lightbulb}
        colorClass="text-improvement"
        bgClass="bg-improvement/5"
        borderClass="border-improvement/20"
      />
      <SWOTSection
        title="Threats"
        items={swot.threats}
        icon={AlertCircle}
        colorClass="text-destructive"
        bgClass="bg-destructive/5"
        borderClass="border-destructive/20"
      />
    </div>
  );
}
