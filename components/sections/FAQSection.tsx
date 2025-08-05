"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

const faqs = [
  {
    question: "What is ADmyBRAND AI Suite?",
    answer:
      "ADmyBRAND AI Suite is an all-in-one AI-powered marketing platform that helps automate, optimize, and analyze your campaigns for better results.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! You can get started with a free trial and explore all the features before committing to a plan.",
  },
  {
    question: "Can I integrate with my existing tools?",
    answer:
      "Absolutely. ADmyBRAND AI Suite offers seamless integrations with popular marketing and analytics tools.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We use industry-leading security practices to ensure your data is safe and protected at all times.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      data-aos="fade-up"
      className="py-24 bg-gradient-to-br from-blue-100 via-blue-50 to-white min-h-[80vh] px-4"
    >
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-blue-800 tracking-tight drop-shadow-md">
          Frequently Asked <span className="text-blue-500">Questions</span>
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <Accordion
          type="single"
          collapsible
          className="space-y-4 bg-white/70 backdrop-blur-xl rounded-2xl border border-blue-100 shadow-lg p-1"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              className="transition-transform"
            >
              <AccordionTrigger className="text-xl font-semibold text-gray-800 px-6 py-5 flex justify-between items-center">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 px-6 pb-5 leading-relaxed text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
