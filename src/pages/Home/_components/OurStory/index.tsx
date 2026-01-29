import { SectionTitle } from "@/components/SectionTitle";
import { TimelineItem } from "@/components/TimelineItem";
import { TIMELINE_CONFIG } from "@/config/timelineConfig";

export const OurStory = () => {
  return (
    <section className="section gradient-bg" id="historia">
      <div className="section-container">
        <SectionTitle
          subtitle="Cada momento nos trouxe até aqui"
          title="Nossa História"
        />

        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          {TIMELINE_CONFIG.map((event, index) => (
            <TimelineItem
              event={event}
              index={index}
              isLast={index === TIMELINE_CONFIG.length - 1}
              key={event.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
