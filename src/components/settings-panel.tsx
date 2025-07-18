'use client';
import { useApp } from '@/components/app-provider';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function SettingsPanel() {
  const { aiSettings, setAiSettings } = useApp();

  return (
    <div className="space-y-4">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="image-prompt" className="text-sm font-medium">
          Image Prompt
        </Label>
        <Textarea
          id="image-prompt"
          placeholder="Enter a prompt to guide image generation..."
          className="min-h-[120px] text-xs"
          value={aiSettings.imagePrompt}
          onChange={e =>
            setAiSettings(prev => ({ ...prev, imagePrompt: e.target.value }))
          }
        />
        <p className="text-xs text-muted-foreground">
          This prompt guides the visual style of each generated image.
        </p>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="narration-prompt" className="text-sm font-medium">
          Narration Prompt
        </Label>
        <Textarea
          id="narration-prompt"
          placeholder="Enter a prompt to guide narration..."
          className="min-h-[100px] text-xs"
          value={aiSettings.narrationPrompt}
          onChange={e =>
            setAiSettings(prev => ({
              ...prev,
              narrationPrompt: e.target.value,
            }))
          }
        />
        <p className="text-xs text-muted-foreground">
          This prompt sets the tone and style for the voiceover.
        </p>
      </div>
    </div>
  );
}
