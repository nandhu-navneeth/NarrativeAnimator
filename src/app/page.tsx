import { AppProvider } from '@/components/app-provider';
import { LayoutShell } from '@/components/layout-shell';
import { MoviePlayer } from '@/components/movie-player';
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <AppProvider>
      <LayoutShell />
      <MoviePlayer />
      <Toaster />
    </AppProvider>
  );
}
