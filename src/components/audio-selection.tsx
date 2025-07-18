'use client';
import { useApp } from '@/components/app-provider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Music2 } from 'lucide-react';

const musicOptions = [
  { id: 'epic-cinematic', name: 'Epic Cinematic Score' },
  { id: 'light-and-happy', name: 'Light & Happy Ukulele' },
  { id: 'mysterious-ambient', name: 'Mysterious Ambience' },
  { id: 'lofi-hip-hop', name: 'Lofi Hip Hop Beats' },
  { id: 'no-music', name: 'No Music' },
];

export function AudioSelection() {
  const { selectedMusic, setSelectedMusic } = useApp();

  return (
    <RadioGroup value={selectedMusic} onValueChange={setSelectedMusic}>
      <Label className="text-sm font-medium">Select a track</Label>
      <div className="space-y-3 pt-2">
        {musicOptions.map(option => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label
              htmlFor={option.id}
              className="font-normal flex items-center gap-2 cursor-pointer"
            >
              <Music2 className="h-4 w-4 text-muted-foreground" />
              {option.name}
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
