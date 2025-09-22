import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Calendar, Ruler, Weight, Trophy, TrendingUp } from "lucide-react";

interface AthleteData {
  name: string;
  age: string;
  height: string;
  weight: string;
  sport: string;
}

interface AssessmentResults {
  squat: {
    reps: number;
    averageDepth: number;
    formScore: number;
    badge: string;
  };
  jump: {
    maxHeight: number;
    averageHeight: number;
    explosiveness: number;
    badge: string;
  };
  situp: {
    reps: number;
    pace: string;
    formScore: number;
    badge: string;
  };
}

interface ReportSummaryProps {
  athleteData: AthleteData;
  assessmentResults: AssessmentResults;
  overallScore: number;
}

export const ReportSummary = ({ athleteData, assessmentResults, overallScore }: ReportSummaryProps) => {
  const strengthAreas = [
    { area: "Upper Body Strength", score: assessmentResults.situp.formScore },
    { area: "Lower Body Power", score: assessmentResults.jump.explosiveness },
    { area: "Movement Quality", score: assessmentResults.squat.formScore },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning"; 
    return "text-secondary";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: "Excellent", color: "bg-success" };
    if (score >= 80) return { text: "Good", color: "bg-warning" };
    if (score >= 70) return { text: "Average", color: "bg-secondary" };
    return { text: "Needs Work", color: "bg-destructive" };
  };

  return (
    <div className="space-y-6">
      {/* Athlete Profile */}
      <Card className="bg-white/10 backdrop-blur border-white/20 shadow-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Athlete Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-white font-semibold">{athleteData.name}</p>
                  <p className="text-white/70 text-sm">Athlete</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-white font-semibold">{athleteData.age} years old</p>
                  <p className="text-white/70 text-sm">Age</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Ruler className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-white font-semibold">{athleteData.height}</p>
                  <p className="text-white/70 text-sm">Height</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Weight className="h-5 w-5 text-success" />
                <div>
                  <p className="text-white font-semibold">{athleteData.weight}</p>
                  <p className="text-white/70 text-sm">Weight • {athleteData.sport}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Summary */}
      <Card className="bg-white/10 backdrop-blur border-white/20 shadow-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Assessment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/20 rounded-lg">
              <div className="text-2xl font-bold text-white">{assessmentResults.squat.reps}</div>
              <div className="text-white/70 text-sm">Squats</div>
              <Badge className="mt-2 bg-primary text-xs">{assessmentResults.squat.badge}</Badge>
            </div>
            
            <div className="text-center p-4 bg-secondary/20 rounded-lg">
              <div className="text-2xl font-bold text-white">{assessmentResults.jump.maxHeight}&quot;</div>
              <div className="text-white/70 text-sm">Max Jump</div>
              <Badge className="mt-2 bg-secondary text-xs">{assessmentResults.jump.badge}</Badge>
            </div>
            
            <div className="text-center p-4 bg-success/20 rounded-lg">
              <div className="text-2xl font-bold text-white">{assessmentResults.situp.reps}</div>
              <div className="text-white/70 text-sm">Sit-ups</div>
              <Badge className="mt-2 bg-success text-xs">{assessmentResults.situp.badge}</Badge>
            </div>
          </div>

          {/* Strength Areas */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Strength Areas
            </h4>
            
            {strengthAreas.map((area, index) => {
              const badge = getScoreBadge(area.score);
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">{area.area}</span>
                    <Badge className={badge.color}>{badge.text}</Badge>
                  </div>
                  <Progress value={area.score} className="h-2" />
                  <div className="text-right">
                    <span className={`text-sm font-semibold ${getScoreColor(area.score)}`}>
                      {area.score}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="bg-white/10 backdrop-blur border-white/20 shadow-card">
        <CardHeader>
          <CardTitle className="text-white">Performance Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="text-white font-semibold text-sm">Strengths</h5>
              <div className="space-y-1">
                <p className="text-success text-sm">• Excellent jump height consistency</p>
                <p className="text-success text-sm">• Strong core endurance</p>
                <p className="text-success text-sm">• Good movement mechanics</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h5 className="text-white font-semibold text-sm">Areas for Improvement</h5>
              <div className="space-y-1">
                <p className="text-warning text-sm">• Squat depth consistency</p>
                <p className="text-warning text-sm">• Landing mechanics refinement</p>
                <p className="text-warning text-sm">• Movement tempo control</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};