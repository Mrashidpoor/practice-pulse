import { AlertTriangle, Trophy, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreasForImprovement } from "./AreasForImprovement";
import { YourStrengths } from "./YourStrengths";
import { MarketingInsights } from "./MarketingInsights";
import type { ReviewAnalyticsData } from "@/types/review-analytics";

interface AnalysisDashboardProps {
  data: ReviewAnalyticsData;
}

export function AnalysisDashboard({ data }: AnalysisDashboardProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="improvement" className="w-full">
        <TabsList className="w-full h-auto p-1 bg-muted/50 flex flex-wrap justify-start sm:justify-center gap-1">
          <TabsTrigger
            value="improvement"
            className="flex items-center gap-2 data-[state=active]:bg-improvement/20 data-[state=active]:text-improvement-foreground px-4 py-2.5"
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Areas for Improvement</span>
            <span className="sm:hidden">Improve</span>
          </TabsTrigger>
          <TabsTrigger
            value="strengths"
            className="flex items-center gap-2 data-[state=active]:bg-strength/20 data-[state=active]:text-strength px-4 py-2.5"
          >
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Your Strengths</span>
            <span className="sm:hidden">Strengths</span>
          </TabsTrigger>
          <TabsTrigger
            value="marketing"
            className="flex items-center gap-2 data-[state=active]:bg-metrics/20 data-[state=active]:text-metrics px-4 py-2.5"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Marketing Insights</span>
            <span className="sm:hidden">Marketing</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="improvement" className="mt-0">
            <AreasForImprovement data={data.competitiveComparison} />
          </TabsContent>

          <TabsContent value="strengths" className="mt-0">
            <YourStrengths
              strengths={data.clinicStrengths}
              topEmployees={data.topRatedEmployees}
            />
          </TabsContent>

          <TabsContent value="marketing" className="mt-0">
            <MarketingInsights
              improvingTrend={data.improvingTrend}
              metrics={data.metrics}
              monthlyTarget={data.monthlyReviewTarget}
              swotAnalysis={data.swotAnalysis}
              recommendations={data.marketingRecommendations}
              seasonalTips={data.seasonalTips}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
