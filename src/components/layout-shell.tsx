'use client';
import { StoryInput } from '@/components/story-input';
import { Storyboard } from '@/components/storyboard';
import { Separator } from '@/components/ui/separator';
import { Clapperboard } from 'lucide-react';

function AppHeader() {
  return (
    <header className="flex h-20 items-center gap-4 border-b bg-background/80 px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-2">
        <Clapperboard className="h-7 w-7 text-primary" />
        <span className="font-bold text-xl font-headline">
          Narrative Animator
        </span>
      </div>
    </header>
  );
}

export function LayoutShell() {
  return (
    <div className="flex flex-col h-screen bg-background font-body text-foreground">
      <AppHeader />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-px bg-border overflow-hidden">
        <div className="flex flex-col bg-background">
          <main className="flex-1 flex flex-col gap-8 p-4 md:p-8 overflow-y-auto">
            <StoryInput />
          </main>
        </div>
        <div className="flex flex-col bg-background">
          <main className="flex-1 flex flex-col gap-8 p-4 md:p-8 overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-bold font-headline text-center">Storyboard</h2>
            <Storyboard />
          </main>
        </div>
      </div>
    </div>
  );
}
