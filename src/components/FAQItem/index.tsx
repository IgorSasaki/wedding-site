import { FAQItem as FAQItemType } from "@/config/faqConfig";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItemProps {
  item: FAQItemType;
}

const FAQItem = ({ item }: FAQItemProps) => {
  return (
    <AccordionItem 
      value={item.id} 
      className="border border-border/50 rounded-xl px-4 md:px-6 mb-3 bg-white/50 backdrop-blur-sm data-[state=open]:shadow-soft transition-all"
    >
      <AccordionTrigger className="text-left hover:no-underline py-4 md:py-5">
        <span className="font-serif text-base md:text-lg text-primary pr-4">
          {item.question}
        </span>
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground pb-4 md:pb-5 leading-relaxed">
        {item.answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
