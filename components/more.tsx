"use client";
import { Btn, Mark, Reveal } from "./ui";
import { FloatingCandles, Skyline } from "./visuals";
import Image from "next/image";

export const FinalCTA = () => (
  <section
    id="contact"
    className="relative overflow-hidden bg-gradient-to-b from-[#2a1260] to-[#07040f] px-5 pb-48 pt-28 text-center"
  >
    <Mark className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]" />
    <FloatingCandles className="absolute bottom-24 left-8 hidden md:flex" />
    <FloatingCandles className="absolute bottom-24 right-8 hidden flex-row-reverse md:flex" />
    <Reveal className="relative mx-auto max-w-3xl">
      <h2 className="text-4xl font-extrabold text-white md:text-6xl">
        Be part of the future of financial technology.
      </h2>
      <p className="mt-5 text-lg text-[#ddd6ee]">
        Whether you are interested in Forex education, crypto markets,
        AI-powered trading tools or professionally supervised fund management,
        Nexorax is building an ecosystem around knowledge, technology and
        strategic thinking.
      </p>
      <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
        <Btn href="mailto:hello@nexorax.com">Contact Us</Btn>
        <a
          href="#education"
          className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-[#D6A84F]"
        >
          Start Learning
        </a>
      </div>
      <p className="mt-8 font-bold tracking-wide text-[#D6A84F]">
        Think Smarter. Trade Smarter. Evolve Further.
      </p>
    </Reveal>
    <Skyline className="absolute inset-x-0 bottom-0 h-40 w-full" />
  </section>
);

const cols: Record<string, string[]> = {
  Company: ["About", "Roadmap", "Contact"],
  Services: ["Fund Management", "Education"],
  "Nexora Tools": [
    "Engine",
    "Arbitrage",
    "AI Signals",
    "AI Bots",
    "AI Power Tools",
  ],
  Legal: ["Terms", "Privacy", "Risk Disclosure"],
};

export const Footer = () => (
  <footer className="border-t border-line bg-bg2 px-5 py-14">
    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-5">
      <div>
        <a
          href="#"
          className="flex items-center gap-2 text-xl font-extrabold text-fg"
        >
          {/* 🟢 LIGHT mode logo */}
          <Image
            src="/Nexorax-Purple-Gold-Ribbon-Logo.png"
            alt="Nexorax logo"
            width={160}
            height={40}
            className="h-8 w-auto object-contain dark:hidden sm:h-10"
            priority
          />

          {/* 🌙 DARK mode logo */}
          <Image
            src="/Nexorax-Purple-and-Gold-Ribbon-Logo.png"
            alt="Nexorax logo"
            width={160}
            height={40}
            className="hidden h-8 w-auto object-contain dark:block sm:h-10"
            priority
          />
        </a>
        <p className="mt-2 text-sm text-muted">
          Empowering financial growth through knowledge, technology & strategy.
        </p>
      </div>
      {Object.entries(cols).map(([h, l]) => (
        <nav key={h} aria-label={h}>
          <h3 className="mb-3 font-bold text-fg">{h}</h3>
          {l.map((x) => (
            <a
              key={x}
              href="#"
              className="block py-1 text-sm text-muted hover:text-goldtext"
            >
              {x}
            </a>
          ))}
        </nav>
      ))}
    </div>
    <div className="mx-auto mt-12 max-w-7xl border-t border-line pt-6 text-xs leading-relaxed text-muted">
      <p>© 2026 NEXORAX. All rights reserved.</p>
      <p className="mt-2">
        <b>Risk Disclosure & Disclaimer:</b> Forex and cryptocurrency trading
        involve significant financial risk and may not be suitable for every
        individual. Values can fluctuate substantially and you may lose some or
        all of your invested capital. Nexorax does not guarantee profits, fixed
        returns, capital protection or risk-free investments. AI-generated
        signals, automated trading systems and arbitrage strategies may produce
        losses. Any fund management services are subject to applicable
        licensing, regulatory approvals, contractual terms and jurisdictional
        requirements. Past performance is not indicative of future results. Seek
        advice from qualified financial and legal professionals before making
        investment decisions.
      </p>
    </div>
  </footer>
);
