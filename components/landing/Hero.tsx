import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    // 1. Outer section is now full width with dark background
    <section className="landing-hero relative w-full overflow-hidden bg-[#050505] pt-14 text-[#F5F3EE] sm:pt-20">

      {/* 2. Inner container limits the width and centers the content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-24">

        {/* Background Blobs (Glow Effects) */}
        <div className="hero-ambient-glow absolute w-[420px] h-[420px] -top-32 -left-40 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(47,111,255,0.8), transparent 65%)' }}></div>
        <div className="hero-ambient-glow absolute w-[380px] h-[380px] top-10 right-0 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,200,244,0.8), transparent 65%)' }}></div>

        {/* Subtle Grid Pattern */}
        <div className="hero-grid-pattern absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)', backgroundSize: '26px 26px' }}></div>

        {/* ========================================================= */}
        {/* MAIN HERO GRID (Text + Chart) */}
        {/* ========================================================= */}
        <div className="relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center mb-24">

          {/* Left Column: Text Content */}
          <div className="relative z-10">
            {/* Tagline */}
            <p className="text-xs tracking-[0.2em] uppercase text-[#10C7F4] mb-6 flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FC97D] inline-block animate-pulse"></span>
              Forex Trading Education · Online & Live
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-[64px] leading-[1.05] mb-6 font-serif tracking-tight">
              Learn the market.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#347DFF] via-[#19C8EE] to-[#155DF5] italic">
                Master the process.
              </span>
            </h1>

            {/* Description */}
            <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-9">
              NEXORAX is a structured path into forex — chart reading, risk, and macro, taught by mentors who trade it themselves. No tips, no signals, just a repeatable process.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/register" className="inline-flex items-center gap-2 bg-[#10C7F4] text-black px-7 py-3.5 rounded-full font-medium hover:bg-[#079FCB] transition-colors">
                Enroll now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>
              <Link href="/login" className="border border-white/20 px-7 py-3.5 rounded-full font-medium hover:border-white/50 transition-colors">
                Explore LMS
              </Link>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-white/45 font-medium">
              <span>6 structured phases</span>
              <span className="hidden md:inline">·</span>
              <span>Live & recorded formats</span>
              <span className="hidden md:inline">·</span>
              <span>Mentor-reviewed trades</span>
            </div>
          </div>

          {/* Right Column: Academy illustration & connected learning network */}
          <div className="relative z-10 mt-10 lg:mt-0">
            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute inset-12 rounded-full bg-[#19C8EE]/15 blur-[90px]" />
              <svg
                viewBox="0 0 560 440"
                className="hero-network-orbit absolute inset-0 h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <ellipse cx="280" cy="220" rx="250" ry="146" stroke="#19C8EE" strokeOpacity=".3" strokeDasharray="4 9" />
                <ellipse cx="280" cy="220" rx="190" ry="206" stroke="#347DFF" strokeOpacity=".24" strokeDasharray="3 10" />
                <path d="m45 167 105 27m265-78 93-57M59 312l121-57m201 78 116 38M280 15v101m0 208v99" stroke="#73DDF5" strokeOpacity=".38" strokeDasharray="4 8" />
                <circle className="hero-network-node" cx="45" cy="167" r="7" fill="#19C8EE" />
                <circle className="hero-network-node hero-network-node-delay" cx="508" cy="59" r="8" fill="#347DFF" />
                <circle className="hero-network-node hero-network-node-delay-2" cx="59" cy="312" r="6" fill="#347DFF" />
                <circle className="hero-network-node" cx="521" cy="371" r="7" fill="#19C8EE" />
                <circle className="hero-network-node hero-network-node-delay-2" cx="280" cy="15" r="6" fill="#19C8EE" />
                <circle className="hero-network-node hero-network-node-delay" cx="280" cy="425" r="6" fill="#347DFF" />
              </svg>

              <div className="hero-visual-card relative z-10 overflow-hidden  bg-gradient-to-br from-white/[0.08] via-[#0A0E1A]/90 to-[#102B4A]/80 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:p-5">
                <div className="mb-1 flex items-center justify-between gap-3 px-2 pt-1">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#19C8EE]/20 bg-[#19C8EE]/10 text-[#73DDF5]">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                        <path d="m8 12 2.5-2.5L13 12l4-4" />
                      </svg>
                    </span>
                    <span>
                      <span className="hero-visual-accent block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#73DDF5]">
                        Your learning path
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-white">
                        Learn the markets, step by step
                      </span>
                    </span>
                  </div>
                  <span className="hero-visual-pill hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium tracking-wide text-white/55 sm:inline-flex">
                    NEXORAX ACADEMY
                  </span>
                </div>

                <div className="relative">
                  <svg
                    viewBox="0 0 520 420"
                    className="hero-art-orbit pointer-events-none absolute inset-0 z-0 h-full w-full"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="274" cy="218" r="190" stroke="#19C8EE" strokeOpacity=".55" strokeDasharray="3 8" />
                  </svg>
                  <Image
                    src="/images/academy-banner-art.svg"
                    alt="NEXORAX market chart and learning illustration"
                    width={520}
                    height={420}
                    priority
                    className="hero-academy-art relative z-10 h-auto w-full drop-shadow-[0_28px_45px_rgba(0,0,0,0.4)]"
                  />
                </div>

                <div className="hero-learning-callout absolute -right-1 top-[25%] z-20 w-40 overflow-hidden rounded-2xl border border-[#19C8EE]/30 bg-[#071B2B]/95 p-3 shadow-xl backdrop-blur sm:-right-3 sm:w-48 sm:p-4">
                  <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] text-[#73DDF5] sm:text-[10px]">
                    Academy curriculum
                  </span>
                  <div className="hero-learning-ticker-window h-5 overflow-hidden text-xs font-semibold text-white sm:text-sm" aria-hidden="true">
                    <div className="hero-learning-ticker">
                      <span>Forex foundations</span>
                      <span>Chart reading</span>
                      <span>Risk management</span>
                      <span>Forex foundations</span>
                    </div>
                  </div>
                  <span className="sr-only">
                    Forex foundations, chart reading, risk management.
                  </span>
                </div>

                <div className="hero-mentor-callout absolute -left-1 bottom-[20%] z-20 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#071B2B]/95 px-3 py-2.5 shadow-xl backdrop-blur sm:-left-3 sm:gap-3 sm:px-4 sm:py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#19C8EE]/15 text-[#73DDF5]">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="10" cy="7" r="4" />
                      <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#73DDF5]">
                      Learn with mentors
                    </span>
                    <span className="mt-0.5 block text-[9px] text-white/65 sm:text-[10px]">
                      Guidance at every stage
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-white/10 px-1 pt-3 sm:gap-3 sm:px-2">
                  {[
                    { number: "01", label: "Market basics" },
                    { number: "02", label: "Chart reading" },
                    { number: "03", label: "Risk & macro" },
                  ].map((item) => (
                    <div key={item.number} className="hero-topic-card rounded-xl bg-white/[0.035] px-2 py-2.5 sm:px-3">
                      <span className="block text-[9px] font-bold tracking-[0.16em] text-[#19C8EE] sm:text-[10px]">
                        {item.number}
                      </span>
                      <span className="mt-1 block text-[10px] font-medium leading-tight text-white/75 sm:text-xs">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* NEW SECTION: Stats Cards (Added at the very bottom) */}
        {/* ========================================================= */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1: Phases */}
          <div className="hero-stat-card rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors">
            <div className="text-[#10C7F4] mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
                <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
              </svg>
            </div>
            <p className="font-serif text-4xl font-bold text-white mb-1">6</p>
            <p className="text-white font-semibold text-sm mb-2">Phases</p>
            <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase font-medium leading-relaxed">
              Structured, sequenced<br />curriculum
            </p>
          </div>

          {/* Card 2: Mentors */}
          <div className="hero-stat-card rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors">
            <div className="text-[#10C7F4] mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <p className="font-serif text-4xl font-bold text-white mb-1">2</p>
            <p className="text-white font-semibold text-sm mb-2">Mentors</p>
            <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase font-medium leading-relaxed">
              Practitioner-led teaching
            </p>
          </div>

          {/* Card 3: Market Access */}
          <div className="hero-stat-card rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors">
            <div className="text-[#10C7F4] mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p className="font-serif text-4xl font-bold text-white mb-1">24/5</p>
            <p className="text-white font-semibold text-sm mb-2">Market access</p>
            <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase font-medium leading-relaxed">
              Live pricing, every session
            </p>
          </div>

          {/* Card 4: Trade Review */}
          <div className="hero-stat-card rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors">
            <div className="text-[#10C7F4] mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <p className="font-serif text-4xl font-bold text-white mb-1">1:1</p>
            <p className="text-white font-semibold text-sm mb-2">Trade review</p>
            <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase font-medium leading-relaxed">
              Real setups, reviewed live
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}