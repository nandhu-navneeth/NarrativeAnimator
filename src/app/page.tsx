import { AppProvider } from '@/components/app-provider';
import { LayoutShell } from '@/components/layout-shell';

export default function Home() {
  return (
    <AppProvider>
      <LayoutShell />
    </AppProvider>
  );
}
