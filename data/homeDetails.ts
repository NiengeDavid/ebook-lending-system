import { Book } from "@/types";
import { title } from "process";

export const homeDetails = {
  pageMetadata: {
    title: "Home | MIU E-Library",
    description: "Welcome to MIUN e-book Lending System.",
  },
  hero: {
    title: "MIU’s E-Library System",
    desc: " Borderless learning just got possible with MIU's robust E-Library system. Whether you hail from the Sciences, Art, or Tech, you can learn at your convenience, borrow, lend, and study 24/7. START NOW!",
  },
  bookCta: {
    link: {
      title: "Browse our collection",
      lnk: "/search",
    },
    img: {
      bkk1: "/books/one-dark-window.png",
      bkk2: "/books/llm-app.png",
      bkk3: "/books/deepseek.png",
    },
  },
  faqs: [
    {
      id: "item-1",
      question: "How Do I Access Digital Books?",
      answer:
        "Accessing our digital library is seamless. Simply log in to your account using our secure multi-factor authentication process, browse our extensive collection, and choose the books you wish to borrow.",
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
  ],
};
