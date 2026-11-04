const words = ["FOREX", "CRYPTO", "EDUCATION", "FUND MANAGEMENT", "AI TECHNOLOGY", "RISK MANAGEMENT"];

export default function Ticker() {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-y border-line bg-bg2 py-4" aria-hidden>
      <div className="marquee flex w-max gap-12">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 text-sm font-bold tracking-[0.25em] text-soft">
            {w}
            <i className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
