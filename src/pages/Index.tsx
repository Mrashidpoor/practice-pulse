import { AnalysisDashboard } from "@/components/dashboard/AnalysisDashboard";
import { mockReviewAnalyticsData } from "@/data/mock-review-analytics";

const Index = () => {
  // Replace mockReviewAnalyticsData with your API data
  const data = mockReviewAnalyticsData;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Patient Review Analysis
          </h1>
          <p className="text-muted-foreground">
            Competitive insights and patient feedback analysis
          </p>
        </header>

        <AnalysisDashboard data={data} />
      </div>
    </div>
  );
};

export default Index;
