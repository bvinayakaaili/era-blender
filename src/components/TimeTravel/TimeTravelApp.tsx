import React, { useState } from 'react';
import { SceneInput } from './SceneInput';
import { EraSlider } from './EraSlider';
import { ImageDisplay } from './ImageDisplay';
import { useToast } from '@/hooks/use-toast';

export const TimeTravelApp: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [currentEra, setCurrentEra] = useState(4); // Start with modern era
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateImage = async (prompt: string, eraIndex: number) => {
    setIsGenerating(true);
    try {
      // Simulate image generation for now
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real implementation, you would:
      // 1. Generate initial modern scene
      // 2. Use image editing to transform to selected era
      // For now, we'll use a placeholder
      const mockImageUrl = `https://picsum.photos/800/500?random=${Date.now()}`;
      setCurrentImage(mockImageUrl);
      
      toast({
        title: "Image Generated!",
        description: `Your scene has been created for the ${eraIndex === 4 ? 'modern' : 'historical'} era.`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    generateImage(prompt, currentEra);
  };

  const handleEraChange = (newEra: number) => {
    setCurrentEra(newEra);
    if (currentImage && prompt) {
      // Regenerate for new era
      generateImage(prompt, newEra);
    }
  };

  const handleRegenerate = () => {
    if (prompt) {
      generateImage(prompt, currentEra);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            Time Travel Scene Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform any scene across different eras of history and into the future. 
            Watch your imagination travel through time with AI-powered image generation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <SceneInput
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
            
            <EraSlider
              currentEra={currentEra}
              onEraChange={handleEraChange}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right Column - Image Display */}
          <div className="lg:sticky lg:top-8">
            <ImageDisplay
              currentImage={currentImage}
              currentEra={currentEra}
              isGenerating={isGenerating}
              onRegenerate={handleRegenerate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};