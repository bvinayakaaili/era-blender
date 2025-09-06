import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Key, Eye, EyeOff } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet, hasApiKey }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
      localStorage.setItem('gemini_api_key', apiKey.trim());
    }
  };

  if (hasApiKey) {
    return (
      <Card className="p-4 border-accent/20">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Key className="w-4 h-4 text-primary" />
          <span>Gemini API Key configured</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              localStorage.removeItem('gemini_api_key');
              onApiKeySet('');
            }}
            className="text-xs"
          >
            Change
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Gemini API Key Required</h3>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Enter your Gemini 2.5 Flash API key to start generating time travel scenes.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Input
              type={showKey ? 'text' : 'password'}
              placeholder="Enter your Gemini API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? (
                <EyeOff className="w-3 h-3" />
              ) : (
                <Eye className="w-3 h-3" />
              )}
            </Button>
          </div>
          
          <Button type="submit" disabled={!apiKey.trim()} className="w-full">
            Set API Key
          </Button>
        </form>
        
        <div className="text-xs text-muted-foreground">
          <p>Get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></p>
          <p className="mt-1">Your key is stored locally in your browser and never sent to our servers.</p>
        </div>
      </div>
    </Card>
  );
};