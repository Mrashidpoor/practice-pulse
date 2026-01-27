import { AlertTriangle, Trophy, BarChart3, Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreasForImprovement } from "./AreasForImprovement";
import { YourStrengths } from "./YourStrengths";
import { MarketingInsights } from "./MarketingInsights";
import { RecommendationsTab } from "./RecommendationsTab";
import type { ReviewAnalyticsData } from "@/types/review-analytics";

interface AnalysisDashboardProps {
  data: ReviewAnalyticsData;
}

export function AnalysisDashboard({ data }: AnalysisDashboardProps) {
  return (
    <div className="w-full">
      <Tabs defaultValue="improvement" className="w-full">
        <TabsList className="w-full h-auto p-1.5 bg-card border border-border rounded-xl flex flex-wrap justify-start sm:justify-center gap-1 shadow-sm">
          <TabsTrigger
            value="improvement"
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Areas for Improvement</span>
            <span className="sm:hidden">Improve</span>
          </TabsTrigger>
          <TabsTrigger
            value="strengths"
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
          >
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Your Strengths</span>
            <span className="sm:hidden">Strengths</span>
          </TabsTrigger>
          <TabsTrigger
            value="marketing"
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Marketing Insights</span>
            <span className="sm:hidden">Marketing</span>
          </TabsTrigger>
          <TabsTrigger
            value="recommendations"
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
          >
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Recommendations</span>
            <span className="sm:hidden">Tips</span>
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
            />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-0">
            <RecommendationsTab
              recommendations={data.marketingRecommendations}
              seasonalTips={data.seasonalTips}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
