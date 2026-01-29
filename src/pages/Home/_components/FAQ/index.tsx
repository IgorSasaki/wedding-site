import { FadeSection } from "@/components/animations/FadeSection";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { STAGGER_VARIANT_ITEMS } from "@/components/animations/StaggerContainer/data";
import FAQItem from "@/components/FAQItem";
import { SectionTitle } from "@/components/SectionTitle";
import { Accordion } from "@/components/ui/accordion";
import { FAQ_CONFIG, FAQ_SECTION_CONFIG } from "@/config/faqConfig";

export const FAQ = () => {
  return (
    <section className="section" id="faq">
      <div className="section-container">
        <FadeSection>
          <SectionTitle
            subtitle={FAQ_SECTION_CONFIG.subtitle}
            title={FAQ_SECTION_CONFIG.title}
          />
        </FadeSection>

        <FadeSection delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <Accordion className="space-y-0" type="single" collapsible>
              <StaggerContainer staggerDelay={0.1}>
                {FAQ_CONFIG.map((item) => (
                  <StaggerItem key={item.id} variants={STAGGER_VARIANT_ITEMS}>
                    <FAQItem item={item} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Accordion>
          </div>
        </FadeSection>
      </div>
    </section>
  );
};
