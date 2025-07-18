'use client';

import { useApp } from '@/components/app-provider';
import { StoryboardItem } from '@/components/storyboard-item';

export function Storyboard() {
  const { scenes } = useApp();

  if (scenes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 p-12 text-center h-64">
        <h3 className="text-xl font-semibold font-headline">
          Your storyboard is empty
        </h3>
        <p className="mt-2 text-muted-foreground">
          Start by typing your story above. Scenes will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      {scenes.map((scene, index) => (
        <StoryboardItem key={scene.id} scene={scene} index={index} />
      ))}
    </div>
  );
}
