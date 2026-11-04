"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export function Banner() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  return (
    <div
      className="relative mb-4 flex min-h-[380px] items-center overflow-hidden rounded-3xl border border-cyan-400/30 p-6 sm:p-10 lg:p-14"
      style={{
        borderColor: isDark
          ? "rgba(25, 200, 238, 0.35)"
          : "rgba(25, 200, 238, 0.45)",
      }}
    >
      <Image
        src="/images/academy-learning-illustration.svg"
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 80vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-r from-[#06111f]/95 via-[#06111f]/80 to-[#06111f]/35"
            : "bg-gradient-to-r from-[#06111f]/90 via-[#06111f]/75 to-[#06111f]/30"
        }`}
      />

      <div className="pointer-events-none absolute right-[4%] top-1/2 hidden aspect-square w-[min(42vw,460px)] -translate-y-1/2 md:block">
        <div className="dashboard-banner-orbit absolute inset-0 rounded-full border-2 border-dashed border-cyan-300/60" />
        <div className="absolute inset-[8%] flex items-center justify-center rounded-full bg-cyan-300/5">
          <div className="w-[82%] rounded-2xl border border-cyan-300/50 bg-[#071B2B]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-cyan-200 sm:text-xs">
                Market analysis
              </span>
              <span className="flex items-center gap-1.5 text-[8px] font-medium uppercase tracking-wide text-slate-300 sm:text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Price action
              </span>
            </div>
            <svg
              viewBox="0 0 320 180"
              className="h-auto w-full"
              role="img"
              aria-label="Illustrative trading chart with a rising price trend"
            >
              <defs>
                <linearGradient id="dashboard-chart-line" x1="20" y1="150" x2="300" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#347DFF" />
                  <stop offset=".55" stopColor="#19C8EE" />
                  <stop offset="1" stopColor="#8AEAFF" />
                </linearGradient>
                <linearGradient id="dashboard-chart-fill" x1="160" y1="30" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#19C8EE" stopOpacity=".24" />
                  <stop offset="1" stopColor="#19C8EE" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M24 24H296M24 68H296M24 112H296M24 156H296M70 18V156M116 18V156M162 18V156M208 18V156M254 18V156" stroke="#9CC8E8" strokeOpacity=".16" />
              <path d="m24 132 42-28 38 12 38-42 38 16 42-48 38 18 36-32v128H24V132Z" fill="url(#dashboard-chart-fill)" />
              <path d="m24 132 42-28 38 12 38-42 38 16 42-48 38 18 36-32" stroke="url(#dashboard-chart-line)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
              <circle cx="296" cy="28" r="5" fill="#8AEAFF" />
            </svg>
            <div className="mt-2 flex items-center justify-between text-[8px] font-medium tracking-wide text-slate-400 sm:mt-3 sm:text-[10px]">
              <span>Market structure</span>
              <span>Trend analysis</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-2 top-[12%] z-10 w-[142px] overflow-hidden rounded-xl border-2 border-cyan-300/70 bg-[#071B2B]/95 px-3 py-2.5 text-center shadow-xl sm:-right-3 sm:w-[158px] sm:py-3">
          <span className="mb-1.5 block text-[8px] font-bold uppercase tracking-[0.15em] text-cyan-200 sm:text-[9px]">
            NEXORAX Academy
          </span>
          <div className="dashboard-banner-topic-window h-5 overflow-hidden text-[11px] font-semibold text-white sm:text-xs">
            <div className="dashboard-banner-topic-ticker">
              <span>Forex foundations</span>
              <span>Chart reading</span>
              <span>Risk management</span>
              <span>Market analysis</span>
              <span>Forex foundations</span>
            </div>
          </div>
        </div>
        <Link
          href="/ai-business-hub"
          className="pointer-events-auto absolute -bottom-1 left-0 flex min-h-[68px] w-[132px] items-center justify-center rounded-xl border-2 border-cyan-300/70 bg-[#071B2B]/95 px-3 py-2 text-center text-sm font-bold text-cyan-200 shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:-left-3 sm:w-[148px] sm:text-base"
        >
          IB Portal
        </Link>
      </div>

      <div className="relative z-20 max-w-xl text-white md:max-w-[54%]">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-300/10 px-3.5 py-2 text-[10px] font-semibold tracking-[0.16em] text-[#9BEAF8] sm:text-xs">
          <span className="h-2 w-2 rounded-full bg-[#10C7F4]" />
          NEXORAX ACADEMY
        </div>

        <h1
          className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          Build your knowledge.
          <span className="block bg-gradient-to-r from-[#73DDF5] via-[#19C8EE] to-[#347DFF] bg-clip-text text-transparent">
            Trade with confidence.
          </span>
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-slate-200 sm:text-base">
          Learn the markets step by step with practical lessons designed to
          help you make more informed decisions.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#19C8EE] to-[#347DFF] px-5 py-3 text-sm font-semibold text-[#06111f] shadow-lg shadow-cyan-950/30 transition-transform hover:scale-[1.03]"
          >
            Explore Academy
            <span aria-hidden="true">→</span>
          </Link>
          <p className="text-xs font-medium tracking-wide text-slate-300 sm:text-sm">
            Learn at your pace · Grow your skills
          </p>
        </div>
      </div>
    </div>
  );
}
