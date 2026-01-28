import React from "react";

import { Navigation } from "@/components/Navigation";

import { FAQ } from "./_components/FAQ";
import { HeroHeader } from "./_components/HeroHeader";
import { OurStory } from "./_components/OurStory";
import { ReserveConfirm } from "./_components/ReserveConfirm";
import { WeddingDetails } from "./_components/WeddingDetails";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        <HeroHeader />
        <OurStory />
        <WeddingDetails />
        <ReserveConfirm />
        <FAQ />
      </main>
    </div>
  );
};
