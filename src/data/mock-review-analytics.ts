import type { ReviewAnalyticsData } from "@/types/review-analytics";

export const mockReviewAnalyticsData: ReviewAnalyticsData = {
  competitiveComparison: {
    summary: "Top opportunities are improving dentist chairside manner, billing transparency, patient anxiety management, and wait times.",
    competitorAdvantages: [
      {
        category: "Overtreatment Concerns / Trust",
        icon: "shield-alert",
        insight: "Patients feel pressured into unnecessary procedures and question treatment recommendations.",
        userComplaint: {
          quote: "They tried to sell me $3,000 worth of work that my previous dentist said I didn't need. Lost all trust.",
          rating: 1,
          reviewerName: "Katie Hostetler",
          reviewDate: "2 months ago"
        },
        competitorQuote: {
          quote: "Dr. Smith always explains why each treatment is needed and never pushes services. I trust their recommendations completely.",
          competitorName: "Smile Dental Care",
          reviewDate: "1 month ago",
          recommendation: "Implement transparent treatment planning with visual aids and second-opinion options.",
          priority: "high"
        }
      },
      {
        category: "Billing & Insurance Transparency",
        icon: "receipt",
        insight: "Patients are surprised by unexpected costs and unclear insurance processing.",
        userComplaint: {
          quote: "The bill was $400 more than quoted. No one explained the additional charges until after the procedure.",
          rating: 2,
          reviewerName: "Michael Chen",
          reviewDate: "3 months ago"
        },
        competitorQuote: {
          quote: "They gave me a detailed breakdown before any work and helped me understand my insurance coverage perfectly.",
          competitorName: "Family Dental Center",
          reviewDate: "2 weeks ago",
          recommendation: "Provide written cost estimates with insurance breakdown before all procedures.",
          priority: "high"
        }
      },
      {
        category: "Dentist Anxiety & Emotional Comfort",
        icon: "heart",
        insight: "Anxious patients feel rushed and unsupported during procedures.",
        userComplaint: {
          quote: "I told them I have dental anxiety and they didn't seem to care. Felt like a number, not a patient.",
          rating: 1,
          reviewerName: "Sarah Martinez",
          reviewDate: "1 month ago"
        },
        competitorQuote: {
          quote: "As someone with severe dental phobia, they took the time to explain everything and let me take breaks. Life-changing!",
          competitorName: "Gentle Dentistry",
          reviewDate: "3 weeks ago",
          recommendation: "Implement anxiety protocols including pre-visit calls, comfort items, and patient-controlled breaks.",
          priority: "high"
        }
      },
      {
        category: "Wait Times & Scheduling",
        icon: "clock",
        insight: "Long wait times and scheduling difficulties frustrate patients.",
        userComplaint: {
          quote: "Had a 2pm appointment, wasn't seen until 3:15. No apology or explanation. This happens every time.",
          rating: 2,
          reviewerName: "David Thompson",
          reviewDate: "6 weeks ago"
        },
        competitorQuote: {
          quote: "I've never waited more than 5 minutes past my appointment time. They respect my schedule.",
          competitorName: "Premier Dental",
          reviewDate: "1 month ago",
          recommendation: "Implement buffer time between appointments and send wait time updates via text.",
          priority: "medium"
        }
      }
    ]
  },
  clinicStrengths: [
    {
      category: "Dentist Chairside Manner",
      icon: "user-check",
      description: "Patients feel cared for and kept comfortable during their visits. Your team's personal touch is a standout.",
      patientFeedback: [
        {
          quote: "They are thorough, patient, and really make sure I'm comfortable throughout the entire visit.",
          stars: 5,
          reviewer: "Robert Schemitsch",
          date: "2025-01-12",
          sentiment: "positive"
        },
        {
          quote: "Dr. Johnson remembered my kids' names and asked about my job. Feels like family!",
          stars: 5,
          reviewer: "Amanda Liu",
          date: "2025-01-05",
          sentiment: "positive"
        }
      ]
    },
    {
      category: "Quality of Dental Work",
      icon: "star",
      description: "Technical excellence in procedures leads to lasting results and patient confidence.",
      patientFeedback: [
        {
          quote: "My crown from 5 years ago still looks and feels perfect. Best dental work I've ever had.",
          stars: 5,
          reviewer: "James Wilson",
          date: "2024-12-28",
          sentiment: "positive"
        }
      ]
    },
    {
      category: "Friendly Staff",
      icon: "smile",
      description: "Front desk and hygienists create a welcoming atmosphere that patients appreciate.",
      patientFeedback: [
        {
          quote: "Everyone from reception to the hygienist was so friendly. Makes going to the dentist actually pleasant!",
          stars: 5,
          reviewer: "Lisa Park",
          date: "2025-01-08",
          sentiment: "positive"
        },
        {
          quote: "The staff remembers my preferences and always greets me by name. Exceptional service.",
          stars: 5,
          reviewer: "Tom Bradley",
          date: "2024-12-15",
          sentiment: "positive"
        }
      ]
    }
  ],
  topRatedEmployees: [
    {
      name: "Dr. Sarah Johnson",
      rating: 4.9,
      mentionCount: 45,
      topPraiseKeywords: ["thorough", "patient", "caring", "gentle"]
    },
    {
      name: "Maria (Hygienist)",
      rating: 4.8,
      mentionCount: 32,
      topPraiseKeywords: ["friendly", "professional", "painless"]
    },
    {
      name: "Jenny (Front Desk)",
      rating: 4.7,
      mentionCount: 28,
      topPraiseKeywords: ["helpful", "organized", "welcoming"]
    }
  ],
  improvingTrend: {
    message: "266 reviews behind Smile Dental Care. ~22 months to catch up at current pace.",
    behindBy: "266 reviews",
    percentile: "35th percentile",
    monthlyData: [
      { month: "Feb", you: 10, competitor: 8 },
      { month: "Mar", you: 4, competitor: 6 },
      { month: "Apr", you: 8, competitor: 11 },
      { month: "May", you: 17, competitor: 19 },
      { month: "Jun", you: 11, competitor: 14 },
      { month: "Jul", you: 9, competitor: 10 },
      { month: "Aug", you: 12, competitor: 24 },
      { month: "Sep", you: 3, competitor: 6 },
      { month: "Oct", you: 17, competitor: 13 },
      { month: "Nov", you: 7, competitor: 8 },
      { month: "Dec", you: 6, competitor: 9 },
      { month: "Jan", you: 5, competitor: 6 },
    ]
  },
  metrics: {
    you: {
      totalReviews: 505,
      last12MonthsReviews: 136,
      positiveReviews12Mo: 134,
      positiveRate: 99,
    },
    competitors: [
      { name: "Smile Dental Care", totalReviews: 771, last12MonthsReviews: 198, positiveReviews12Mo: 185, positiveRate: 93 },
      { name: "Family Dental Center", totalReviews: 623, last12MonthsReviews: 156, positiveReviews12Mo: 142, positiveRate: 91 },
      { name: "Gentle Dentistry", totalReviews: 589, last12MonthsReviews: 143, positiveReviews12Mo: 138, positiveRate: 97 },
      { name: "Premier Dental", totalReviews: 534, last12MonthsReviews: 128, positiveReviews12Mo: 119, positiveRate: 93 },
      { name: "Bright Smiles", totalReviews: 478, last12MonthsReviews: 112, positiveReviews12Mo: 104, positiveRate: 93 },
    ],
    // Legacy fields
    totalReviews: 505,
    totalReviewsCompetitor: 771,
    last12MonthsReviews: 136,
    last12MonthsReviewsCompetitor: 198,
    positiveReviews12Mo: 134,
    positiveReviews12MoCompetitor: 185,
    positiveRate: "99%",
    positiveRateCompetitor: "93%"
  },
  monthlyReviewTarget: {
    current: "11.33/mo",
    target: "15/mo",
    percentageIncrease: "32%",
    seasonalMessage: "Capitalize on New Year resolution trend for dental health"
  },
  swotAnalysis: {
    strengths: [
      "High Positive Review Rate (99%)",
      "Strong staff friendliness mentions",
      "Quality dental work recognized",
      "Personal patient relationships"
    ],
    weaknesses: [
      "Lower Review Volume vs Competitors",
      "Trust concerns in some reviews",
      "Billing transparency issues",
      "Wait time complaints"
    ],
    opportunities: [
      "Capitalize on Tax Refund Season",
      "New Year health resolutions",
      "Back-to-school dental checkups",
      "Senior citizen outreach programs"
    ],
    threats: [
      "Competitor expanding hours",
      "New dental practice opening nearby",
      "Rising negative review trends in market"
    ]
  },
  marketingRecommendations: [
    {
      priority: "high",
      timeframe: "short-term",
      title: "Enhance Online Review Strategy",
      description: "Implement automated post-visit review requests via SMS within 2 hours of appointments. Include direct links to Google and Yelp.",
      impact: "Increased review volume and improved online visibility",
      audience: "Current patients and families seeking dental care"
    },
    {
      priority: "high",
      timeframe: "short-term",
      title: "Launch Trust-Building Campaign",
      description: "Create video content showing transparent treatment planning process. Feature real patient testimonials about honest recommendations.",
      impact: "Address trust concerns and differentiate from competitors",
      audience: "New patients researching dental practices"
    },
    {
      priority: "medium",
      timeframe: "medium-term",
      title: "Implement Anxiety-Friendly Protocol",
      description: "Train staff on anxiety management, create comfort menu (blankets, headphones, breaks), and market as 'anxiety-friendly practice'.",
      impact: "Capture anxious patient market segment and reduce negative reviews",
      audience: "Patients with dental anxiety (estimated 30-40% of population)"
    },
    {
      priority: "medium",
      timeframe: "short-term",
      title: "Price Transparency Initiative",
      description: "Develop clear pricing guides for common procedures. Offer free insurance benefit checks and written estimates before all work.",
      impact: "Reduce billing complaints and build trust with cost-conscious patients",
      audience: "Price-sensitive patients and those with insurance questions"
    },
    {
      priority: "low",
      timeframe: "long-term",
      title: "Community Outreach Program",
      description: "Partner with local schools and senior centers for free dental education and screenings. Build brand awareness and community trust.",
      impact: "Long-term brand building and community reputation",
      audience: "Families with children and senior citizens"
    }
  ],
  seasonalTips: [
    {
      month: "January",
      tip: "Promote 'New Year, New Smile' campaigns. Many patients set health resolutions - capture this momentum with special checkup packages.",
      icon: "calendar"
    },
    {
      month: "February",
      tip: "Valentine's Day teeth whitening promotions. 'Fall in love with your smile' messaging works well for cosmetic services.",
      icon: "heart"
    }
  ]
};
