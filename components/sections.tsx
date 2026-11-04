"use client";
import { motion } from "framer-motion";
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, YAxis } from "recharts";
import {
  GraduationCap, Landmark, Cpu, UserCheck, ShieldCheck, Building2, PieChart as PieIcon, FileText, Cog, GitCompareArrows, Bot,
  Sparkles, Wrench, Eye, Lightbulb, Gauge, Lock, Handshake, Target, Rocket, CreditCard, CircleCheck, Globe, Bitcoin,
  LineChart, Brain, Layers, Activity, Newspaper, Zap, Bell,
} from "lucide-react";
import { series } from "@/lib/market-data";
import { Btn, Card, Reveal, Section } from "./ui";
import { GlobeNet, ShieldViz, ToolViz, type ToolKind } from "./visuals";

/* ---------- Stats ---------- */
const stats = [
  [Globe, "24/5", "Forex market access"], [Bitcoin, "24/7", "Crypto market access"],
  [Cpu, "5", "Nexora tools"], [Rocket, "3", "Planned launches to 2028"],
] as const;
export const Stats = () => (
  <div className="border-b border-line bg-bg2">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4">
      {stats.map(([I, v, l], k) => (
        <Reveal key={l} d={k * 0.07}>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet/15 text-violet"><I size={22} /></span>
            <div><p className="text-2xl font-extrabold text-fg">{v}</p><p className="text-sm text-muted">{l}</p></div>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

/* ---------- About ---------- */
const pillars = [
  [GraduationCap, "Financial Education", "Structured learning and market insights for Forex and cryptocurrency."],
  [Landmark, "Fund Management", "Professionally supervised strategies with dedicated risk oversight, subject to regulatory requirements."],
  [Cpu, "Financial Technology", "AI-powered tools and trading assistance to support smarter decisions."],
] as const;
export const About = () => (
  <Section id="about" title="Building a smarter financial ecosystem." sub="We believe sustainable financial growth starts with knowledge, discipline, transparency and responsible risk management.">
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="space-y-4">
        {pillars.map(([I, t, d], k) => (
          <Reveal key={t} d={k * 0.1}>
            <Card className="flex gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet to-[#5b21b6] text-white"><I size={26} /></span>
              <div><h3 className="text-xl font-bold text-fg">{t}</h3><p className="mt-1 text-muted">{d}</p></div>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal d={0.15}><GlobeNet /></Reveal>
    </div>
  </Section>
);

/* ---------- Fund management ---------- */
const fund = [
  [UserCheck, "Expert Fund Manager Supervision", "Strategies supervised by experienced market professionals, with ongoing monitoring and evaluation."],
  [ShieldCheck, "Dedicated Risk Management Team", "Continuous exposure assessment, allocation controls and a focus on capital preservation."],
  [Building2, "Diversified Broker Infrastructure", "Where operationally and legally appropriate, funds may be spread across independent brokers, backed by due diligence."],
  [PieIcon, "Portfolio Diversification", "Risk-based allocation across selected Forex and crypto markets, with regular rebalancing."],
  [FileText, "Transparency & Reporting", "Clear reports on portfolio activity, performance updates and risk disclosures."],
] as const;
const nodes: [number, number][] = [[60, 50], [240, 50], [150, 250]];
const alloc = [{ n: "Forex", v: 45, c: "#7C3AED" }, { n: "Crypto", v: 35, c: "#D6A84F" }, { n: "Reserve", v: 20, c: "#A78BFA" }];

export const Fund = () => (
  <Section id="fund" alt title="Professional oversight. Disciplined strategies. Risk awareness.">
    <div className="grid items-start gap-10 lg:grid-cols-2">
      <div className="space-y-3">
        {fund.map(([I, t, d], k) => (
          <Reveal key={t} d={k * 0.07}>
            <div className="flex gap-4 rounded-2xl border border-line bg-surface p-4">
              <I className="mt-1 shrink-0 text-goldtext" />
              <div><h3 className="font-bold text-fg">{t}</h3><p className="text-sm text-muted">{d}</p></div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="space-y-5">
        <Card>
          <svg viewBox="0 0 300 300" className="mx-auto w-full max-w-sm" role="img" aria-label="Fund spread across multiple independent brokers (illustration)">
            {nodes.map(([x, y], k) => (
              <motion.line key={k} x1="150" y1="150" x2={x} y2={y} className="stroke-violet" strokeWidth="2" strokeDasharray="5 5"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 + k * 0.2 }} />
            ))}
            <circle cx="150" cy="150" r="38" className="pulse fill-bg2 stroke-gold" strokeWidth="2" />
            <text x="150" y="154" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-fg">Fund</text>
            {nodes.map(([x, y], k) => (
              <g key={k}>
                <circle cx={x} cy={y} r="28" className="fill-bg2 stroke-violet" strokeWidth="2" />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="10" className="fill-soft">Broker {"ABC"[k]}</text>
              </g>
            ))}
          </svg>
        </Card>
        <div className="grid gap-5 sm:grid-cols-2">
          <Card>
            <p className="mb-1 text-sm font-bold text-fg">Illustrative allocation</p>
            <div className="h-32"><ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={alloc} dataKey="v" innerRadius={34} outerRadius={56} paddingAngle={3} stroke="none" animationDuration={1600}>
                {alloc.map((x) => <Cell key={x.n} fill={x.c} />)}</Pie></PieChart>
            </ResponsiveContainer></div>
            <div className="flex flex-wrap justify-center gap-x-3 text-xs text-muted">
              {alloc.map((x) => <span key={x.n} className="flex items-center gap-1"><i className="h-2 w-2 rounded-full" style={{ background: x.c }} />{x.n}</span>)}
            </div>
          </Card>
          <Card className="text-center"><ShieldViz /><p className="mt-2 text-sm font-bold text-fg">Risk controls first</p></Card>
        </div>
        <p className="text-xs text-muted">Illustrations only. Diversification across brokers does not guarantee the safety or availability of funds. Trading involves substantial risk, including possible loss of capital. Fund management services are subject to licensing and regulatory approval.</p>
      </div>
    </div>
  </Section>
);

/* ---------- Tools ---------- */
const tools: [typeof Cog, ToolKind, string, string][] = [
  [Cog, "engine", "Nexora Engine", "A trading technology platform supporting market analysis, strategy execution and trading operations."],
  [GitCompareArrows, "arb", "Nexora Arbitrage", "Identifies and analyzes potential price differences across supported markets and platforms."],
  [Sparkles, "signal", "Nexora AI Trading Signal Assistance", "AI-assisted analysis that helps you understand trends, indicators and potential opportunities."],
  [Bot, "bot", "Nexora AI Trading Bots", "Automated execution of predefined strategies using configured parameters and risk controls."],
  [Wrench, "power", "Nexora AI Power Tools", "A growing set of AI tools that simplify research and improve trading workflows."],
];
export const Tools = () => (
  <Section id="tools" title="Advanced tools for the modern financial market." sub="AI-generated signals, automated systems and arbitrage strategies may produce losses.">
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map(([I, kind, t, d], k) => (
        <Reveal key={t} d={k * 0.08}>
          <Card className="h-full">
            <div className="mb-5 rounded-2xl bg-violet/10 p-3"><ToolViz kind={kind} /></div>
            <div className="flex items-center gap-3"><I className="text-goldtext" size={20} /><h3 className="text-lg font-bold text-fg">{t}</h3></div>
            <p className="mt-2 text-sm text-muted">{d}</p>
          </Card>
        </Reveal>
      ))}
    </div>
  </Section>
);

/* ---------- Platform preview ---------- */
const watch = [["BTC/USD", "104,285", "+2.84"], ["EUR/USD", "1.1742", "+0.42"], ["GBP/USD", "1.3481", "-0.18"], ["XAU/USD", "3,876.20", "+0.76"]];
const news = ["Weekly recap: currency markets", "Crypto market structure explained", "Risk management checklist"];
const learn = [["Forex Fundamentals", 82], ["Risk Management", 56], ["Technical Analysis", 31]] as const;
export const Platform = () => (
  <Section id="platform" title="One platform. One clear view of the markets." sub="A preview of the Nexora dashboard. Interface and figures are illustrative sample data.">
    <Reveal>
      <div className="rounded-3xl border border-line bg-[#0e0722] p-3 text-white shadow-[0_40px_100px_-30px_rgba(124,58,237,.6)] md:p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-[#9a8fb8]">
          <i className="h-2.5 w-2.5 rounded-full bg-red-400/70" /><i className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" /><i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 rounded-md bg-white/5 px-3 py-1">Nexora dashboard · preview</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1fr_330px]">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {[[Zap, "Open signals", "3"], [Bot, "Bots running", "2"], [GraduationCap, "Course progress", "64%"]].map(([I, l, v]: any) => (
                <div key={l} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"><I size={16} className="text-[#D6A84F]" /><p className="mt-2 text-xl font-extrabold">{v}</p><p className="text-[11px] text-[#9a8fb8]">{l}</p></div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="mb-2 text-xs text-[#9a8fb8]">Market chart · sample data</p>
              <div className="h-56"><ResponsiveContainer width="100%" height="100%"><AreaChart data={series(64, 4)}>
                <defs><linearGradient id="pf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.55} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient></defs>
                <YAxis hide domain={["dataMin-5", "dataMax+5"]} /><Area dataKey="v" stroke="#A78BFA" strokeWidth={2.5} fill="url(#pf)" animationDuration={2400} /></AreaChart></ResponsiveContainer></div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="mb-3 flex items-center gap-2 text-xs text-[#9a8fb8]"><Newspaper size={14} /> Market news · sample</p>
              {news.map((n) => <p key={n} className="border-t border-white/10 py-2 text-sm text-[#ddd6ee]">{n}</p>)}
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="mb-2 flex items-center gap-2 text-xs text-[#9a8fb8]"><Activity size={14} /> Watchlist</p>
              {watch.map(([n, p, c]) => (
                <div key={n} className="flex items-center justify-between border-t border-white/10 py-2 text-sm">
                  <b>{n}</b><span className="tabular-nums text-[#ddd6ee]">{p}</span>
                  <span className="font-bold tabular-nums" style={{ color: c.startsWith("-") ? "#FF6B73" : "#16C784" }}>{c}%</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="mb-3 flex items-center gap-2 text-xs text-[#9a8fb8]"><GraduationCap size={14} /> Education progress</p>
              {learn.map(([n, v]) => (
                <div key={n} className="mb-3 last:mb-0"><div className="mb-1 flex justify-between text-xs"><span>{n}</span><span>{v}%</span></div>
                  <div className="h-2 rounded bg-white/10"><motion.div className="h-2 rounded bg-gradient-to-r from-[#8B5CF6] to-[#D6A84F]" initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1.2 }} /></div></div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-bold">
              {[[LineChart, "New analysis"], [Bell, "Set alert"]].map(([I, l]: any) => (
                <span key={l} className="flex items-center justify-center gap-2 rounded-xl bg-[#D6A84F] py-3 text-[#1a1033]"><I size={16} />{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  </Section>
);

/* ---------- Education ---------- */
const edu = [
  [Globe, "Forex Fundamentals", "How currency markets work and move.", "Beginner"],
  [Bitcoin, "Crypto Fundamentals", "Digital assets, volatility and market structure.", "Beginner"],
  [LineChart, "Technical Analysis", "Charts, trends and indicators.", "Intermediate"],
  [ShieldCheck, "Risk Management", "Position sizing and stop-loss discipline.", "Beginner"],
  [Brain, "Trading Psychology", "Consistency and decision-making under pressure.", "Advanced"],
  [Layers, "Market Structure", "How price, liquidity and participants interact.", "Advanced"],
] as const;
export const Education = () => (
  <Section id="education" alt title="Forex and crypto education, made accessible.">
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {edu.map(([I, t, d, l], k) => (
        <Reveal key={t} d={(k % 3) * 0.08}>
          <Card className="h-full">
            <I aria-hidden className="absolute -right-4 -top-4 text-violet opacity-[0.08]" size={130} />
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet/15 text-violet"><I size={24} /></span>
            <h3 className="mt-5 text-lg font-bold text-fg">{t}</h3>
            <p className="mt-1 text-sm text-muted">{d}</p>
            <span className="mt-4 inline-block rounded-full border border-gold/60 px-3 py-1 text-xs font-semibold text-goldtext">{l}</span>
          </Card>
        </Reveal>
      ))}
    </div>
    <div className="mt-10"><Btn>Explore Education</Btn></div>
  </Section>
);

/* ---------- Vision & mission ---------- */
const mission = [
  "Make Forex and cryptocurrency education accessible.", "Introduce intelligent technology into modern trading.", "Develop AI-powered financial tools.",
  "Promote disciplined and responsible trading.", "Build structured fund management with professional oversight.", "Encourage transparency, risk awareness and informed decisions.",
];
export const VisionMission = () => (
  <Section title="Creating the future of intelligent financial management.">
    <div className="grid gap-8 lg:grid-cols-2">
      <Reveal><Card className="h-full"><Eye className="text-goldtext" /><h3 className="mt-4 text-2xl font-bold text-fg">Our vision</h3>
        <p className="mt-3 text-muted">To establish Nexorax as a trusted name in financial education, technology innovation and professionally managed market strategies, where knowledge, technology and responsible practice work together.</p></Card></Reveal>
      <Reveal d={0.1}><Card className="h-full"><Target className="text-goldtext" /><h3 className="mt-4 text-2xl font-bold text-fg">Our mission</h3>
        <ul className="mt-3 space-y-2">{mission.map((m) => <li key={m} className="flex gap-2 text-soft"><CircleCheck size={18} className="mt-1 shrink-0 text-violet" />{m}</li>)}</ul></Card></Reveal>
    </div>
  </Section>
);

/* ---------- Roadmap ---------- */
const road = [
  [Bot, "Q2 2027", "Nexora AI Bots", "AI-powered automated trading bots with configurable strategies and risk management features."],
  [CreditCard, "Q3 2027", "Nexora Crypto Card", "A crypto payment card initiative, subject to required approvals and partnerships."],
  [Building2, "Q1 2028", "Nexora Broker House", "A planned brokerage platform, subject to regulatory authorization."],
] as const;
export const Roadmap = () => (
  <Section id="roadmap" alt title="Our journey toward financial technology innovation.">
    <div className="relative grid gap-8 md:grid-cols-3">
      <motion.div className="absolute left-0 top-6 hidden h-0.5 w-full origin-left bg-gradient-to-r from-violet to-gold md:block"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.8 }} />
      {road.map(([I, q, t, d], k) => (
        <Reveal key={t} d={k * 0.2} className="relative md:pt-16">
          <span className="absolute left-0 top-0 hidden h-12 w-12 place-items-center rounded-full border-2 border-gold bg-bg2 text-goldtext shadow-[0_0_24px_rgba(214,168,79,.45)] md:grid"><I size={20} /></span>
          <Card className="h-full"><p className="text-sm font-bold text-goldtext">{q}</p><h3 className="mt-1 text-xl font-bold text-fg">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></Card>
        </Reveal>
      ))}
    </div>
    <p className="mt-8 text-xs text-muted">Roadmap dates are planned development targets and may change with technical progress, partnerships and regulatory approvals.</p>
  </Section>
);

/* ---------- Why + values ---------- */
const why = [
  "Expert-supervised management approach", "Dedicated risk management focus", "Multiple-broker infrastructure strategy", "Forex and crypto market education",
  "AI-powered trading assistance", "Innovative financial technology", "Long-term technology vision", "Transparency and responsible participation",
];
const values = [
  [Eye, "Transparency", "Clear communication and reporting"], [Lightbulb, "Innovation", "Continuous financial technology development"],
  [Gauge, "Discipline", "Structured strategies and risk controls"], [GraduationCap, "Education", "Knowledge-driven financial decisions"],
  [Lock, "Security", "Responsible operational and cybersecurity practices"], [Handshake, "Trust", "Accountability and professional conduct"],
] as const;
export const WhyValues = () => (
  <Section title="A technology-driven approach to financial markets.">
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {why.map((w, k) => (
        <Reveal key={w} d={(k % 4) * 0.06}>
          <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-fg"><Rocket size={18} className="mt-0.5 shrink-0 text-goldtext" />{w}</div>
        </Reveal>
      ))}
    </div>
    <h3 className="mb-6 mt-20 text-2xl font-extrabold text-fg md:text-3xl">Our core values</h3>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {values.map(([I, t, d]) => (
        <Card key={t}><I className="text-violet" /><h4 className="mt-3 font-bold text-fg">{t}</h4><p className="text-sm text-muted">{d}</p></Card>
      ))}
    </div>
  </Section>
);
