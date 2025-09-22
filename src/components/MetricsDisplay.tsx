import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Target, AlertCircle } from "lucide-react";

interface MetricsDisplayProps {
  title: string;
  metrics: {
    [key: string]: any;
    recommendations: string[];
    badge: string;
  };
  color: 'primary' | 'secondary' | 'success';
}

export const MetricsDisplay = ({ title, metrics, color }: MetricsDisplayProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'border-primary/30 bg-primary/10';
      case 'secondary':
        return 'border-secondary/30 bg-secondary/10';
      case 'success':
        return 'border-success/30 bg-success/10';
    }
  };

  const getBadgeColor = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-secondary';
      case 'success':
        return 'bg-success';
    }
  };

  const renderMetricValue = (key: string, value: any) => {
    if (key === 'recommendations' || key === 'badge') return null;
    
    if (typeof value === 'number' && key.toLowerCase().includes('score')) {
      return (
        <div key={key} className="space-y-2">
          <div className="flex justify-between">
            <span className="text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            <span className="text-white font-semibold">{value}%</span>
          </div>
          <Progress value={value} className="h-2" />
        </div>
      );
    }
    
    return (
      <div key={key} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
        <span className="text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
        <span className="text-white font-semibold">
          {typeof value === 'number' ? 
            (key.toLowerCase().includes('height') ? `${value}"` : value) : 
            value
          }
        </span>
      </div>
    );
  };

  return (
    <Card className={`bg-white/10 backdrop-blur border-white/20 shadow-card ${getColorClasses()}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5" />
            {title}
          </CardTitle>
          <Badge className={`${getBadgeColor()} animate-badge-bounce`}>
            <Award className="h-3 w-3 mr-1" />
            {metrics.badge}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Metrics Values */}
        <div className="space-y-4">
          {Object.entries(metrics).map(([key, value]) => renderMetricValue(key, value))}
        </div>
        
        {/* AI Recommendations */}
        {metrics.recommendations && metrics.recommendations.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              AI Recommendations
            </h4>
            <div className="space-y-2">
              {metrics.recommendations.map((recommendation, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};