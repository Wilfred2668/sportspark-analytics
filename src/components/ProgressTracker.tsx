import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Zap } from "lucide-react";

interface ProgressTrackerProps {
  progress: number;
}

export const ProgressTracker = ({ progress }: ProgressTrackerProps) => {
  const getProgressBadge = () => {
    if (progress === 0) {
      return (
        <Badge variant="outline" className="text-white/70 border-white/30">
          <Clock className="h-3 w-3 mr-1" />
          Ready to Start
        </Badge>
      );
    } else if (progress < 100) {
      return (
        <Badge variant="secondary" className="animate-pulse">
          <Zap className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-success animate-badge-bounce">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Complete
        </Badge>
      );
    }
  };

  const getProgressLabel = () => {
    if (progress === 0) return "Assessment not started";
    if (progress < 33) return "Getting started...";
    if (progress < 66) return "Making good progress...";
    if (progress < 100) return "Almost finished...";
    return "All assessments complete!";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Assessment Progress</h3>
          <p className="text-white/70 text-sm">{getProgressLabel()}</p>
        </div>
        {getProgressBadge()}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Progress</span>
          <span className="text-white font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress 
          value={progress} 
          className="h-3 bg-white/20" 
        />
      </div>
      
      {progress === 100 && (
        <div className="text-center p-4 bg-success/20 rounded-lg border border-success/30 animate-fade-in-up">
          <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
          <p className="text-white font-semibold">Ready for Results!</p>
          <p className="text-white/70 text-sm">Your comprehensive report is available</p>
        </div>
      )}
    </div>
  );
};