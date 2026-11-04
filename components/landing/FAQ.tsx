"use client";

import { useState } from "react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#050505] py-24 text-[#F5F3EE]"
    >
      {/* Subtle Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
        {/* Top Heading Section */}
        <div className="mb-12 text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#19C8EE]">
            QUESTIONS
          </p>

          <h2 className="font-serif text-4xl leading-[1.15] tracking-tight text-white md:text-5xl lg:text-[56px]">
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-xl border bg-[#0A0A0A] transition-all duration-300 ${
                  isOpen ? "border-white/20" : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <p className="pr-4 text-base font-semibold text-white">{faq.q}</p>

                  <div
                    className={`shrink-0 text-[#19C8EE] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    <PlusIcon />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-sm leading-7 text-white/60 md:text-base">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// FAQ Data
const faqsData = [
  {
    q: "Do I need any prior trading experience?",
    a: "No. Phase 01 starts from currency-pair basics and pip mechanics — most students join with zero forex background.",
  },
  {
    q: "Is the class live, recorded, or both?",
    a: "Sessions run live online, with recordings available afterward so you can revisit any phase at your own pace.",
  },
  {
    q: "Will NEXORAX give me trade signals or tips?",
    a: "No. NEXORAX is education only. We teach you to read the market and build your own process — never trade calls or signals.",
  },
  {
    q: "What pairs and markets are covered?",
    a: "Major and minor forex pairs, plus gold and key commodities — the instruments most active retail traders actually watch.",
  },
  {
    q: "How much time should I set aside each week?",
    a: "Most students set aside 3–5 hours a week across live sessions, chart practice, and the applied lab in Phase 06.",
  },
];

// Plus Icon
function PlusIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
