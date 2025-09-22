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
        <Badge variant="outline" className="text-muted-foreground border-border">
          <Clock className="h-3 w-3 mr-1" />
          Ready to Start
        </Badge>
      );
    } else if (progress < 100) {
      return (
        <Badge className="bg-secondary text-secondary-foreground animate-pulse">
          <Zap className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-success text-success-foreground animate-badge-bounce">
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
          <h3 className="text-foreground font-semibold">Assessment Progress</h3>
          <p className="text-muted-foreground text-sm">{getProgressLabel()}</p>
        </div>
        {getProgressBadge()}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress 
          value={progress} 
          className="h-3" 
        />
      </div>
      
      {progress === 100 && (
        <div className="text-center p-4 bg-success/10 rounded-lg border border-success/30 animate-fade-in-up">
          <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
          <p className="text-foreground font-semibold">Ready for Results!</p>
          <p className="text-muted-foreground text-sm">Your comprehensive report is available</p>
        </div>
      )}
    </div>
  );
};