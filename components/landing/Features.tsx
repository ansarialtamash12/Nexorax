export function Features() {
  return (
    <section id="why" className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden">
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)', backgroundSize: '26px 26px' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Top Heading Section */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-[#10C7F4] mb-5 font-semibold">
            WHY NEXORAX ACADEMY
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white">
            Built for people who want to trade{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#347DFF] via-[#19C8EE] to-[#155DF5] italic">
              properly
            </span>
          </h2>
        </div>

        {/* 2x2 Grid of Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 hover:border-white/20 transition-colors duration-300"
            >
              {/* Card Header: Chapter Number & Icon */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#10C7F4] font-semibold">
                  {feature.chapter}
                </p>
                <div className="text-[#10C7F4]">
                  {feature.icon === 'book' && <BookIcon />}
                  {feature.icon === 'chart' && <ChartIcon />}
                  {feature.icon === 'target' && <TargetIcon />}
                  {feature.icon === 'shield' && <ShieldIcon />}
                </div>
              </div>

              {/* Card Body */}
              <h3 className="font-serif text-xl font-bold text-white mb-4 leading-snug">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- Static Data Array ---
const featuresData = [
  {
    chapter: "CHAPTER 01",
    icon: "book",
    title: "A structured curriculum, start to finish",
    description: "No random YouTube rabbit holes. One sequenced path: market basics, chart reading, risk management, and position sizing — each layer building on the last."
  },
  {
    chapter: "CHAPTER 02",
    icon: "chart",
    title: "Live markets, not screenshots",
    description: "Every concept is taught against real-time forex charts — the same pairs and sessions you'll actually trade."
  },
  {
    chapter: "CHAPTER 03",
    icon: "target",
    title: "Practitioner mentors",
    description: "Learn from traders who actually trade. Every session reviews real setups, including the losing ones."
  },
  {
    chapter: "CHAPTER 04",
    icon: "shield",
    title: "No tips. No signals. Ever.",
    description: "We never sell you a trade call. We teach you to build your own process so you never need to depend on anyone's calls again."
  }
];

// --- Static SVG Icons ---
function BookIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>;
}
function ChartIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>;
}
function TargetIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
}
function ShieldIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>;
}