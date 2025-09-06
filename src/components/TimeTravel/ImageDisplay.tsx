import React from 'react';
import { Card } from '@/components/ui/card';
import { Loader2, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ERAS } from './EraSlider';

interface ImageDisplayProps {
  currentImage: string | null;
  currentEra: number;
  isGenerating: boolean;
  onRegenerate?: () => void;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  currentImage,
  currentEra,
  isGenerating,
  onRegenerate
}) => {
  const currentEraData = ERAS[currentEra];

  const handleDownload = () => {
    if (!currentImage) return;
    
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `scene-${currentEraData.year}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Your Scene in {currentEraData.label}
          </h3>
          {currentImage && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onRegenerate}
                disabled={isGenerating}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Regenerate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          )}
        </div>
        
        <div className="image-container aspect-[16/10] flex items-center justify-center min-h-[400px]">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <Loader2 className="w-16 h-16 animate-spin text-primary" />
                <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-accent/30 animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-primary">
                  Traveling through time...
                </p>
                <p className="text-sm text-muted-foreground">
                  Generating your scene in {currentEraData.label}
                </p>
              </div>
            </div>
          ) : currentImage ? (
            <div className="relative w-full h-full group">
              <img
                src={currentImage}
                alt={`Scene in ${currentEraData.label}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-white font-medium">{currentEraData.label}</p>
                  <p className="text-white/80 text-sm">{currentEraData.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <RotateCcw className="w-12 h-12 text-primary/60" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-muted-foreground">
                  Ready for time travel
                </p>
                <p className="text-sm text-muted-foreground">
                  Enter a scene description and generate your first image
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};