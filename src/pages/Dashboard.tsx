import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoUploadCard } from "@/components/VideoUploadCard";
import { ProgressTracker } from "@/components/ProgressTracker";
import { Trophy, Activity, Target, CheckCircle2 } from "lucide-react";

interface UploadStatus {
  squat: 'pending' | 'uploading' | 'analyzing' | 'completed';
  jump: 'pending' | 'uploading' | 'analyzing' | 'completed';
  situp: 'pending' | 'uploading' | 'analyzing' | 'completed';
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    squat: 'pending',
    jump: 'pending',
    situp: 'pending'
  });

  const [progress, setProgress] = useState({
    squat: 0,
    jump: 0,
    situp: 0
  });

  const assessments = [
    {
      id: 'squat',
      title: 'Squat Detection',
      description: 'AI analysis of squat form and depth',
      icon: Activity,
      color: 'primary'
    },
    {
      id: 'jump',
      title: 'Jump Height Measurement',
      description: 'Vertical jump height calculation',
      icon: Target,
      color: 'secondary'  
    },
    {
      id: 'situp',
      title: 'Sit-up Counting',
      description: 'Automated rep counting and form analysis',
      icon: Trophy,
      color: 'success'
    }
  ];

  const handleVideoUpload = (assessmentId: keyof UploadStatus, file: File) => {
    setUploadStatus(prev => ({ ...prev, [assessmentId]: 'uploading' }));
    
    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        setProgress(prev => ({ ...prev, [assessmentId]: 100 }));
        setUploadStatus(prev => ({ ...prev, [assessmentId]: 'analyzing' }));
        clearInterval(interval);
        
        // Simulate analysis completion
        setTimeout(() => {
          setUploadStatus(prev => ({ ...prev, [assessmentId]: 'completed' }));
        }, 3000);
      } else {
        setProgress(prev => ({ ...prev, [assessmentId]: currentProgress }));
      }
    }, 200);
  };

  const allCompleted = Object.values(uploadStatus).every(status => status === 'completed');
  const overallProgress = Object.values(progress).reduce((acc, curr) => acc + curr, 0) / 3;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Sports Performance Assessment</h1>
          <p className="text-white/80 text-lg">Upload your videos for AI-powered analysis</p>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8 bg-gradient-card backdrop-blur-xl border-white/20 shadow-glow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="h-6 w-6 text-warning animate-pulse-glow" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ProgressTracker progress={overallProgress} />
              {allCompleted && (
                <div className="text-center animate-fade-in-up">
                  <Badge className="mb-4 animate-badge-bounce bg-gradient-success shadow-accent">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Analysis Complete!
                  </Badge>
                  <Button 
                    onClick={() => navigate('/report')}
                    className="bg-gradient-secondary hover:shadow-secondary transform hover:scale-105 transition-all duration-300"
                  >
                    View Results
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Tabs */}
        <Tabs defaultValue="squat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-card backdrop-blur-xl border border-white/20">
            {assessments.map((assessment) => (
              <TabsTrigger 
                key={assessment.id} 
                value={assessment.id}
                className="text-white data-[state=active]:bg-gradient-primary data-[state=active]:shadow-primary transition-all duration-300"
              >
                <assessment.icon className="h-4 w-4 mr-2" />
                {assessment.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {assessments.map((assessment) => (
            <TabsContent key={assessment.id} value={assessment.id}>
              <VideoUploadCard
                title={assessment.title}
                description={assessment.description}
                status={uploadStatus[assessment.id as keyof UploadStatus]}
                progress={progress[assessment.id as keyof UploadStatus]}
                onUpload={(file) => handleVideoUpload(assessment.id as keyof UploadStatus, file)}
                icon={assessment.icon}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;