import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "./container";
import { homeDetails } from "@/data/homeDetails";

export function HomeFAQS() {
  return (
    <div className="w-full py-20">
      <Container>
        <h2 className="text-2xl text-center font-bold text-primary-text mb-12 md:mb-16 md:text-4xl">
          <span className="text-primary-red">Frequently </span>Asked Questions
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-screen-md mx-auto space-y-4"
        >
          {homeDetails.faqs?.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-black rounded-lg overflow-hidden bg-white"
            >
              <AccordionTrigger className="px-4 py-3 transition-colors text-primary-text">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 bg-white text-primary-text">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}
