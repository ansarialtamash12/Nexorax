import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "@/providers/Providers";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "NEXORAX | Forex & Crypto Education, Technology & Fund Management",
  description:
    "Nexorax combines Forex and crypto education, AI-powered trading tools and expert-supervised fund management with structured risk controls.",
  openGraph: {
    title: "NEXORAX | Think Smarter. Trade Smarter. Evolve Further.",
    description: "Forex and crypto education, AI-powered tools and expert-supervised fund management.",
    type: "website",
  },
   icons: {
    icon: "/favicon.png", 
    shortcut: "/favicon.png",
    apple: "/favicon.png", 
  },
};

// Light is the default; dark is applied before paint if the visitor chose it earlier.
const themeInit = `try{if(localStorage.getItem("nx-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${manrope.variable} bg-bg text-fg antialiased`}>
        <Providers>{children}</Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
