import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Play, CheckCircle2, Loader2, LucideIcon } from "lucide-react";

interface VideoUploadCardProps {
  title: string;
  description: string;
  status: 'pending' | 'uploading' | 'analyzing' | 'completed';
  progress: number;
  onUpload: (file: File) => void;
  icon: LucideIcon;
}

export const VideoUploadCard = ({ 
  title, 
  description, 
  status, 
  progress, 
  onUpload,
  icon: Icon 
}: VideoUploadCardProps) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      onUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-white/70 border-white/30">Ready to Upload</Badge>;
      case 'uploading':
        return <Badge variant="secondary" className="animate-pulse">Uploading...</Badge>;
      case 'analyzing':
        return <Badge variant="secondary" className="animate-pulse">Analyzing...</Badge>;
      case 'completed':
        return <Badge className="bg-success animate-badge-bounce"><CheckCircle2 className="h-3 w-3 mr-1" />Complete</Badge>;
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'pending':
        return (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Upload Video
          </>
        );
      case 'uploading':
        return (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Uploading...
          </>
        );
      case 'analyzing':
        return (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Analyzing...
          </>
        );
      case 'completed':
        return (
          <>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Analysis Complete
          </>
        );
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur border-white/20 shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-warning" />
            <div>
              <CardTitle className="text-white">{title}</CardTitle>
              <p className="text-white/70 text-sm">{description}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragOver 
              ? 'border-primary bg-primary/10' 
              : 'border-white/30 hover:border-white/50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
        >
          {status === 'completed' ? (
            <div className="space-y-2">
              <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
              <p className="text-white font-medium">Video processed successfully!</p>
              <p className="text-white/70 text-sm">Analysis complete with AI insights</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Play className="h-12 w-12 text-white/50 mx-auto" />
              <div className="space-y-2">
                <p className="text-white font-medium">
                  Drop your video here or click to browse
                </p>
                <p className="text-white/70 text-sm">
                  Supports MP4, MOV, AVI files up to 100MB
                </p>
              </div>
              
              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={status !== 'pending'}
                className="bg-gradient-primary hover:shadow-primary"
              >
                {getButtonContent()}
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {(status === 'uploading' || status === 'analyzing') && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">
                {status === 'uploading' ? 'Uploading...' : 'Analyzing...'}
              </span>
              <span className="text-white">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};