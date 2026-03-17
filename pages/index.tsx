import type { NextPage } from "next";

import { Navigation } from "@/components/Navigation";
import { FAQ } from "../src/pages/Home/_components/FAQ";
import { GiftsSection } from "../src/pages/Home/_components/Gifts";
import { HeroHeader } from "../src/pages/Home/_components/HeroHeader";
import { Messages } from "../src/pages/Home/_components/Messages";
import { OurStory } from "../src/pages/Home/_components/OurStory";
import { ReserveConfirm } from "../src/pages/Home/_components/ReserveConfirm";
import { WeddingDetails } from "../src/pages/Home/_components/WeddingDetails";

const HomePage: NextPage = () => {
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
};

export default HomePage;
