import FAQItem from "@/components/FAQItem";
import { SectionTitle } from "@/components/SectionTitle";
import { Accordion } from "@/components/ui/accordion";
import { FAQ_CONFIG, FAQ_SECTION_CONFIG } from "@/config/faqConfig";

export const FAQ = () => {
  return (
    <section className="section" id="faq">
      <div className="section-container">
        <SectionTitle
          subtitle={FAQ_SECTION_CONFIG.subtitle}
          title={FAQ_SECTION_CONFIG.title}
        />

        <div className="max-w-3xl mx-auto">
          <Accordion className="space-y-0" type="single" collapsible>
            {FAQ_CONFIG.map((item) => (
              <FAQItem item={item} key={item.id} />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
