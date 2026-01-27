// Review Analytics Data Types for Sales Funnel Dashboard

export interface UserComplaint {
  quote: string;
  rating: number;
  reviewerName: string;
  reviewDate: string;
}

export interface CompetitorQuote {
  quote: string;
  competitorName: string;
  reviewDate: string;
  recommendation: string;
  priority: "high" | "medium" | "low";
}

export interface CompetitorAdvantage {
  category: string;
  icon: string;
  insight: string;
  userComplaint: UserComplaint;
  competitorQuote: CompetitorQuote;
}

export interface CompetitiveComparison {
  summary: string;
  competitorAdvantages: CompetitorAdvantage[];
}

export interface PatientFeedback {
  quote: string;
  stars: number;
  reviewer: string;
  date: string;
  sentiment: "positive" | "neutral" | "negative";
}

export interface ClinicStrength {
  category: string;
  icon: string;
  description: string;
  patientFeedback: PatientFeedback[];
}

export interface TopRatedEmployee {
  name: string;
  rating: number;
  mentionCount: number;
  topPraiseKeywords: string[];
}

export interface MonthlyTrendPoint {
  month: string;
  you: number;
  competitor: number;
}

export interface ImprovingTrend {
  message: string;
  behindBy: string;
  percentile: string;
  monthlyData?: MonthlyTrendPoint[];
}

export interface ReviewMetrics {
  totalReviews: number;
  totalReviewsCompetitor: number;
  last12MonthsReviews: number;
  last12MonthsReviewsCompetitor: number;
  positiveReviews12Mo: number;
  positiveReviews12MoCompetitor: number;
  positiveRate: string;
  positiveRateCompetitor: string;
}

export interface MonthlyTarget {
  current: string;
  target: string;
  percentageIncrease: string;
  seasonalMessage?: string;
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface MarketingRecommendation {
  priority: "high" | "medium" | "low";
  timeframe: "short-term" | "medium-term" | "long-term";
  title: string;
  description: string;
  impact: string;
  audience: string;
}

export interface SeasonalTip {
  month: string;
  tip: string;
  icon?: string;
}

export interface ReviewAnalyticsData {
  competitiveComparison: CompetitiveComparison;
  clinicStrengths: ClinicStrength[];
  topRatedEmployees: TopRatedEmployee[];
  improvingTrend: ImprovingTrend;
  metrics: ReviewMetrics;
  monthlyReviewTarget: MonthlyTarget;
  swotAnalysis: SWOTAnalysis;
  marketingRecommendations: MarketingRecommendation[];
  seasonalTips?: SeasonalTip[];
}
