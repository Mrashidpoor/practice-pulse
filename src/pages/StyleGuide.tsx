import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ColorToken {
  name: string;
  variable: string;
  tailwindClass: string;
  description: string;
}

const coreColors: ColorToken[] = [
  { name: "Background", variable: "--background", tailwindClass: "bg-background", description: "Main page background" },
  { name: "Foreground", variable: "--foreground", tailwindClass: "text-foreground", description: "Primary text color" },
  { name: "Card", variable: "--card", tailwindClass: "bg-card", description: "Card backgrounds" },
  { name: "Card Foreground", variable: "--card-foreground", tailwindClass: "text-card-foreground", description: "Card text color" },
  { name: "Popover", variable: "--popover", tailwindClass: "bg-popover", description: "Popover backgrounds" },
  { name: "Popover Foreground", variable: "--popover-foreground", tailwindClass: "text-popover-foreground", description: "Popover text" },
];

const brandColors: ColorToken[] = [
  { name: "Primary", variable: "--primary", tailwindClass: "bg-primary", description: "Brand teal - buttons, links, charts" },
  { name: "Primary Foreground", variable: "--primary-foreground", tailwindClass: "text-primary-foreground", description: "Text on primary" },
  { name: "Secondary", variable: "--secondary", tailwindClass: "bg-secondary", description: "Secondary backgrounds" },
  { name: "Secondary Foreground", variable: "--secondary-foreground", tailwindClass: "text-secondary-foreground", description: "Secondary text" },
  { name: "Accent", variable: "--accent", tailwindClass: "bg-accent", description: "Accent highlights" },
  { name: "Accent Foreground", variable: "--accent-foreground", tailwindClass: "text-accent-foreground", description: "Accent text" },
  { name: "Muted", variable: "--muted", tailwindClass: "bg-muted", description: "Muted backgrounds" },
  { name: "Muted Foreground", variable: "--muted-foreground", tailwindClass: "text-muted-foreground", description: "Muted/subtle text" },
];

const semanticColors: ColorToken[] = [
  { name: "Destructive", variable: "--destructive", tailwindClass: "bg-destructive", description: "Error states, delete actions" },
  { name: "Destructive Foreground", variable: "--destructive-foreground", tailwindClass: "text-destructive-foreground", description: "Text on destructive" },
  { name: "Border", variable: "--border", tailwindClass: "border-border", description: "Default borders" },
  { name: "Input", variable: "--input", tailwindClass: "border-input", description: "Input borders" },
  { name: "Ring", variable: "--ring", tailwindClass: "ring-ring", description: "Focus rings" },
];

const dashboardColors: ColorToken[] = [
  { name: "Improvement", variable: "--improvement", tailwindClass: "bg-improvement", description: "Areas for Improvement tab - amber warning" },
  { name: "Improvement Foreground", variable: "--improvement-foreground", tailwindClass: "text-improvement-foreground", description: "Text on improvement" },
  { name: "Strength", variable: "--strength", tailwindClass: "bg-strength", description: "Your Strengths tab - green success" },
  { name: "Strength Foreground", variable: "--strength-foreground", tailwindClass: "text-strength-foreground", description: "Text on strength" },
  { name: "Metrics", variable: "--metrics", tailwindClass: "bg-metrics", description: "Marketing Insights - teal metrics" },
  { name: "Metrics Foreground", variable: "--metrics-foreground", tailwindClass: "text-metrics-foreground", description: "Text on metrics" },
];

const ratingColors: ColorToken[] = [
  { name: "Rating Positive", variable: "--rating-positive", tailwindClass: "bg-[hsl(var(--rating-positive))]", description: "Green - scores ≥7, strengths, success" },
  { name: "Rating Neutral", variable: "--rating-neutral", tailwindClass: "bg-[hsl(var(--rating-neutral))]", description: "Amber - scores 5-7, warnings, stars" },
  { name: "Rating Negative", variable: "--rating-negative", tailwindClass: "bg-[hsl(var(--rating-negative))]", description: "Red - scores <5, high priority, errors" },
];

const sidebarColors: ColorToken[] = [
  { name: "Sidebar", variable: "--sidebar-background", tailwindClass: "bg-sidebar", description: "Sidebar background" },
  { name: "Sidebar Foreground", variable: "--sidebar-foreground", tailwindClass: "text-sidebar-foreground", description: "Sidebar text" },
  { name: "Sidebar Primary", variable: "--sidebar-primary", tailwindClass: "bg-sidebar-primary", description: "Sidebar primary" },
  { name: "Sidebar Accent", variable: "--sidebar-accent", tailwindClass: "bg-sidebar-accent", description: "Sidebar hover states" },
  { name: "Sidebar Border", variable: "--sidebar-border", tailwindClass: "border-sidebar-border", description: "Sidebar borders" },
];

function ColorSwatch({ token, isDark }: { token: ColorToken; isDark: boolean }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card/50">
      <div
        className="w-12 h-12 rounded-lg border border-border shadow-sm shrink-0"
        style={{ backgroundColor: `hsl(var(${token.variable}))` }}
      />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="font-medium text-sm text-foreground">{token.name}</div>
        <code className="block text-xs text-muted-foreground font-mono">{token.variable}</code>
        <code className="block text-xs text-primary font-mono font-semibold">{token.tailwindClass}</code>
        <p className="text-xs text-muted-foreground truncate">{token.description}</p>
      </div>
    </div>
  );
}

function ColorSection({ title, colors, isDark }: { title: string; colors: ColorToken[]; isDark: boolean }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {colors.map((token) => (
          <ColorSwatch key={token.variable} token={token} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}

function ThemePreview({ isDark }: { isDark: boolean }) {
  return (
    <div className={isDark ? "dark" : ""}>
      <div className="bg-background text-foreground p-6 rounded-xl border border-border space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold">{isDark ? "Dark Mode" : "Light Mode"}</h4>
          {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </div>

        <div className="space-y-6">
          <ColorSection title="Core Colors" colors={coreColors} isDark={isDark} />
          <ColorSection title="Brand Colors" colors={brandColors} isDark={isDark} />
          <ColorSection title="Semantic Colors" colors={semanticColors} isDark={isDark} />
          <ColorSection title="Dashboard Semantic Tokens" colors={dashboardColors} isDark={isDark} />
          <ColorSection title="Rating Colors" colors={ratingColors} isDark={isDark} />
          <ColorSection title="Sidebar Colors" colors={sidebarColors} isDark={isDark} />
        </div>

        {/* Usage Examples */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="font-semibold">Usage Examples</h4>
          <div className="flex flex-wrap gap-2">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[hsl(var(--rating-positive))]/10 text-[hsl(var(--rating-positive))]">
              Positive / Strength
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[hsl(var(--rating-neutral))]/10 text-[hsl(var(--rating-neutral))]">
              Neutral / Warning
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[hsl(var(--rating-negative))]/10 text-[hsl(var(--rating-negative))]">
              Negative / Error
            </span>
          </div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Sample Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is how cards look with the current theme applied.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function StyleGuide() {
  const [showBoth, setShowBoth] = useState(true);

  return (
    <div className="min-h-screen bg-muted p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Design System Style Guide</h1>
              <p className="text-muted-foreground text-sm">
                All color tokens from index.css with live previews
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowBoth(!showBoth)}>
            {showBoth ? "Show Single Mode" : "Show Both Modes"}
          </Button>
        </div>

        {/* Color Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">HSL Values Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Rating Colors (Light)</h4>
                <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                  <li>Positive: 152 69% 41% (Green)</li>
                  <li>Neutral: 36 96% 55% (Amber)</li>
                  <li>Negative: 0 84% 60% (Red)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Primary Colors</h4>
                <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                  <li>Primary: 174 50% 36% (Teal)</li>
                  <li>Background: 210 20% 98%</li>
                  <li>Foreground: 222 47% 11%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Dashboard Tokens</h4>
                <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                  <li>Improvement: 38 92% 50% (Amber)</li>
                  <li>Strength: 152 69% 41% (Green)</li>
                  <li>Metrics: 174 50% 36% (Teal)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Previews */}
        {showBoth ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ThemePreview isDark={false} />
            <ThemePreview isDark={true} />
          </div>
        ) : (
          <ThemePreview isDark={false} />
        )}

        {/* Tab-Specific Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tab-Specific Color Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border-l-4 border-l-[hsl(var(--rating-neutral))] bg-[hsl(var(--rating-neutral))]/5">
                <h4 className="font-semibold text-sm">Areas for Improvement</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Amber/orange tones. Red for #1 priority, amber for #2-3, grey for #4+
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-l-[hsl(var(--rating-positive))] bg-[hsl(var(--rating-positive))]/5">
                <h4 className="font-semibold text-sm">Your Strengths</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Green success tones throughout. Icons use black on green bg.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-l-primary bg-primary/5">
                <h4 className="font-semibold text-sm">Marketing Insights</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Teal primary. Score thresholds: ≥7 green, 5-7 amber, &lt;5 red.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-l-muted-foreground bg-muted">
                <h4 className="font-semibold text-sm">Recommendations</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Priority badges: high=red, medium=amber, low=grey.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
