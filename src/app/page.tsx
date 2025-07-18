import { AppProvider } from '@/components/app-provider';
import { LayoutShell } from '@/components/layout-shell';
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <AppProvider>
      <LayoutShell />
      <Toaster />
    </AppProvider>
  );
}
