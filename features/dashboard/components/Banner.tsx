"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type TradingViewWidgetProps = {
  scriptName: string;
  config: Record<string, unknown>;
  className?: string;
};

function TradingViewWidget({
  scriptName,
  config,
  className,
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.replaceChildren();

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.height = "100%";
    widget.style.width = "100%";

    const script = document.createElement("script");
    script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${scriptName}.js`;
    script.async = true;
    script.type = "text/javascript";
    script.textContent = JSON.stringify(config);

    container.append(widget, script);

    return () => {
      container.replaceChildren();
    };
  }, [config, scriptName]);

  return (
    <div
      ref={containerRef}
      className={`tradingview-widget-container ${className ?? ""}`}
    />
  );
}

const chartSymbols = {
  BTC: "BINANCE:BTCUSDT",
  ETH: "BINANCE:ETHUSDT",
  BNB: "BINANCE:BNBUSDT",
  SOL: "BINANCE:SOLUSDT",
  XRP: "BINANCE:XRPUSDT",
  ADA: "BINANCE:ADAUSDT",
} as const;

const marketCards = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "BNB", name: "BNB" },
] as const;

function LivePriceCard({
  symbol,
  name,
}: {
  symbol: keyof typeof chartSymbols;
  name: string;
}) {
  const config = useMemo(
    () => ({
      symbol: chartSymbols[symbol],
      width: "100%",
      height: "100%",
      locale: "en",
      dateRange: "1D",
      colorTheme: "dark",
      isTransparent: true,
      autosize: true,
    }),
    [symbol],
  );

  return (
    <div
      className="min-w-0 overflow-hidden rounded-xl border border-violet-400/25 bg-[#100b25]/95 p-1.5 sm:p-2"
      aria-label={`${name} live price chart`}
    >
      <TradingViewWidget
        scriptName="mini-symbol-overview"
        config={config}
        className="h-[68px] w-full sm:h-[76px] lg:h-full lg:min-h-0"
      />
    </div>
  );
}

export function Banner() {
  const [selectedSymbol, setSelectedSymbol] =
    useState<keyof typeof chartSymbols>("BTC");
  const chartConfig = useMemo(
    () => ({
      autosize: true,
      symbol: chartSymbols[selectedSymbol],
      interval: "15",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: false,
      hide_top_toolbar: true,
      hide_legend: true,
      hide_side_toolbar: true,
      hide_volume: true,
      withdateranges: false,
      save_image: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
    }),
    [selectedSymbol],
  );

  return (
    <section className="mb-6 space-y-5">
      <div className="relative aspect-[1365/768] overflow-hidden rounded-3xl">
        <Image
          src="/images/dashboard-hero-banner.png"
          alt="Nexorax Academy and Trading Hub: learn trading, trade the markets, and exchange P2P."
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
        />
        <div
          aria-label={`Live ${selectedSymbol}/USDT TradingView candlestick chart`}
          className="absolute left-[46.7%] top-[21.2%] z-[1] hidden h-[41%] w-[29.8%] overflow-hidden lg:block"
          style={{
            clipPath: "polygon(10% 16%, 100% 0, 90% 91%, 0 100%)",
          }}
        >
          <TradingViewWidget
            scriptName="advanced-chart"
            config={chartConfig}
            className="h-full w-full"
          />
        </div>
        <div
          role="group"
          aria-label="Select chart market"
          className="absolute left-[57.5%] top-[29.5%] z-[2] hidden h-[5.2%] w-[16.7%] grid-cols-6 items-center gap-[1%] rounded-full border border-violet-300/25 bg-[#100b25]/95 p-[0.3%] lg:grid"
        >
          {(Object.keys(chartSymbols) as Array<keyof typeof chartSymbols>).map(
            (symbol) => (
              <button
                key={symbol}
                type="button"
                aria-label={`Show ${symbol}/USDT chart`}
                aria-pressed={selectedSymbol === symbol}
                onClick={() => setSelectedSymbol(symbol)}
                className={`flex h-full min-w-0 items-center justify-center rounded-full text-[clamp(5px,0.55vw,8px)] font-bold leading-none transition ${
                  selectedSymbol === symbol
                    ? "bg-violet-600 text-white"
                    : "text-slate-200 hover:bg-white/15"
                }`}
              >
                {symbol}
              </button>
            ),
          )}
        </div>
        <div
          role="group"
          aria-label="Live BTC, ETH, and BNB prices"
          className="absolute left-[47.4%] top-[65.1%] hidden h-[13.2%] w-[49.5%] grid-cols-3 gap-[1.2%] lg:grid"
        >
          {marketCards.map((market) => (
            <LivePriceCard
              key={market.symbol}
              symbol={market.symbol}
              name={market.name}
            />
          ))}
        </div>
        <Link
          href="/ai-business-hub"
          aria-label="Fund Business Dashboard"
          className="absolute left-[3.96%] top-[71%] flex h-[7.55%] w-[16.48%] items-center justify-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-amber-400 px-1 text-center text-[clamp(7px,0.82vw,12px)] font-bold leading-tight text-white shadow-lg transition hover:brightness-110 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:px-2"
        >
          <span className="sm:hidden">Fund</span>
          <span className="hidden whitespace-nowrap sm:inline">
            Business Dashboard
          </span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/academy"
          aria-label="Explore the Academy"
          className="absolute left-[21.9%] top-[71%] hidden h-[7.2%] w-[17.3%] rounded-full focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-violet-400 lg:block"
        />
      </div>

      <div className="flex flex-wrap gap-3 lg:hidden">
        <Link
          href="/ai-business-hub"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-amber-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110"
        >
          Fund Business Dashboard
        </Link>
        <Link
          href="/academy"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-violet-300 px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 dark:border-violet-400/50 dark:text-violet-200 dark:hover:bg-violet-400/10"
        >
          Explore Academy
        </Link>
      </div>

      <div
        role="group"
        aria-label="Live BTC, ETH, and BNB prices"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:hidden"
      >
        {marketCards.map((market) => (
          <LivePriceCard
            key={market.symbol}
            symbol={market.symbol}
            name={market.name}
          />
        ))}
      </div>

      <section
        aria-labelledby="dashboard-live-chart-title"
        className="overflow-hidden rounded-2xl border border-violet-400/25 bg-[#100b25] p-4 lg:hidden"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="dashboard-live-chart-title"
              className="text-base font-bold text-white"
            >
              Live {selectedSymbol}/USDT Chart
            </h2>
            <p className="mt-1 text-xs text-slate-300">
              Real-time TradingView market chart
            </p>
          </div>
          <div aria-label="Select chart market" className="flex gap-1">
            {(Object.keys(chartSymbols) as Array<keyof typeof chartSymbols>).map(
              (symbol) => (
                <button
                  key={symbol}
                  type="button"
                  aria-pressed={selectedSymbol === symbol}
                  onClick={() => setSelectedSymbol(symbol)}
                  className={`min-h-9 rounded-md px-3 text-sm font-semibold transition ${
                    selectedSymbol === symbol
                      ? "bg-violet-600 text-white"
                      : "bg-white/10 text-slate-200 hover:bg-white/20"
                  }`}
                >
                  {symbol}
                </button>
              ),
            )}
          </div>
        </div>
        <TradingViewWidget
          scriptName="advanced-chart"
          config={chartConfig}
          className="h-[320px] w-full sm:h-[400px]"
        />
      </section>

    </section>
  );
}
