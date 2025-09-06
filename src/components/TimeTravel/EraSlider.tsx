import React from 'react';
import { Card } from '@/components/ui/card';

export interface Era {
  year: number;
  label: string;
  description: string;
  index: number;
}

const ERAS: Era[] = [
  { year: 1900, label: "1900s", description: "Horse carriages, cobblestone streets", index: 0 },
  { year: 1910, label: "1910s", description: "Early automobiles, street lamps", index: 1 },
  { year: 1920, label: "1920s", description: "Classic cars, mid-century buildings", index: 2 },
  { year: 1950, label: "1950s", description: "Vintage cars, mid-century architecture", index: 3 },
  { year: 2025, label: "Modern", description: "Present day realistic scene", index: 4 },
  { year: 2050, label: "2050s", description: "Flying cars, futuristic skyscrapers", index: 5 },
];

interface EraSliderProps {
  currentEra: number;
  onEraChange: (eraIndex: number) => void;
  isGenerating?: boolean;
  disabled?: boolean;
}

export const EraSlider: React.FC<EraSliderProps> = ({ 
  currentEra, 
  onEraChange, 
  isGenerating = false,
  disabled = false
}) => {
  return (
    <Card className="p-6 time-machine-glow">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-primary mb-2">Time Machine</h3>
          <p className="text-muted-foreground">Slide through history and into the future</p>
        </div>
        
        {/* Timeline Slider */}
        <div className="relative">
          <div className="timeline-slider">
            <input
              type="range"
              min="0"
              max="5"
              value={currentEra}
              onChange={(e) => onEraChange(parseInt(e.target.value))}
              disabled={isGenerating || disabled}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            
            {/* Slider thumb indicator */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full shadow-lg border-2 border-background transition-all duration-300"
              style={{ left: `calc(${(currentEra / 5) * 100}% - 12px)` }}
            >
              <div className="absolute inset-1 bg-accent rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Era markers */}
          <div className="flex justify-between mt-4">
            {ERAS.map((era, index) => (
              <div key={era.year} className="flex flex-col items-center">
                <button
                  onClick={() => onEraChange(index)}
                  disabled={isGenerating || disabled}
                  className={`era-button ${currentEra === index ? 'active' : ''}`}
                >
                  {era.label}
                </button>
                <span className="text-xs text-muted-foreground mt-1 max-w-20 text-center leading-tight">
                  {era.description}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Current Era Display */}
        <div className="text-center p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="text-2xl font-bold text-primary mb-1">
            {ERAS[currentEra].year}
          </div>
          <div className="text-sm text-foreground">
            {ERAS[currentEra].description}
          </div>
        </div>
      </div>
    </Card>
  );
};

export { ERAS };