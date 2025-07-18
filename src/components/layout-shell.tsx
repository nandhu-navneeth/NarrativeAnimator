'use client';
import { StoryInput } from '@/components/story-input';
import { Storyboard } from '@/components/storyboard';
import { Separator } from '@/components/ui/separator';
import { Clapperboard } from 'lucide-react';
import { SettingsPanel } from '@/components/settings-panel';
import { AudioSelection } from '@/components/audio-selection';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

function AppHeader() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background/95 px-4 md:px-6 shrink-0 backdrop-blur-sm">
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
      <ResizablePanelGroup direction="horizontal" className="flex-1 w-full">
        <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
          <div className="flex flex-col h-full overflow-y-auto">
            <main className="flex-1 flex flex-col gap-6 p-4 md:p-6">
              <StoryInput />
              <Separator />
              <SettingsPanel />
              <Separator />
              <AudioSelection />
            </main>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65}>
          <div className="flex flex-col h-full">
            <main className="flex-1 flex flex-col gap-6 p-4 md:p-6 overflow-y-auto">
              <h2 className="text-xl md:text-2xl font-bold font-headline text-center">
                Storyboard
              </h2>
              <Storyboard />
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
