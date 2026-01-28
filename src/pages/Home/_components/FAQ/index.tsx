import FAQItem from "@/components/FAQItem"
import { SectionTitle } from "@/components/SectionTitle"
import { Accordion } from "@/components/ui/accordion"
import { FAQ_CONFIG, FAQ_SECTION_CONFIG } from "@/config/faqConfig"

export const FAQ = () => {
  return (
    <section id="faq" className="section">
      <div className="section-container">
        <SectionTitle
          title={FAQ_SECTION_CONFIG.title}
          subtitle={FAQ_SECTION_CONFIG.subtitle}
        />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-0">
            {FAQ_CONFIG.map((item) => (
              <FAQItem key={item.id} item={item} />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}