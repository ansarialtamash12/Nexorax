export type Side = "BUY" | "SELL";

export interface Candle { k: number; o: number; h: number; l: number; c: number }

export interface Asset {
  id: string;
  base: number; // starting sample price
  dec: number; // decimals to display
  vol: number; // typical candle movement
  side: Side; // starting demo position
  entry: number; // demo entry price
  size: number; // demo position size
}

// Sample values for the demo terminal only. Not live market data.
export const assets: Asset[] = [
  { id: "BTC/USD", base: 104285, dec: 0, vol: 150, side: "BUY", entry: 104020, size: 0.2 },
  { id: "ETH/USD", base: 3842, dec: 1, vol: 7, side: "BUY", entry: 3832, size: 2 },
  { id: "EUR/USD", base: 1.1742, dec: 4, vol: 0.0006, side: "SELL", entry: 1.1754, size: 10000 },
  { id: "XAU/USD", base: 3876.2, dec: 2, vol: 2.4, side: "BUY", entry: 3865.4, size: 1 },
  { id: "GBP/USD", base: 1.3481, dec: 4, vol: 0.0007, side: "SELL", entry: 1.3491, size: 10000 },
];

export const fmt = (v: number, d = 2) =>
  v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

export const money = (v: number) => `${v >= 0 ? "+" : "-"}$${fmt(Math.abs(v), 2)}`;

const lcg = (seed: number) => () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;

// Deterministic so server and client render the same first frame.
export function seedCandles(a: Asset, n: number): Candle[] {
  const r = lcg(a.id.charCodeAt(0) * 97 + a.id.charCodeAt(4));
  let p = a.base - a.vol * n * 0.3;
  const out: Candle[] = [];
  for (let i = 0; i < n; i++) {
    const o = p;
    const c = o + (r() - 0.42) * a.vol * 1.6;
    const h = Math.max(o, c) + r() * a.vol * 0.7;
    const l = Math.min(o, c) - r() * a.vol * 0.7;
    out.push({ k: i, o, h, l, c });
    p = c;
  }
  const shift = a.base - out[n - 1].c;
  return out.map((k) => ({ ...k, o: k.o + shift, h: k.h + shift, l: k.l + shift, c: k.c + shift }));
}

export const series = (n = 48, seed = 1) =>
  Array.from({ length: n }, (_, i) => ({
    i,
    v: 100 + i * 0.9 + Math.sin(i / 3 + seed) * 6 + Math.cos(i / 1.7 + seed) * 3,
  }));
