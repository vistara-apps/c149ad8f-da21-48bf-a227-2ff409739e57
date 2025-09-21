import { AppShell } from '@/components/AppShell';
import { HeroSection } from '@/components/HeroSection';
import { IdeaGenerator } from '@/components/IdeaGenerator';
import { CommunitySection } from '@/components/CommunitySection';

export default function HomePage() {
  return (
    <AppShell>
      <div className="min-h-screen">
        <HeroSection />
        <IdeaGenerator />
        <CommunitySection />
      </div>
    </AppShell>
  );
}
