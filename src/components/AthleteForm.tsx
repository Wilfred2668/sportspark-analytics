import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play } from "lucide-react";

interface AthleteData {
  name: string;
  age: string;
  height: string;
  weight: string;
  sport: string;
}

interface AthleteFormProps {
  data: AthleteData;
  onChange: (data: AthleteData) => void;
  onSubmit: () => void;
}

export const AthleteForm = ({ data, onChange, onSubmit }: AthleteFormProps) => {
  const sports = [
    "Basketball",
    "Football", 
    "Soccer",
    "Tennis",
    "Track & Field",
    "Baseball",
    "Volleyball",
    "Other"
  ];

  const handleInputChange = (field: keyof AthleteData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const isFormValid = data.name && data.age && data.height && data.weight && data.sport;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">Full Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age" className="text-foreground">Age</Label>
          <Input
            id="age"
            type="number"
            value={data.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="Age"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="height" className="text-foreground">Height</Label>
          <Input
            id="height"
            value={data.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            placeholder="e.g., 6'2&quot;"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-foreground">Weight</Label>
          <Input
            id="weight"
            value={data.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            placeholder="e.g., 180 lbs"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sport" className="text-foreground">Primary Sport</Label>
        <Select value={data.sport} onValueChange={(value) => handleInputChange('sport', value)}>
          <SelectTrigger className="bg-background border-border text-foreground">
            <SelectValue placeholder="Select your primary sport" />
          </SelectTrigger>
          <SelectContent>
            {sports.map((sport) => (
              <SelectItem key={sport} value={sport}>
                {sport}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={onSubmit}
        disabled={!isFormValid}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
      >
        <Play className="h-5 w-5 mr-2" />
        Start Assessment
      </Button>
    </div>
  );
};