"use client";

import Script from "next/script";
import type { ElementType } from "react";

const TradingViewMarketData = "tv-market-data" as ElementType;

export function Tryityourself() {
    return (
        <section className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">

            {/* TradingView Market Data Script */}
            <Script
                src="https://widgets.tradingview-widget.com/w/en/tv-market-data.js"
                type="module"
                strategy="afterInteractive"
            />

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)",
                    backgroundSize: "26px 26px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

                {/* Top Heading Section */}
                <div className="text-center mb-14">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#19C8EE] mb-5 font-semibold">
                        TRY IT YOURSELF
                    </p>

                    <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white mb-6">
                        Can you read this chart?
                    </h2>

                    <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
                        Call the move, then see the reasoning — the way our students learn every session.
                    </p>
                </div>

                {/* LIVE MARKET DATA */}
                <div
                    className="rounded-2xl border border-white/10 bg-[#050505] overflow-hidden shadow-2xl"
                    style={{
                        colorScheme: "dark",
                        ["--tv-widget-background-color" as string]: "#050505",
                        ["--tv-widget-text-color" as string]: "#F5F3EE",
                        ["--tv-widget-accent-color" as string]: "#19C8EE",
                        ["--tv-widget-price-text-color" as string]: "#F5F3EE",
                        ["--tv-widget-positive-color" as string]: "#00BFA6",
                        ["--tv-widget-negative-color" as string]: "#F05252",
                        ["--tv-widget-scales-font-color" as string]: "#A1A1AA",
                        ["--tv-widget-popup-background-color" as string]: "#0A0A0A",
                        ["--tv-widget-tooltip-background-color" as string]: "#111111",
                        ["--tv-widget-tooltip-text-color" as string]: "#F5F3EE",
                        ["--tv-widget-border-color" as string]: "rgba(255, 255, 255, 0.08)",
                        ["--tv-widget-header-background-color" as string]: "#0A0A0A",
                        ["--tv-widget-row-hover-color" as string]: "rgba(47, 111, 255, 0.08)",
                        ["--tv-widget-table-background-color" as string]: "#050505",
                        ["--tv-widget-section-background-color" as string]: "#0A0A0A",
                    }}
                >

                    <div className="w-full min-h-[650px]">

                        <TradingViewMarketData
                            color-theme="dark"
                            theme="dark"
                            symbol-sectors={JSON.stringify([
                                {
                                    sectionName: "Indices",
                                    symbols: [
                                        "FOREXCOM:SPXUSD",
                                        "FOREXCOM:NSXUSD",
                                        "FOREXCOM:DJI",
                                        "INDEX:NKY",
                                        "INDEX:DEU40",
                                        "FOREXCOM:UKXGBP",
                                    ],
                                },
                                {
                                    sectionName: "Futures",
                                    symbols: [
                                        "BMFBOVESPA:ISP1!",
                                        "BMFBOVESPA:EUR1!",
                                        "CMCMARKETS:GOLD",
                                        "TVC:USOIL",
                                        "BMFBOVESPA:CCM1!",
                                    ],
                                },
                                {
                                    sectionName: "Bonds",
                                    symbols: [
                                        "EUREX:FGBL1!",
                                        "EUREX:FBTP1!",
                                        "EUREX:FGBM1!",
                                    ],
                                },
                                {
                                    sectionName: "Forex",
                                    symbols: [
                                        "FX:EURUSD",
                                        "FX:GBPUSD",
                                        "FX:USDJPY",
                                        "FX:USDCHF",
                                        "FX:AUDUSD",
                                        "FX:USDCAD",
                                    ],
                                },
                            ])}
                        />

                    </div>

                </div>

            </div>
        </section>
    );
}