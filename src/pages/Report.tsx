import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsDisplay } from "@/components/MetricsDisplay";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ReportSummary } from "@/components/ReportSummary";
import { 
  Download, 
  Trophy, 
  Activity, 
  Target, 
  Star,
  TrendingUp,
  Award,
  FileText
} from "lucide-react";

const Report = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - replace with actual API data
  const athleteData = {
    name: "Alex Johnson",
    age: "24",
    height: "6'2\"",
    weight: "180 lbs",
    sport: "Basketball"
  };

  const assessmentResults = {
    squat: {
      reps: 15,
      averageDepth: 85,
      formScore: 92,
      recommendations: ["Maintain knee alignment", "Increase depth by 5%"],
      badge: "Excellent Form"
    },
    jump: {
      maxHeight: 28.5,
      averageHeight: 26.2,
      explosiveness: 88,
      recommendations: ["Focus on arm swing", "Improve landing mechanics"],
      badge: "High Performer"
    },
    situp: {
      reps: 45,
      pace: "Consistent",
      formScore: 87, 
      recommendations: ["Slower controlled movement", "Full range of motion"],
      badge: "Strong Core"
    }
  };

  const overallScore = 89;

  const handleDownloadReport = () => {
    // Mock download - replace with actual API call
    console.log("Downloading full report...");
  };

  const handleDownloadVideo = (assessment: string) => {
    // Mock download - replace with actual API call
    console.log(`Downloading ${assessment} analyzed video...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold text-foreground">Performance Report</h1>
          </div>
          <p className="text-muted-foreground text-lg">Comprehensive analysis results</p>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 shadow-card border">
          <CardHeader className="text-center">
            <CardTitle className="text-foreground text-2xl">Overall Performance Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative inline-block">
              <div className="text-6xl font-bold text-primary mb-4">{overallScore}</div>
              <Badge className="absolute -top-2 -right-8 bg-success text-success-foreground animate-badge-bounce">
                <Star className="h-4 w-4 mr-1" />
                Excellent
              </Badge>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button 
                onClick={handleDownloadReport}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Full Report
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <FileText className="h-4 w-4 mr-2" />
                View Analysis
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card border">
            <TabsTrigger value="overview" className="text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Trophy className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="squat" className="text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Activity className="h-4 w-4 mr-2" />
              Squat
            </TabsTrigger>
            <TabsTrigger value="jump" className="text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Target className="h-4 w-4 mr-2" />
              Jump
            </TabsTrigger>
            <TabsTrigger value="situp" className="text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Award className="h-4 w-4 mr-2" />
              Sit-up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ReportSummary 
              athleteData={athleteData}
              assessmentResults={assessmentResults}
              overallScore={overallScore}
            />
          </TabsContent>

          <TabsContent value="squat">
            <div className="grid md:grid-cols-2 gap-6">
              <VideoPlayer 
                title="Squat Analysis"
                onDownload={() => handleDownloadVideo('squat')}
              />
              <MetricsDisplay 
                title="Squat Metrics"
                metrics={assessmentResults.squat}
                color="primary"
              />
            </div>
          </TabsContent>

          <TabsContent value="jump">
            <div className="grid md:grid-cols-2 gap-6">
              <VideoPlayer 
                title="Jump Analysis"
                onDownload={() => handleDownloadVideo('jump')}
              />
              <MetricsDisplay 
                title="Jump Metrics"
                metrics={assessmentResults.jump}
                color="secondary"
              />
            </div>
          </TabsContent>

          <TabsContent value="situp">
            <div className="grid md:grid-cols-2 gap-6">
              <VideoPlayer 
                title="Sit-up Analysis"
                onDownload={() => handleDownloadVideo('situp')}
              />
              <MetricsDisplay 
                title="Sit-up Metrics"
                metrics={assessmentResults.situp}
                color="success"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Report;