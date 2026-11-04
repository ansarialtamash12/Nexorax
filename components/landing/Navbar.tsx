"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useTheme } from "next-themes";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSubmenu = (key: string) => {
    setOpenMobileSubmenu((current) => (current === key ? null : key));
  };

  return (
    <header
      className={`landing-navbar fixed top-0 left-0 right-0 z-50 w-full text-white transition-all duration-300 ${isScrolled
        ? "bg-black/60 backdrop-blur-md border-b border-white/10 shadow-lg"
        : "bg-gradient-to-b from-black/70 via-black/30 to-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 h-24 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={
              theme === "light"
                ? "/Nexorax-Purple-Gold-Ribbon-Logo.png"
                : "/Nexorax-Purple-and-Gold-Ribbon-Logo.png"
            }
            alt="NEXORAX — forex education and training"
            width={180}
            height={72}
            priority
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-[15px] font-medium">

          {/* 1. Company Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-8 text-white group-hover:text-[#10C7F4] transition-colors">
              About
              <ChevronDownIcon className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-2 top-[84px] bg-white border border-black/[0.08] rounded-xl shadow-xl py-2 min-w-[200px] hidden group-hover:block">
              <Link href="#about" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]"> NEXORAX</Link>
              <Link href="#why" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Why NEXORAX</Link>
              <Link href="#mentors" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Mentors</Link>
              <Link href="#careers" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Careers</Link>
              <Link href="#contact" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Contact</Link>
            </div>
          </div>

          {/* 2. Curriculum Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-8 text-white group-hover:text-[#10C7F4] transition-colors">
              Curriculum
              <ChevronDownIcon className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-2 top-[84px] bg-white border border-black/[0.08] rounded-xl shadow-xl py-2 min-w-[220px] hidden group-hover:block">
              <Link href="#phase-01" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Forex Foundations</Link>
              <Link href="#phase-02" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Technical Analysis</Link>
              <Link href="#phase-03" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Macro & Fundamentals</Link>
              <Link href="#phase-04" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Risk & Position Sizing</Link>
              <Link href="#phase-05" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Trading Psychology</Link>
              <Link href="#phase-06" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Applied Practice Lab</Link>
            </div>
          </div>

          {/* 3. Markets Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-8 text-white group-hover:text-[#10C7F4] transition-colors">
              Markets
              <ChevronDownIcon className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-2 top-[84px] bg-white border border-black/[0.08] rounded-xl shadow-xl py-2 min-w-[200px] hidden group-hover:block">
              <Link href="#markets" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Majors</Link>
              <Link href="#markets" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Minors & Exotics</Link>
              <Link href="#markets" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Gold & Commodities</Link>
            </div>
          </div>

          {/* 4. Learn Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-8 text-white group-hover:text-[#10C7F4] transition-colors">
              Learn
              <ChevronDownIcon className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-2 top-[84px] bg-white border border-black/[0.08] rounded-xl shadow-xl py-2 min-w-[200px] hidden group-hover:block">
              <Link href="#faq" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">FAQs</Link>
              <Link href="#curriculum" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]">Curriculum guide</Link>
              <Link href="#about" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#10C7F4]/[0.06] hover:text-[#10C7F4]"> NEXORAX</Link>
            </div>
          </div>

          {/* Simple Links */}
          <Link href="#faq" className="px-4 py-8 text-white hover:text-[#10C7F4] transition-colors">FAQ</Link>
          <Link href="#contact" className="px-4 py-8 text-white hover:text-[#10C7F4] transition-colors">Contact</Link>
          <ThemeToggle className="mx-1 h-9 w-9 border-white/20 bg-white/5 text-white hover:bg-white/10 dark:text-cyan-300" />
          <Link href="/login" className="rounded-lg bg-[#10C7F4] px-4 py-2.5 text-white transition-colors hover:bg-[#079FCB]">Sign In</Link>
          <Link href="/register" className="rounded-lg bg-[#10C7F4] px-4 py-2.5 text-white transition-colors hover:bg-[#079FCB]">Onboard</Link>

        </nav>


        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2">
            <ThemeToggle className="border-white/20 bg-white/5 text-white hover:bg-white/10 dark:text-cyan-300" />
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              className="p-2 text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div
              id="mobile-navigation"
              className="fixed inset-x-0 top-0 z-[60] max-h-[100dvh] overflow-y-auto border-b border-black/[0.08] bg-white text-[#0B1440] shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-black/[0.08] px-6 py-4">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="shrink-0">
                  <Image
                    src={
                      theme === "light"
                        ? "/Nexorax-Purple-Gold-Ribbon-Logo.png"
                        : "/Nexorax-Purple-and-Gold-Ribbon-Logo.png"
                    }
                    alt="NEXORAX — forex education and training"
                    width={180}
                    height={72}
                    className="h-14 w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] text-[#0B1440] transition-colors hover:bg-black/[0.04]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav aria-label="Mobile navigation" className="px-6 py-3">
                <div className="flex flex-col text-[15px] text-[#0B1440]/80">

                  {/* Company */}
                  <div className="border-b border-black/[0.06]">
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu("company")}
                      className="flex w-full items-center justify-between py-3.5 text-left transition-colors hover:text-[#10C7F4]"
                    >
                      Company
                      <ChevronDown
                        className={`h-4 w-4 opacity-60 transition-transform duration-200 ${openMobileSubmenu === "company" ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    {openMobileSubmenu === "company" && (
                      <div className="flex flex-col pb-2 pl-4">
                        <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]"> NEXORAX</Link>
                        <Link href="#why" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Why NEXORAX</Link>
                        <Link href="#mentors" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Mentors</Link>
                        <Link href="#careers" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Careers</Link>
                        <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Contact</Link>
                      </div>
                    )}
                  </div>

                  {/* Curriculum */}
                  <div className="border-b border-black/[0.06]">
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu("curriculum")}
                      className="flex w-full items-center justify-between py-3.5 text-left transition-colors hover:text-[#10C7F4]"
                    >
                      Curriculum
                      <ChevronDown
                        className={`h-4 w-4 opacity-60 transition-transform duration-200 ${openMobileSubmenu === "curriculum" ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    {openMobileSubmenu === "curriculum" && (
                      <div className="flex flex-col pb-2 pl-4">
                        <Link href="#phase-01" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Forex Foundations</Link>
                        <Link href="#phase-02" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Technical Analysis</Link>
                        <Link href="#phase-03" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Macro & Fundamentals</Link>
                        <Link href="#phase-04" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Risk & Position Sizing</Link>
                        <Link href="#phase-05" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Trading Psychology</Link>
                        <Link href="#phase-06" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Applied Practice Lab</Link>
                      </div>
                    )}
                  </div>

                  {/* Markets */}
                  <div className="border-b border-black/[0.06]">
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu("markets")}
                      className="flex w-full items-center justify-between py-3.5 text-left transition-colors hover:text-[#10C7F4]"
                    >
                      Markets
                      <ChevronDown
                        className={`h-4 w-4 opacity-60 transition-transform duration-200 ${openMobileSubmenu === "markets" ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    {openMobileSubmenu === "markets" && (
                      <div className="flex flex-col pb-2 pl-4">
                        <Link href="#markets" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Majors</Link>
                        <Link href="#markets" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Minors & Exotics</Link>
                        <Link href="#markets" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Gold & Commodities</Link>
                      </div>
                    )}
                  </div>

                  {/* Learn */}
                  <div className="border-b border-black/[0.06]">
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu("learn")}
                      className="flex w-full items-center justify-between py-3.5 text-left transition-colors hover:text-[#10C7F4]"
                    >
                      Learn
                      <ChevronDown
                        className={`h-4 w-4 opacity-60 transition-transform duration-200 ${openMobileSubmenu === "learn" ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    {openMobileSubmenu === "learn" && (
                      <div className="flex flex-col pb-2 pl-4">
                        <Link href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">FAQs</Link>
                        <Link href="#curriculum" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">Curriculum guide</Link>
                        <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-[#0B1440]/70 hover:text-[#10C7F4]">NEXORAX</Link>
                      </div>
                    )}
                  </div>


                  <Link
                    href="#faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="border-b border-black/[0.06] py-3.5 transition-colors hover:text-[#10C7F4]"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="border-b border-black/[0.06] py-3.5 transition-colors hover:text-[#10C7F4]"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="my-3 rounded-lg border border-[#10C7F4] px-4 py-3 text-center font-semibold text-[#B77908] transition-colors hover:bg-[#10C7F4]/10"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="my-3 rounded-lg bg-[#10C7F4] px-4 py-3 text-center font-semibold text-[#0B1021] transition-colors hover:bg-[#079FCB]"
                  >
                    Enroll now
                  </Link>

                </div>
              </nav>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}

// --- Static SVG Icons ---
function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`opacity-60 ${className}`}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}