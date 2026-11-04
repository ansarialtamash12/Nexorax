"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Menu, X } from "lucide-react";
import { Btn } from "./ui";
import ThemeToggle from "./theme-toggle";
import Image from "next/image";
import Link from "next/link";

const links = ["About", "Fund", "Tools", "Platform", "Education", "Roadmap", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("About");

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const n = links.find((l) => l.toLowerCase() === e.target.id);
            if (n) setActive(n);
          }
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.toLowerCase());
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "border-b border-line bg-bg/80 backdrop-blur-xl" : ""}`}>
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
    
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-fg">
          <Image
            src="/Nexorax-Purple-Gold-Ribbon-Logo.png"
            alt="Nexorax logo"
            width={160} 
            height={40} 
            className="h-8 w-auto object-contain dark:hidden sm:h-10"
            priority
          />
          <Image
            src="/Nexorax-Purple-and-Gold-Ribbon-Logo.png"
            alt="Nexorax logo"
            width={160}
            height={40}
            className="hidden h-8 w-auto object-contain dark:block sm:h-10"
            priority
          />
        </Link>

        <ul className="hidden gap-7 lg:flex">
          {links.map((l) => (
            <li key={l} className="relative">
              <a href={`#${l.toLowerCase()}`} onClick={() => setActive(l)} className="text-sm font-medium text-soft hover:text-fg">
                {l}
              </a>
              {active === l && <motion.span layoutId="nav" className="absolute -bottom-2 left-0 h-0.5 w-full rounded bg-gold" />}
            </li>
          ))}
        </ul>
        
        {/* 💻 DESKTOP MENU */}
        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <Link href="/login" className="text-sm text-soft hover:text-fg">Login</Link>
          
         
          <Btn href="/register">Get Started</Btn>
        </div>

        {/* 📱 MOBILE MENU ICONS */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <Link href="/login" aria-label="Login" className="text-fg">
            <LogIn size={20} />
          </Link>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="text-fg">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* 📱 MOBILE DROPDOWN MENU */}
      {open && (
        <div className="border-t border-line bg-bg/95 px-5 pb-6 backdrop-blur-xl lg:hidden">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block py-3 text-soft">{l}</a>
          ))}
          <div className="mt-3 flex flex-col gap-3">
            
            <Btn href="/register" onClick={() => setOpen(false)} className="w-full">
              Get Started
            </Btn>
            <Btn href="/login" ghost onClick={() => setOpen(false)} className="w-full">
              Login
            </Btn>
          </div>
        </div>
      )}
    </header>
  );
}