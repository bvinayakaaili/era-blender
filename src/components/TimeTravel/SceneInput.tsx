import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';

interface SceneInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export const SceneInput: React.FC<SceneInputProps> = ({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  disabled = false
}) => {
  const examplePrompts = [
    "A busy city street with tall buildings",
    "A peaceful suburban neighborhood", 
    "A marketplace with vendors and shops",
    "A university campus with students",
    "A industrial district with factories"
  ];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6" />
            Scene Generator
          </h2>
          <p className="text-muted-foreground">
            Describe a scene and watch it transform through time
          </p>
        </div>
        
        <div className="space-y-3">
          <label htmlFor="scene-prompt" className="text-sm font-medium text-foreground">
            Describe your scene:
          </label>
          <Textarea
            id="scene-prompt"
            placeholder="A bustling street with people walking, cars driving, and shops on both sides..."
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            className="min-h-[100px] resize-none"
            disabled={isGenerating || disabled}
          />
        </div>
        
        {/* Example prompts */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Quick examples:
          </label>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onPromptChange(example)}
                disabled={isGenerating || disabled}
                className="text-xs"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
        
        <Button
          onClick={onGenerate}
          disabled={isGenerating || !prompt.trim() || disabled}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Scene...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Time Travel Scene
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};