'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarSeparator,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from '@/components/ui/sidebar';
import { SettingsPanel } from '@/components/settings-panel';
import { AudioSelection } from '@/components/audio-selection';
import { Button } from '@/components/ui/button';
import { Film, Clapperboard, Music, Settings } from 'lucide-react';
import { StoryInput } from '@/components/story-input';
import { Storyboard } from '@/components/storyboard';
import { Separator } from '@/components/ui/separator';

function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-xl md:text-2xl font-bold font-headline">My Storyboard</h1>
        <p className="text-sm text-muted-foreground">
          Bring your narrative to life, one scene at a time.
        </p>
      </div>
    </header>
  );
}

export function LayoutShell() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background font-body text-foreground">
        <Sidebar side="left" collapsible="icon">
          <SidebarHeader className="items-center border-b p-2 h-20">
            <div className="flex items-center gap-2">
              <Clapperboard className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl font-headline">
                Narrative Animator
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-0">
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2 p-2 pt-2">
                <Settings className="h-5 w-5" />
                AI Settings
              </SidebarGroupLabel>
              <SidebarGroupContent className="p-2 pt-0">
                <SettingsPanel />
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2 p-2 pt-2">
                <Music className="h-5 w-5" />
                Background Music
              </SidebarGroupLabel>
              <SidebarGroupContent className="p-2 pt-0">
                <AudioSelection />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-2 border-t">
            <Button className="w-full" disabled>
              <Film className="mr-2 h-4 w-4" />
              <span>Render Movie</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <AppHeader />
          <main className="flex flex-1 flex-col gap-8 p-4 md:p-8">
            <StoryInput />
            <Separator />
            <Storyboard />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
