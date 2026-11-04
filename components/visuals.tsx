// Pure SVG/CSS illustrations. They use theme tokens so they work in light and dark mode.

export const FloatingCandles = ({ className = "" }: { className?: string }) => {
  const bars = [40, 68, 52, 92, 74, 112, 94, 130];
  return (
    <div aria-hidden className={`pointer-events-none items-end gap-3 ${className}`}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="candle-bob block w-3 rounded-sm"
          style={{ height: h, background: i % 3 === 1 ? "#EA3943" : "#16C784", opacity: 0.35, animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </div>
  );
};

export const GlobeNet = () => {
  const nodes: [number, number, string][] = [
    [70, 110, "Forex"], [335, 100, "Crypto"], [60, 300, "Education"], [340, 305, "Fund"],
  ];
  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-md" role="img" aria-label="Network connecting Forex, Crypto, Education and Fund Management">
      <defs>
        <radialGradient id="globe-fill" cx="50%" cy="45%">
          <stop offset="0" stopColor="#8B5CF6" stopOpacity=".35" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity=".04" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#globe-fill)" className="stroke-violet/50" strokeWidth="1.5" />
      {[45, 95, 135].map((rx) => (
        <ellipse key={rx} cx="200" cy="200" rx={rx} ry="150" fill="none" className="stroke-violet/30" />
      ))}
      {[40, 95].map((ry) => (
        <ellipse key={ry} cx="200" cy="200" rx="150" ry={ry} fill="none" className="stroke-violet/30" />
      ))}
      {nodes.map(([x, y], i) => (
        <path key={i} d={`M200 200 Q ${(200 + x) / 2} ${Math.min(200, y) - 60} ${x} ${y}`} fill="none" className="arc stroke-gold" strokeWidth="2" />
      ))}
      <circle cx="200" cy="200" r="34" className="fill-bg2 stroke-gold" strokeWidth="2.5" />
      <path d="M185 218v-36h8l14 20v-20h8v36h-8l-14-20v20z" className="fill-violet" />
      {nodes.map(([x, y, label], i) => (
        <g key={label}>
          <circle cx={x} cy={y} r="9" className="pulse fill-gold" style={{ animationDelay: `${i * 0.4}s` }} />
          <rect x={x - 38} y={y + 14} width="76" height="22" rx="11" className="fill-bg2 stroke-line" />
          <text x={x} y={y + 29} textAnchor="middle" fontSize="12" fontWeight="700" className="fill-fg">{label}</text>
        </g>
      ))}
    </svg>
  );
};

export type ToolKind = "engine" | "arb" | "signal" | "bot" | "power";

export const ToolViz = ({ kind }: { kind: ToolKind }) => (
  <svg viewBox="0 0 160 70" className="h-16 w-full" aria-hidden>
    {kind === "engine" &&
      [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <rect key={i} x={8 + i * 17} y={10} width={10} height={50} rx={3} className="eq fill-violet/70" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    {kind === "arb" && (
      <>
        <polyline points="0,50 30,42 60,48 90,28 120,34 160,14" className="fill-none stroke-violet" strokeWidth="2.5" />
        <polyline points="0,58 30,54 60,40 90,42 120,22 160,28" className="fill-none stroke-gold" strokeWidth="2.5" />
        <line x1="90" y1="28" x2="90" y2="42" className="dash stroke-fg/60" />
        <circle cx="90" cy="35" r="4" className="pulse fill-gold" />
      </>
    )}
    {kind === "signal" && (
      <>
        {[12, 20, 28, 36, 44].map((h, i) => (
          <rect key={i} x={10 + i * 14} y={60 - h} width={9} height={h} rx={2} className={i > 2 ? "fill-gold" : "fill-violet/70"} />
        ))}
        <g className="pulse">
          <rect x="96" y="12" width="54" height="22" rx="11" fill="#16C784" />
          <text x="123" y="27" textAnchor="middle" fontSize="12" fontWeight="800" fill="#06261b">BUY</text>
        </g>
      </>
    )}
    {kind === "bot" && (
      <>
        <line x1="80" y1="18" x2="80" y2="8" className="stroke-violet" strokeWidth="2" />
        <circle cx="80" cy="6" r="3.5" className="pulse fill-gold" />
        <rect x="52" y="18" width="56" height="42" rx="12" className="fill-violet/20 stroke-violet" strokeWidth="2" />
        <circle cx="68" cy="36" r="5" className="blink fill-gold" />
        <circle cx="92" cy="36" r="5" className="blink fill-gold" />
        <line x1="68" y1="49" x2="92" y2="49" className="stroke-violet" strokeWidth="2.5" strokeLinecap="round" />
      </>
    )}
    {kind === "power" &&
      [0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={12 + (i % 3) * 48} y={8 + Math.floor(i / 3) * 31} width={40} height={24} rx={6} className="tile fill-violet" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
  </svg>
);

export const ShieldViz = () => (
  <svg viewBox="0 0 120 120" className="mx-auto h-28 w-28" aria-hidden>
    <path d="M60 8 100 24v30c0 26-17 46-40 58C37 100 20 80 20 54V24z" className="fill-violet/15 stroke-violet" strokeWidth="3" />
    <polyline points="38,70 52,56 64,64 84,40" className="dash fill-none stroke-gold" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="84" cy="40" r="5" className="pulse fill-gold" />
  </svg>
);

export const Skyline = ({ className = "" }: { className?: string }) => {
  const b: [number, number][] = [
    [0, 70], [40, 110], [90, 80], [130, 140], [185, 95], [230, 160], [285, 100], [330, 130], [390, 85], [440, 150], [500, 105], [550, 170],
    [610, 90], [660, 135], [720, 100], [770, 160], [830, 95], [880, 125], [940, 85], [990, 145], [1050, 100], [1110, 120], [1160, 80],
  ];
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className={className} aria-hidden>
      {b.map(([x, h], i) => (
        <g key={i}>
          <rect x={x} y={200 - h} width={36} height={h} fill="rgba(255,255,255,.07)" />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={x + 8} y={200 - h + 14 + r * 22} width={6} height={8} fill="#D6A84F" opacity={(i + r) % 3 === 0 ? 0.7 : 0.15} />
          ))}
        </g>
      ))}
    </svg>
  );
};
