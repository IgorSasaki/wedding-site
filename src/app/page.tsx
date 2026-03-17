"use client";

import { Navigation } from "@/components/Navigation";
import { FAQ } from "@/components/FAQ";
import { GiftsSection } from "@/components/Gifts";
import { HeroHeader } from "@/components/HeroHeader";
import { Messages } from "@/components/Messages";
import { OurStory } from "@/components/OurStory";
import { ReserveConfirm } from "@/components/ReserveConfirm";
import { WeddingDetails } from "@/components/WeddingDetails";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        <HeroHeader />
        <OurStory />
        <WeddingDetails />
        <GiftsSection />
        <Messages />
        <ReserveConfirm />
        <FAQ />
      </main>
    </div>
  );
}
