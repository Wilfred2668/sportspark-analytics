import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Download, Maximize, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  onDownload: () => void;
}

export const VideoPlayer = ({ title, onDownload }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Mock video data - replace with actual video URL from backend
  const mockVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <Card className="bg-white/10 backdrop-blur border-white/20 shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Play className="h-5 w-5" />
            {title}
          </CardTitle>
          <Badge className="bg-success">
            AI Analyzed
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Video Player */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video
            className="w-full h-full object-cover"
            poster="/placeholder.svg?height=300&width=500"
            controls
            muted={isMuted}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={mockVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay indicators */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-primary/80 backdrop-blur">
              HD Quality
            </Badge>
            <Badge className="bg-warning/80 backdrop-blur">
              AI Enhanced
            </Badge>
          </div>
        </div>
        
        {/* Video Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Analysis overlay active
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-white border-white/30 hover:bg-white/10"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="text-white border-white/30 hover:bg-white/10"
            >
              <Maximize className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={onDownload}
              size="sm"
              className="bg-gradient-secondary hover:shadow-secondary"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        
        {/* Analysis Highlights */}
        <div className="space-y-2">
          <h4 className="text-white font-semibold text-sm">Analysis Highlights</h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-primary/20 p-2 rounded text-center">
              <div className="text-white font-semibold">15</div>
              <div className="text-white/70">Key Points</div>
            </div>
            <div className="bg-secondary/20 p-2 rounded text-center">
              <div className="text-white font-semibold">92%</div>
              <div className="text-white/70">Accuracy</div>
            </div>
            <div className="bg-success/20 p-2 rounded text-center">
              <div className="text-white font-semibold">A+</div>
              <div className="text-white/70">Grade</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};