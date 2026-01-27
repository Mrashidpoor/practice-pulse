import { CheckCircle, XCircle, Lightbulb, AlertTriangle } from "lucide-react";
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
  iconColorClass: string;
}

function SWOTSection({ title, items, icon: Icon, iconColorClass }: SWOTSectionProps) {
  if (items.length === 0) return null;

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Icon className={cn("h-5 w-5", iconColorClass)} />
          <h4 className="font-semibold text-foreground">{title}</h4>
        </div>
        <ul className="space-y-2.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Icon className={cn("h-4 w-4 shrink-0 mt-0.5", iconColorClass)} />
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
        iconColorClass="text-[hsl(var(--rating-positive))]"
      />
      <SWOTSection
        title="Weaknesses"
        items={swot.weaknesses}
        icon={XCircle}
        iconColorClass="text-[hsl(var(--rating-negative))]"
      />
      <SWOTSection
        title="Opportunities"
        items={swot.opportunities}
        icon={Lightbulb}
        iconColorClass="text-[hsl(var(--rating-neutral))]"
      />
      <SWOTSection
        title="Threats"
        items={swot.threats}
        icon={AlertTriangle}
        iconColorClass="text-[hsl(var(--rating-negative))]"
      />
    </div>
  );
}
