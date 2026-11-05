"use client";

import { useState, useRef, useEffect } from "react";

// --- Data: Correct exchange prefixes ---
const tabsData = {
  Active: [
    { symbol: "NASDAQ:NVDA", name: "NVIDIA" },
    { symbol: "NYSE:NU", name: "Nu Holdings" },
    { symbol: "NASDAQ:WBD", name: "Warner Bros" },
    { symbol: "NASDAQ:INTC", name: "Intel" },
    { symbol: "NASDAQ:PACB", name: "PacBio" },
  ],
  Gainers: [
    { symbol: "NYSE:NU", name: "Nu Holdings" },
    { symbol: "NASDAQ:INTC", name: "Intel" },
    { symbol: "NASDAQ:NVDA", name: "NVIDIA" },
  ],
  Losers: [
    { symbol: "NASDAQ:WBD", name: "Warner Bros" },
    { symbol: "NASDAQ:PACB", name: "PacBio" },
  ],
};

// --- Hide scrollbar CSS ---
const globalCSS = `
  .tv-scroll-container::-webkit-scrollbar { display: none; }
  .tv-scroll-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// --- Mini Chart Card (UNCHANGED) ---
function MiniChartCard({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container";
    widgetDiv.style.height = "100%";
    widgetDiv.style.width = "100%";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: "100%",
      height: "100%",
      locale: "en",
      dateRange: "1D",
      colorTheme: "dark",
      isTransparent: false,
      autosize: true,
      largeChartUrl: "",
      chartOnly: false,
      noTimeScale: true,
      trendLineColor: "#00BFA6",
      underLineColor: "rgba(0, 191, 166, 0.18)",
      underLineBottomColor: "rgba(0, 191, 166, 0)",
    });

    widgetDiv.appendChild(script);
    containerRef.current.appendChild(widgetDiv);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div className="shrink-0 w-[240px] h-[180px] rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A]">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}

// --- Main Component ---
export function Markets() {
  const [activeTab, setActiveTab] = useState<keyof typeof tabsData>("Active");
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentSymbols = tabsData[activeTab] || [];
  const scrollSymbols = [...currentSymbols, ...currentSymbols]; // duplicate for seamless loop

  // Auto-scroll loop (replaces CSS animation)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf: number;
    const SPEED = 0.6;

    const step = () => {
      if (!isHovered && el) {
        el.scrollLeft += SPEED;
        const oneSet = el.scrollWidth / 2;
        if (el.scrollLeft >= oneSet) {
          el.scrollLeft -= oneSet;
        }
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  // Slide buttons
  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: -256, behavior: "smooth" });
  };
  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: 256, behavior: "smooth" });
  };

  return (
    <section
      id="markets"
      className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5"
    >
      <style dangerouslySetInnerHTML={{ __html: globalCSS }} />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-[#10C7F4] mb-5 font-semibold">
            LIVE MARKETS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white mb-4 max-w-3xl">
            The tape, <span className="italic text-[#73DDF5]">live.</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {Object.keys(tabsData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as keyof typeof tabsData)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab
                ? "bg-[#10C7F4] text-[#0B1021] ring-2 ring-[#10C7F4] ring-offset-2 ring-offset-[#050505]"
                : "bg-white/5 text-white/60 hover:bg-[#10C7F4]/[0.12] hover:text-[#10C7F4]"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrolling cards with side arrows */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* LEFT ARROW */}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-sm text-white/80 hover:bg-black/80 hover:text-white transition-all"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* RIGHT ARROW */}
          <button
            type="button"
            aria-label="Scroll right"
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-sm text-white/80 hover:bg-black/80 hover:text-white transition-all"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Cards scroll container */}
          <div
            ref={scrollRef}
            className="tv-scroll-container flex gap-4 w-full overflow-x-auto"
          >
            {scrollSymbols.map((item, index) => (
              <MiniChartCard
                key={`${item.symbol}-${index}`}
                symbol={item.symbol}
              />
            ))}
          </div>
        </div>

        {/* Attribution */}
        <p className="text-center text-xs text-white/40 mt-4">
          Market summary by{" "}
          <a
            href="https://www.tradingview.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/60"
          >
            TradingView
          </a>
        </p>

        <div className="border-t border-white/10 mt-16" />
      </div>
    </section>
  );
}