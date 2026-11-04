"use client";
import { motion } from "framer-motion";
import { ReactNode, useId } from "react";

export const Reveal = ({ children, d = 0, className = "" }: { children: ReactNode; d?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: d }}
  >
    {children}
  </motion.div>
);

export const Section = ({
  id, title, sub, children, alt,
}: { id?: string; title: string; sub?: string; children: ReactNode; alt?: boolean }) => (
  <section id={id} className={`relative overflow-hidden px-5 py-20 md:py-28 ${alt ? "bg-bg2" : ""}`}>
    <div className="mx-auto max-w-7xl">
      <Reveal className="mb-12 max-w-3xl">
        <h2 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-fg md:text-5xl">{title}</h2>
        {sub && <p className="mt-4 text-lg text-muted">{sub}</p>}
      </Reveal>
      {children}
    </div>
  </section>
);

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    whileHover={{ y: -6 }}
    className={`relative overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-[0_14px_40px_-24px_rgba(76,29,149,.35)] backdrop-blur transition-colors hover:border-gold/70 ${className}`}
  >
    {children}
  </motion.div>
);

export const Btn = ({ children, ghost, href = "#" }: { children: ReactNode; ghost?: boolean; href?: string }) => (
  <a
    href={href}
    className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold transition-all ${
      ghost
        ? "border border-line bg-surface text-fg hover:border-gold"
        : "bg-gold text-[#1a1033] shadow-[0_0_28px_rgba(214,168,79,.4)] hover:shadow-[0_0_44px_rgba(214,168,79,.65)]"
    }`}
  >
    {children}
  </a>
);

export const Mark = ({ className = "h-9 w-9" }: { className?: string }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#5B21B6" />
        </linearGradient>
      </defs>
      <path d="M6 58V8h14l24 32V8h14v50H44L20 26v32z" fill={`url(#${id})`} />
      <path d="M16 30c12 4 24 14 32 28" stroke="#D6A84F" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
};
