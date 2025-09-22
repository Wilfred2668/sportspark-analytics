import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AthleteForm } from "@/components/AthleteForm";
import { Trophy, Zap, Target, Activity } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [athleteData, setAthleteData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    sport: ""
  });

  const handleStartAssessment = () => {
    // Store athlete data in localStorage for now
    localStorage.setItem('athleteData', JSON.stringify(athleteData));
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Activity,
      title: "Squat Analysis",
      description: "AI-powered form analysis and depth measurement"
    },
    {
      icon: Target,
      title: "Jump Measurement", 
      description: "Precise vertical jump height calculation"
    },
    {
      icon: Trophy,
      title: "Rep Counting",
      description: "Automated sit-up counting with form feedback"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="h-12 w-12 text-warning animate-pulse-glow" />
            <h1 className="text-5xl font-bold text-white">
              Sports Talent Assessment
            </h1>
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Advanced AI-powered analysis for athletic performance evaluation. 
            Upload videos and get instant feedback on form, technique, and metrics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur border-white/20 shadow-card animate-fade-in-up">
              <CardHeader className="text-center">
                <feature.icon className="h-12 w-12 text-warning mx-auto mb-4" />
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Athlete Information Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 backdrop-blur border-white/20 shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Athlete Information</CardTitle>
              <p className="text-white/70">Enter your details to begin assessment</p>
            </CardHeader>
            <CardContent>
              <AthleteForm 
                data={athleteData}
                onChange={setAthleteData}
                onSubmit={handleStartAssessment}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
