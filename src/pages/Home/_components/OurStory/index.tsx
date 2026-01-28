import { SectionTitle } from "@/components/SectionTitle";
import { TimelineItem } from "@/components/TimelineItem";
import { TIMELINE_CONFIG } from "@/config/timelineConfig";

export const OurStory = () => {
  return (
    <section id="historia" className="section gradient-bg">
      <div className="section-container">
        <SectionTitle
          title="Nossa História"
          subtitle="Cada momento nos trouxe até aqui"
        />

        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          {TIMELINE_CONFIG.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              index={index}
              isLast={index === TIMELINE_CONFIG.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}