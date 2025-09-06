import React, { useState, useEffect } from 'react';
import { SceneInput } from './SceneInput';
import { EraSlider } from './EraSlider';
import { ImageDisplay } from './ImageDisplay';
import { ApiKeyInput } from './ApiKeyInput';
import { useToast } from '@/hooks/use-toast';
import { generateImage, editImage } from '@/services/geminiApi';
import { ERAS } from './EraSlider';

export const TimeTravelApp: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [currentEra, setCurrentEra] = useState(4); // Start with modern era
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [modernBaseImage, setModernBaseImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored API key
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const generateScene = async (prompt: string, eraIndex: number) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Gemini API key first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const currentEraData = ERAS[eraIndex];
      
      if (eraIndex === 4) {
        // Generate modern scene first
        const modernPrompt = `${prompt}, modern street view, realistic lighting, detailed buildings, contemporary vehicles, people in modern clothing, high resolution, photorealistic`;
        
        const result = await generateImage({ prompt: modernPrompt }, apiKey);
        
        if (result.error) {
          throw new Error(result.error);
        }
        
        setModernBaseImage(result.imageUrl);
        setCurrentImage(result.imageUrl);
      } else {
        // Transform existing modern image to selected era
        if (!modernBaseImage) {
          throw new Error('Please generate a modern scene first');
        }
        
        const eraPrompt = `Transform this image to ${currentEraData.label}: ${currentEraData.description}. Maintain the same composition and layout but change vehicles, clothing, architecture, and objects to match the ${currentEraData.year} era. High resolution, photorealistic.`;
        
        const result = await editImage(modernBaseImage, eraPrompt, apiKey);
        
        if (result.error) {
          throw new Error(result.error);
        }
        
        setCurrentImage(result.imageUrl);
      }
      
      toast({
        title: "Scene Generated!",
        description: `Your scene has been created for ${currentEraData.label}.`,
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed", 
        description: error instanceof Error ? error.message : "Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    generateScene(prompt, currentEra);
  };

  const handleEraChange = (newEra: number) => {
    setCurrentEra(newEra);
    if (currentImage && prompt && modernBaseImage) {
      // Transform to new era
      generateScene(prompt, newEra);
    }
  };

  const handleRegenerate = () => {
    if (prompt) {
      generateScene(prompt, currentEra);
    }
  };

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
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
            <ApiKeyInput 
              onApiKeySet={handleApiKeySet}
              hasApiKey={!!apiKey}
            />
            
            <SceneInput
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              disabled={!apiKey}
            />
            
            <EraSlider
              currentEra={currentEra}
              onEraChange={handleEraChange}
              isGenerating={isGenerating}
              disabled={!apiKey}
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