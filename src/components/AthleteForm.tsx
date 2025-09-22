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
          <Label htmlFor="name" className="text-white">Full Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age" className="text-white">Age</Label>
          <Input
            id="age"
            type="number"
            value={data.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="Age"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="height" className="text-white">Height</Label>
          <Input
            id="height"
            value={data.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            placeholder="e.g., 6'2&quot;"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-white">Weight</Label>
          <Input
            id="weight"
            value={data.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            placeholder="e.g., 180 lbs"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sport" className="text-white">Primary Sport</Label>
        <Select value={data.sport} onValueChange={(value) => handleInputChange('sport', value)}>
          <SelectTrigger className="bg-white/10 border-white/30 text-white">
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
        className="w-full bg-gradient-secondary hover:shadow-secondary text-lg py-6"
      >
        <Play className="h-5 w-5 mr-2" />
        Start Assessment
      </Button>
    </div>
  );
};