'use client';
import { StoryInput } from '@/components/story-input';
import { Storyboard } from '@/components/storyboard';
import { Separator } from '@/components/ui/separator';
import { Clapperboard, Film, SlidersHorizontal } from 'lucide-react';
import { SettingsPanel } from '@/components/settings-panel';
import { AudioSelection } from '@/components/audio-selection';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useApp } from './app-provider';
import { Button } from './ui/button';

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
  const { scenes, startMovie } = useApp();
  const areScenesGenerated = scenes.every(s => s.imageUrl && s.narrationUrl);

  return (
    <div className="flex flex-col h-screen bg-background font-body text-foreground">
      <AppHeader />
      <ResizablePanelGroup direction="horizontal" className="flex-1 w-full">
        <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
          <div className="flex flex-col h-full overflow-y-auto">
            <main className="flex-1 flex flex-col gap-6 p-4 md:p-6">
              <StoryInput />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Advanced Settings
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    <SettingsPanel />
                    <Separator />
                    <AudioSelection />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </main>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65}>
          <div className="flex flex-col h-full">
            <main className="flex-1 flex flex-col gap-6 p-4 md:p-6 overflow-y-auto">
              <div className="flex justify-center items-center relative">
                <h2 className="text-xl md:text-2xl font-bold font-headline text-center">
                  Storyboard
                </h2>
                {scenes.length > 0 && areScenesGenerated && (
                   <Button onClick={startMovie} size="sm" className="absolute right-0">
                     <Film className="mr-2"/>
                     Play Full Story
                   </Button>
                )}
              </div>
              <Storyboard />
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
