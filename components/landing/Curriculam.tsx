export function Curriculum() {
  return (
    <section id="curriculum" className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)', 
          backgroundSize: '26px 26px' 
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        
        {/* Top Heading Section */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-[#19C8EE] mb-5 font-semibold">
            CURRICULUM
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white mb-6">
            Six phases.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#347DFF] via-[#19C8EE] to-[#155DF5] italic">
              One clear path.
            </span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            From your first chart to a written trading plan — every phase builds on the last, taught live against real forex markets. About 19 weeks end to end.
          </p>
        </div>

        {/* Vertical List of Phases (Single Column) */}
        <div className="flex flex-col gap-6">
          {phasesData.map((phase, index) => (
            <div 
              key={index} 
              id={phase.id}
              className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 md:p-10 hover:border-white/20 transition-colors duration-300 scroll-mt-28"
            >
              {/* Card Header: Phase Number, Duration & Icon */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold">
                  {phase.phase} · {phase.duration}
                </p>
                <div className="text-[#19C8EE]">
                  {phase.icon === 'chart' && <LineChartIcon />}
                  {phase.icon === 'activity' && <ActivityIcon />}
                  {phase.icon === 'trending' && <TrendingUpIcon />}
                  {phase.icon === 'target' && <TargetIcon />}
                  {phase.icon === 'brain' && <BrainIcon />}
                  {phase.icon === 'book' && <BookIcon />}
                </div>
              </div>

              {/* Card Body: Title & Description */}
              <h3 className="font-serif text-2xl font-bold text-white mb-4">
                {phase.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-2xl">
                {phase.description}
              </p>

              {/* Card Footer: Two-Column Bullet Points */}
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/70">
                {phase.topics.map((topic, i) => (
                  <li key={i}>· {topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- Static Data Array (With Unique IDs & Topics) ---
const phasesData = [
  {
    id: "phase-01",
    phase: "PHASE 01",
    duration: "3 WEEKS · LIVE ONLINE",
    icon: "chart",
    title: "Forex Foundations",
    description: "How the currency market works, who moves it, and the vocabulary every trader needs.",
    topics: [
      "Currency pairs: majors, minors, exotics",
      "Pips, lots, leverage and margin",
      "Trading sessions and overlaps",
      "Reading a broker platform"
    ]
  },
  {
    id: "phase-02",
    phase: "PHASE 02",
    duration: "4 WEEKS · LIVE + RECORDED",
    icon: "activity",
    title: "Technical Analysis & Charting",
    description: "Read price action directly — structure first, indicators second.",
    topics: [
      "Candlestick anatomy and patterns",
      "Support, resistance and trend structure",
      "Breakouts, pullbacks and retests",
      "Multi-timeframe analysis"
    ]
  },
  {
    id: "phase-03",
    phase: "PHASE 03",
    duration: "3 WEEKS · LIVE ONLINE",
    icon: "trending",
    title: "Macro & Fundamental Analysis",
    description: "Understand why currencies move — rates, policy, and data releases.",
    topics: [
      "Central banks and interest rates",
      "Inflation, jobs and GDP data",
      "Trading around news events",
      "Building an economic calendar routine"
    ]
  },
  {
    id: "phase-04",
    phase: "PHASE 04",
    duration: "2 WEEKS · LIVE ONLINE",
    icon: "target",
    title: "Risk & Position Sizing",
    description: "The skill that keeps you in the game: controlling how much you can lose.",
    topics: [
      "Stop-loss placement logic",
      "Position sizing by account risk",
      "Risk-to-reward planning",
      "Drawdown limits and rules"
    ]
  },
  {
    id: "phase-05",
    phase: "PHASE 05",
    duration: "2 WEEKS · COHORT",
    icon: "brain",
    title: "Trading Psychology",
    description: "Discipline, emotional control and journaling — turning a plan into a habit.",
    topics: [
      "Fear, greed and revenge trading",
      "Building a pre-trade checklist",
      "Journaling and review routines",
      "Handling losing streaks"
    ]
  },
  {
    id: "phase-06",
    phase: "PHASE 06",
    duration: "4 WEEKS · MENTOR-LED",
    icon: "book",
    title: "Applied Practice Lab",
    description: "Put everything together on a demo account with mentor review before any real capital.",
    topics: [
      "Guided demo trading sessions",
      "Weekly live setup reviews",
      "Writing your own trading plan",
      "Final mentor feedback"
    ]
  }
];

// --- Static SVG Icons ---
function LineChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
    </svg>
  );
}