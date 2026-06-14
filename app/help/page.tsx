"use client";

import Reveal from "@/components/Reveal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How does the booking process work?",
    a: "Select your dates and guests on the listing page and click 'Reserve'. Since all properties are instantly bookable, your reservation is confirmed immediately upon payment.",
  },
  {
    q: "Are there really no guest service fees?",
    a: "Yes. Unlike other major platforms that charge up to 15% in guest service fees, the price you see on Hearth & Key is the price you pay.",
  },
  {
    q: "How do I get the 'Field Notes' from my host?",
    a: "Once your booking is confirmed, you'll receive an email with your host's personal field notes—their curated guide to the best local bakeries, hidden coves, and table reservations.",
  },
  {
    q: "What if I need to cancel my reservation?",
    a: "Our hosts choose between Flexible, Moderate, and Strict cancellation policies. You can view the specific policy for any home on its listing page before you book.",
  },
];

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-5 py-32 md:px-12 bg-cream-2 min-h-screen">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-16 text-center">
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.015em]">
            How can we <em className="text-clay">help?</em>
          </h1>
          <p className="mt-6 font-light text-ink-soft text-lg">
            Browse our frequently asked questions or contact our support team.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="rounded-3xl border hairline bg-white p-6 md:p-10 shadow-sm">
            {faqs.map((faq, i) => (
              <div key={i} className={`border-b hairline last:border-0 ${i === 0 ? "pt-0" : "pt-6"} pb-6 last:pb-0`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between text-left focus:outline-none group"
                >
                  <h3 className="font-serif text-xl font-medium group-hover:text-clay transition-colors pr-6">
                    {faq.q}
                  </h3>
                  <span className="text-clay text-2xl font-light">
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 font-light text-ink-soft leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
