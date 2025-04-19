import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "./container";

// External FAQ data
const faqData = [
  {
    id: "item-1",
    question: "How do I reset my password?",
    answer:
      "Go to Settings → Account → Password Reset. You'll receive an email with instructions.",
  },
  {
    id: "item-2",
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, PayPal, and cryptocurrency.",
  },
  {
    id: "item-3",
    question: "Is there a mobile app available?",
    answer:
      "Yes! Our iOS and Android apps are available on their respective app stores.",
  },
  {
    id: "item-4",
    question: "How can I contact customer support?",
    answer:
      "Email us at support@example.com or use the live chat feature in the app (24/7).",
  },
  {
    id: "item-5",
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer 30-day money-back guarantees for all annual subscriptions.",
  },
];

export function HomeFAQS() {
  return (
    <div className="w-full py-20">
      <Container>
        <h2 className="text-2xl text-center font-bold text-primary-text mb-12 md:mb-16 md:text-4xl">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqData.map((faq) => (
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
