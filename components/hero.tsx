"use client";
import { motion } from "framer-motion";
import { Btn } from "./ui";
import HeroTerminal from "./hero-terminal";
import { FloatingCandles } from "./visuals";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_75%_15%,var(--hero),var(--bg)_65%)] px-5 pb-20 pt-32 md:pt-40">
      <div className="grid-bg absolute inset-0" />
      <motion.div
        className="absolute -right-32 top-16 h-[520px] w-[520px] rounded-full bg-violet/25 blur-[130px]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <FloatingCandles className="absolute bottom-8 left-6 hidden md:flex" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <p className="mb-5 text-xs font-semibold tracking-[0.16em] text-goldtext sm:text-sm">FOREX • CRYPTO • EDUCATION • FUND MANAGEMENT • AI TECHNOLOGY</p>
          <h1 className="text-[40px] font-extrabold leading-[1] tracking-tight text-fg sm:text-6xl xl:text-[64px]">
            Smarter trading.<br />Strategic fund management.<br />
            <span className="bg-gradient-to-r from-violet to-goldtext bg-clip-text text-transparent">Powered by technology.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-soft">
            Nexorax is a financial education, trading technology and fund management company focused on Forex and cryptocurrency markets, built on expert supervision, AI-powered tools and structured risk management.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Btn href="#fund">Explore Fund Management</Btn>
            <Btn ghost href="#tools">Discover Nexora Tools</Btn>
          </div>
          <p className="mt-6 text-sm text-muted">Empowering financial growth through knowledge, technology & strategy.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <HeroTerminal />
        </motion.div>
      </div>
    </section>
  );
}
