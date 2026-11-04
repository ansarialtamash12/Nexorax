import Link from "next/link";

export function CTA() {
  return (
    <section className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)',
          backgroundSize: '26px 26px'
        }}
      ></div>

      {/* Center Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#19C8EE]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">

        {/* Shield Icon */}
        <div className="flex justify-center mb-6">
          <ShieldIcon />
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white mb-6">
          Real power. Real person.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#347DFF] via-[#19C8EE] to-[#155DF5] italic">
            Real generation
          </span>
          .
        </h2>

        {/* Description */}
        <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Join a cohort learning forex the disciplined way — structured phases, live markets, real mentorship.
        </p>

        {/* CTA Button */}
        <Link href="/register" className="inline-flex items-center gap-2 bg-[#10C7F4] text-black px-8 py-4 rounded-full font-medium hover:bg-[#079FCB] transition-colors text-base">
          Enroll now
          <ArrowUpRightIcon />
        </Link>

      </div>
    </section>
  );
}

// --- Static SVG Icons ---
function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#19C8EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}