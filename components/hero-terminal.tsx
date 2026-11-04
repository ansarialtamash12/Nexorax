"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, ShieldCheck } from "lucide-react";
import {
  assets,
  fmt,
  money,
  seedCandles,
  type Asset,
  type Candle,
  type Side,
} from "@/lib/market-data";

const N = 30;
const UP = "#16C784";
const DOWN = "#EA3943";

// 1) Standard production WebSocket (raw stream)
const WS_RAW = "wss://stream.binance.com/ws";
// 2) Fallback: public market-data-only endpoint
const WS_FALLBACK = "wss://data-stream.binance.vision/ws";
const REST_BASE = "https://api.binance.com/api/v3/klines";

// "BTC/USD" -> "BTCUSDT"
const toBinance = (id: string) => `${id.split("/")[0].toUpperCase()}USDT`;

type Pos = { side: Side; entry: number };

const initData = () =>
  Object.fromEntries(assets.map((a) => [a.id, seedCandles(a, N)])) as Record<string, Candle[]>;
const initPos = () =>
  Object.fromEntries(assets.map((a) => [a.id, { side: a.side, entry: a.entry }])) as Record<string, Pos>;
const pnl = (a: Asset, p: Pos, price: number) =>
  (p.side === "BUY" ? price - p.entry : p.entry - price) * a.size;

function CandleChart({ candles, dec }: { candles: Candle[]; dec: number }) {
  const W = 560,
    H = 240,
    pl = 6,
    pr = 72,
    pt = 10,
    pb = 10;
  const lo = Math.min(...candles.map((c) => c.l));
  const hi = Math.max(...candles.map((c) => c.h));
  const span = hi - lo || 1;
  const pad = span * 0.08;
  const y = (v: number) =>
    pt + (1 - (v - (lo - pad)) / (span + pad * 2)) * (H - pt - pb);
  const cw = (W - pl - pr) / candles.length;
  const last = candles[candles.length - 1];
  const T = "y .45s ease, height .45s ease, fill .3s";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Live candlestick chart">
      {[0.2, 0.4, 0.6, 0.8].map((f) => (
        <line key={f} x1={pl} x2={W - pr} y1={pt + f * (H - pt - pb)} y2={pt + f * (H - pt - pb)} stroke="rgba(255,255,255,.07)" />
      ))}
      {candles.map((c, i) => {
        const col = c.c >= c.o ? UP : DOWN;
        return (
          <g key={c.k} style={{ transform: `translateX(${pl + i * cw + cw / 2}px)`, transition: "transform .5s ease" }}>
            <rect x={-1} width={2} y={y(c.h)} height={Math.max(1, y(c.l) - y(c.h))} fill={col} style={{ transition: T }} />
            <rect x={-cw * 0.32} width={cw * 0.64} y={y(Math.max(c.o, c.c))} height={Math.max(2, Math.abs(y(c.o) - y(c.c)))} rx={1.5} fill={col} style={{ transition: T }} />
          </g>
        );
      })}
      <g style={{ transform: `translateY(${y(last.c)}px)`, transition: "transform .45s ease" }}>
        <line x1={pl} x2={W - pr + 4} y1={0} y2={0} stroke="#D6A84F" strokeDasharray="4 4" />
        <rect x={W - pr + 6} y={-10} width={64} height={20} rx={5} fill="#D6A84F" />
        <text x={W - pr + 38} y={4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1a1033">{fmt(last.c, dec)}</text>
      </g>
    </svg>
  );
}

export default function HeroTerminal() {
  const reduce = useReducedMotion();
  const [data, setData] = useState(initData);
  const [pos, setPos] = useState(initPos);
  const [active, setActive] = useState("BTC/USD");
  const [toast, setToast] = useState<{ k: number; side: Side; text: string } | null>(null);
  const [live, setLive] = useState(false);
  const ref = useRef(data);
  useEffect(() => { ref.current = data; }, [data]);

  const open = useCallback((id: string, side: Side) => {
    const arr = ref.current[id];
    setPos((p) => ({ ...p, [id]: { side, entry: arr[arr.length - 1].c } }));
    setToast({ k: Date.now(), side, text: `${side} ${id} opened (demo)` });
  }, []);

  // ----------------- LIVE DATA (REST seed + WebSocket with fallback) -----------------
  useEffect(() => {
    let cancelled = false;
    let ws: WebSocket | null = null;

    const symbols = assets.map((a) => toBinance(a.id));
    const symbolMap = Object.fromEntries(symbols.map((s, i) => [s, assets[i].id])) as Record<string, string>;
    const activeSymbol = toBinance(active); // sirf active asset ke liye stream

    const init = async () => {
      // 1) REST se initial candles
      const results = await Promise.all(
        assets.map(async (a) => {
          try {
            const sym = toBinance(a.id);
            const res = await fetch(`${REST_BASE}?symbol=${sym}&interval=1m&limit=${N}`);
            if (!res.ok) throw new Error(`REST ${sym} ${res.status}`);
            const klines: any[] = await res.json();
            const candles: Candle[] = klines.map((k) => ({
              k: k[0],
              o: parseFloat(k[1]),
              h: parseFloat(k[2]),
              l: parseFloat(k[3]),
              c: parseFloat(k[4]),
            }));
            return [a.id, candles] as const;
          } catch (e) {
            console.warn(`Using seed for ${a.id}:`, e);
            return [a.id, seedCandles(a, N)] as const;
          }
        })
      );
      if (cancelled) return;
      setData(Object.fromEntries(results) as Record<string, Candle[]>);

      // 2) WebSocket connection with fallback
      const connectWS = (baseUrl: string, symbol: string) => {
        const url = `${baseUrl}/${symbol.toLowerCase()}@kline_1m`;
        console.log("Connecting WS:", url);
        const sock = new WebSocket(url);

        sock.onopen = () => {
          if (!cancelled) setLive(true);
        };
        sock.onclose = () => {
          if (!cancelled) setLive(false);
        };
        sock.onerror = (err) => {
          console.error("WS error:", err);
          if (!cancelled) setLive(false);
        };

        sock.onmessage = (ev) => {
          try {
            const msg = JSON.parse(ev.data);
            // Raw stream payload has structure: { e: "kline", k: { ... } }
            const k = msg.k || msg?.data?.k;
            if (!k) return;
            const assetId = symbolMap[k.s];
            if (!assetId) return;

            const close = parseFloat(k.c);
            const high = parseFloat(k.h);
            const low = parseFloat(k.l);

            setData((prev) => {
              const arr = prev[assetId]?.slice();
              if (!arr?.length) return prev;
              const last = { ...arr[arr.length - 1] };
              last.c = close;
              last.h = Math.max(last.h, high);
              last.l = Math.min(last.l, low);
              arr[arr.length - 1] = last;
              if (k.x) {
                arr.push({ k: last.k + 1, o: close, h: close, l: close, c: close });
                if (arr.length > N) arr.shift();
              }
              return { ...prev, [assetId]: arr };
            });
          } catch (e) {
            // ignore parse errors
          }
        };

        return sock;
      };

      // Pehle production raw stream try karein
      ws = connectWS(WS_RAW, activeSymbol);

      // 3) Agar 10 second tak koi message na aaye, fallback endpoint try karein
      const fallbackTimer = setTimeout(() => {
        if (cancelled) return;
        // Agar ws open hai par data nahi aaya, toh fallback
        if (ws && ws.readyState === WebSocket.OPEN) {
          console.warn("No data from primary WS, trying fallback...");
          ws.close();
          ws = connectWS(WS_FALLBACK, activeSymbol);
        }
      }, 10000);

      return () => {
        clearTimeout(fallbackTimer);
      };
    };

    init();

    return () => {
      cancelled = true;
      ws?.close();
    };
  }, [active]); // active change hone par naya stream
  // ---------------------------------------------------------------------

  // Auto demo trades (optional)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const a = assets[Math.floor(Math.random() * assets.length)];
      open(a.id, Math.random() > 0.5 ? "BUY" : "SELL");
    }, 4500);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const a = assets.find((x) => x.id === active)!;
  const candles = data[active];
  const price = candles[candles.length - 1].c;
  const chg = (price / candles[0].o - 1) * 100;
  const total = assets.reduce((s, x) => {
    const arr = data[x.id];
    return s + pnl(x, pos[x.id], arr[arr.length - 1].c);
  }, 0);

  return (
    <div className="relative" role="group" aria-label="Live crypto trading terminal">
      <div className="rounded-3xl border border-white/10 bg-[#0e0722]/95 p-4 text-white shadow-[0_30px_90px_-20px_rgba(124,58,237,.55)] sm:p-5">
        <div className="mb-4 flex items-center justify-between text-xs">
          <span className="flex items-center gap-3">
            <span className="flex gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <i className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <b className="text-[#ddd6ee]">Nexora Terminal</b>
          </span>
          <span className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold tracking-wider">
              <i className={`h-1.5 w-1.5 rounded-full ${live ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
              {live ? "LIVE · BINANCE" : "CONNECTING…"}
            </span>
            <span className="rounded-full border border-[#D6A84F]/50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#D6A84F]">
              DEMO ORDERS
            </span>
          </span>
        </div>

        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-[#9a8fb8]">{a.id}</p>
            <p className="text-2xl font-extrabold tabular-nums sm:text-3xl">{fmt(price, a.dec)}</p>
            <p className="text-xs font-bold tabular-nums" style={{ color: chg >= 0 ? UP : DOWN }}>
              {chg >= 0 ? "▲" : "▼"} {Math.abs(chg).toFixed(2)}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#9a8fb8]">Demo P/L (all positions)</p>
            <p className="text-xl font-extrabold tabular-nums sm:text-2xl" style={{ color: total >= 0 ? UP : "#FF6B73" }}>
              {money(total)}
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-black/30 p-2">
          <CandleChart candles={candles} dec={a.dec} />
          <AnimatePresence>
            {toast && (
              <motion.div
                key={toast.k}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-3 top-3 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold"
                style={{ background: toast.side === "BUY" ? "rgba(22,199,132,.18)" : "rgba(234,57,67,.18)", color: toast.side === "BUY" ? UP : "#FF6B73" }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: toast.side === "BUY" ? UP : DOWN }} />
                {toast.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button onClick={() => open(active, "BUY")} className="rounded-xl bg-[#16C784]/15 py-2.5 text-sm font-bold text-[#16C784] ring-1 ring-[#16C784]/40 transition hover:bg-[#16C784]/25">
            BUY {active}
          </button>
          <button onClick={() => open(active, "SELL")} className="rounded-xl bg-[#EA3943]/15 py-2.5 text-sm font-bold text-[#FF6B73] ring-1 ring-[#EA3943]/40 transition hover:bg-[#EA3943]/25">
            SELL {active}
          </button>
        </div>

        <div className="mt-3 space-y-1">
          {assets.map((x) => {
            const arr = data[x.id];
            const pr = arr[arr.length - 1].c;
            const p = pos[x.id];
            const v = pnl(x, p, pr);
            const on = active === x.id;
            return (
              <button
                key={x.id}
                onClick={() => setActive(x.id)}
                aria-pressed={on}
                className={`grid w-full grid-cols-[1fr_auto_auto_auto] items-center gap-3 rounded-xl px-3 py-2 text-left text-xs sm:text-sm ${on ? "bg-white/10 ring-1 ring-[#D6A84F]/50" : "hover:bg-white/5"}`}
              >
                <span className="font-bold">{x.id}</span>
                <span className="tabular-nums text-[#ddd6ee]">{fmt(pr, x.dec)}</span>
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-extrabold ${p.side === "BUY" ? "bg-[#16C784]/20 text-[#16C784]" : "bg-[#EA3943]/20 text-[#FF6B73]"}`}>
                  {p.side}
                </span>
                <span className="w-16 text-right font-bold tabular-nums" style={{ color: v >= 0 ? UP : "#FF6B73" }}>
                  {money(v)}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[11px] leading-snug text-[#9a8fb8]">
          Prices stream live from Binance via WebSocket. Buy/Sell actions are simulated for demo only.
        </p>
      </div>

      <motion.div
        className="absolute -left-3 top-28 hidden items-center gap-2 rounded-full border border-white/10 bg-[#120a2a] px-3 py-2 text-xs text-white shadow-xl sm:flex"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Bot size={14} className="text-[#D6A84F]" /> AI signal: {active} {pos[active].side}
      </motion.div>
      <motion.div
        className="absolute -right-3 bottom-24 hidden items-center gap-2 rounded-full border border-white/10 bg-[#120a2a] px-3 py-2 text-xs text-white shadow-xl sm:flex"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <ShieldCheck size={14} className="text-[#16C784]" /> Risk controls on
      </motion.div>
    </div>
  );
}