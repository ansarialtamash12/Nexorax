# NEXORAX

Next.js (App Router), TypeScript, Tailwind CSS 4, Framer Motion, Recharts, Lucide.

```bash
npm install
npm run dev
npm run build
```

The marketing homepage is at `/`. The migrated user portal includes `/login`,
`/register`, and the protected dashboard routes (for example, `/dashboard`).
Set the backend and authentication values from `.env.example` before using
login, registration, or server-backed dashboard features.

## Notes
- Light theme is the default. The sun/moon button in the navbar switches to dark mode and remembers the choice. Colors live as CSS variables in `app/globals.css`.
- The hero terminal (`components/hero-terminal.tsx`) is a simulation with sample prices and demo trades. It is labelled as such on screen. Keep that label.
- Illustrations are SVG in `components/visuals.tsx`. To add real photos, drop files in `public/images/` and use `next/image`.
- The logo mark in `components/ui.tsx` is an SVG stand-in. Replace it with your real Nexorax logo file.
- The contact email `hello@nexorax.com` in `components/more.tsx` is a placeholder.
- The Manrope font loads from Google Fonts at build time, so the build machine needs internet access.
