
# AI Sales Funnel Analysis Dashboard - Step 2: Branding Section

## Overview
A comprehensive analysis dashboard section for your existing dental practice sales funnel wizard, featuring three analysis tabs with detailed competitive intelligence and patient feedback insights.

---

## Phase 1: Core Dashboard Structure

### Main Tabbed Interface
- **Clean tab navigation** with three equally weighted tabs
- Smooth transitions between tabs with proper loading states
- Responsive design that stacks horizontally on mobile with scrollable tab list
- Visual indicators for the currently active tab

---

## Tab 1: Areas for Improvement 🟡

### Top Section
- **Header**: "These are areas where competitors are outperforming your practice based on patient reviews"
- **Focus Banner**: Yellow gradient background with "Focus on these 4 areas to improve your competitive position"
- **Quick-Access Chips**: 4 clickable category buttons (e.g., "Overtreatment Concerns / Trust", "Billing & Insurance Transparency", "Dentist Anxiety & Emotional Comfort", "Wait Times")

### Improvement Cards (Expandable)
Each card displays:
- **Category icon + title** with yellow "Improve" badge
- **Rank indicator** (#1, #2, etc.) in top-right corner
- **Insight summary** explaining the competitive gap
- **Two-column comparison layout**:
  - **Left (Orange)**: "Patient's Experience" - User's practice review quote with star rating, reviewer name, and date
  - **Right (Green)**: "How [Competitor] Does It" - Competitor's positive approach with their review quote
- **Recommendation section** at bottom with lightbulb icon and actionable advice

### Visual Design
- Yellow/amber color scheme indicating improvement areas
- Orange left border on user complaint cards
- Green left border on competitor positive cards

---

## Tab 2: Your Strengths 💚

### Header Section
- **Encouraging message**: "These are areas where your practice excels according to patient feedback. Keep up the great work!"

### Strength Cards
Each card displays:
- **Category icon + title** with green checkmark badge
- **Description** of why this is a strength
- **"Patients love this"** callout section with:
  - Quote icon
  - Patient feedback quote in green italic text
  - 5-star rating display
  - Reviewer name and date

### Visual Design
- Green success color scheme throughout
- Green left border on strength cards
- Rounded corners with subtle shadow

---

## Tab 3: Marketing Insights 📊

### Section 1: Competitive Position Banner
- **Status badges**: "Behind by 266 reviews" (orange) and "35th percentile" (neutral)

### Section 2: Review Metrics Grid (2x2)
Four metric cards comparing your practice vs top competitor:
1. **Total Reviews**: Bar comparison with "X to catch up" indicator
2. **Last 12 Months**: Recent review volume comparison
3. **Positive Reviews (12 Mo)**: Positive review count comparison
4. **Positive Rate**: Percentage comparison with "Ahead/Behind" indicator

### Section 3: Monthly Review Target
- **Target card** with current rate vs target rate
- Percentage increase needed highlighted in teal
- Contextual message about timing (e.g., "Capitalize on New Year resolution trend")

### Section 4: SWOT Analysis Grid
- **2x2 layout** with color-coded sections:
  - Strengths (green) with checkmark indicators
  - Weaknesses (red/pink) with warning indicators
  - Opportunities (yellow) with lightbulb indicators
  - Threats (red) if applicable
- Each section contains bullet points with actionable insights

### Section 5: Marketing Recommendations
- **Priority-sorted cards** (High → Medium → Low)
- Each card shows:
  - Priority badge (red for high, orange for medium)
  - Timeframe indicator (short-term, medium-term)
  - Recommendation title
  - Description
  - Impact statement
  - Target audience

### Section 6: Seasonal Tips
- **Monthly tip cards** (e.g., January, February)
- Actionable seasonal marketing suggestions

---

## Technical Implementation

### Component Architecture
- **Props-based design** - Components accept data via TypeScript interfaces matching your JSON structure
- **Type definitions** for all data models (competitiveComparison, clinicStrengths, metrics, etc.)
- Easy to wire up your existing API calls

### Key TypeScript Interfaces
```typescript
// Data will flow through these interfaces
interface ReviewAnalyticsData {
  competitiveComparison: CompetitiveComparison;
  clinicStrengths: ClinicStrength[];
  topRatedEmployees: TopRatedEmployee[];
  improvingTrend: ImprovingTrend;
  metrics: ReviewMetrics;
  monthlyReviewTarget: MonthlyTarget;
  swotAnalysis: SWOTAnalysis;
  marketingRecommendations: MarketingRecommendation[];
}
```

### Responsive Breakpoints
- **Mobile**: Single column, full-width cards
- **Tablet**: 1-2 column layouts
- **Desktop**: Side-by-side comparisons, 2x2 grids

### Accessibility
- Proper ARIA labels on all interactive elements
- Keyboard navigation support
- WCAG AA color contrast compliance
- Screen reader friendly structure

---

## Design Tokens

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Improvement/Warning | Amber-400 | Amber-600 |
| Strengths/Success | Emerald-500 | Emerald-600 |
| Metrics/Info | Blue-500 | Blue-400 |
| Borders | Gray-200 | Gray-700 |

---

## Future Phase: AI Image Generator
*Not included in initial build*

The AI Satirical Team Photo Generator will be added in a subsequent phase, featuring:
- Collapsible section below the tabs
- Review selection for inspiration
- Reference image grid from scraped content
- Brand color picker
- AI-powered image generation with Lovable AI
- Chat-based refinement interface
