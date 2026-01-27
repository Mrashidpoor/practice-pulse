import { AnalysisDashboard } from "@/components/dashboard/AnalysisDashboard";
import { mockReviewAnalyticsData } from "@/data/mock-review-analytics";

const Index = () => {
  // Replace mockReviewAnalyticsData with your API data
  const data = mockReviewAnalyticsData;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Sales Funnel Analysis
          </h1>
          <p className="text-muted-foreground">
            Step 2: Branding — Review competitive insights and patient feedback analysis
          </p>
        </header>

        <AnalysisDashboard data={data} />
      </div>
    </div>
  );
};

export default Index;
