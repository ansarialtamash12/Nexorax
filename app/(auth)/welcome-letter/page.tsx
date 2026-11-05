"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import Image from "next/image";
import { FaExclamationTriangle } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { Loader2, Sparkles } from "lucide-react";

export default function WelcomeLetter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  // Get data from query params (passed from registration)
  const queryEmail = searchParams.get("email");
  const queryFirstName = searchParams.get("firstName");
  const queryLastName = searchParams.get("lastName");

  // Use query params if available, otherwise fallback to auth store
  const userName = queryFirstName
    ? `${queryFirstName} ${queryLastName || ""}`.trim()
    : user?.name?.split(" ")[0] || "User";
  const userEmail = queryEmail || user?.email || "Your registered email";

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      )}
      <div
        className="auth-page relative min-h-screen w-full overflow-hidden"
        style={{
          background: "var(--auth-page-background)",
        }}
      >
        {/* Cyan/blue glow from the NEXORAX palette */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Subtle cyan grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(25,200,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(25,200,238,0.4) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
          <div className="w-full max-w-[530px]">
            {/* ═══ Main Card ═══ */}
            <div className="relative rounded-2xl overflow-hidden border border-[#19C8EE]/25 shadow-[0_0_60px_-15px_rgba(25,200,238,0.2)] backdrop-blur-xl bg-[#0B1021]/85">

              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#19C8EE] to-transparent" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#19C8EE]/40 rounded-tl-2xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#19C8EE]/40 rounded-tr-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#19C8EE]/40 rounded-bl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#19C8EE]/40 rounded-br-2xl pointer-events-none" />

              <div className="p-6 sm:p-8 md:p-10">
                {/* ═══ Header ═══ */}
                <div className="flex flex-col items-center text-center mb-8">
                  <Link href="/" className="mb-5">
                    <Image
                      src="/Nexorax-Purple-Gold-Ribbon-Logo.png"
                      alt="NEXORAX"
                      width={192}
                      height={128}
                      className="h-24 w-auto sm:h-28"
                    />
                  </Link>

                  {/* "WELCOME" badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#19C8EE]/40 bg-[#19C8EE]/5 mb-4">
                    <Sparkles className="w-3 h-3 text-[#19C8EE]" />
                    <span className="text-[10px] sm:text-xs font-medium tracking-[0.25em] text-[#19C8EE] uppercase">
                      Welcome aboard
                    </span>
                  </div>

                  {/* Display heading */}
                  <h1
                    className="text-3xl sm:text-4xl font-bold tracking-wide uppercase"
                    style={{
                      fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
                      background: "linear-gradient(90deg, #347DFF 0%, #19C8EE 55%, #155DF5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Think Smarter. Trade Smarter.
                  </h1>

                  <p className="mt-3 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-slate-400">
                    The future is here
                  </p>
                </div>

                <div className="mb-8 space-y-4 text-start">
                  <p className="text-base leading-relaxed text-slate-300">
                    Welcome to NEXORAX, {userName}!
                    <br />
                    We&apos;re thrilled to have you on board.
                  </p>
                  <p className="text-slate-400">
                    Explore structured Forex and crypto education, AI-powered
                    trading tools, and expert-supervised fund management. Make
                    informed decisions with tools designed to support your
                    learning and trading journey.
                  </p>

                  <p className="text-base leading-relaxed text-slate-300">
                    Learn with structure. Trade with discipline.
                  </p>
                  <p className="text-slate-400">
                    NEXORAX brings education, technology, and risk controls together
                    in one platform.
                  </p>

                  <p className="text-slate-400">
                    🛠️ Your goals. Better tools. Informed decisions.
                    <br></br>
                    Markets involve risk; our tools do not guarantee investment
                    performance or returns.
                  </p>

                  <p className="text-slate-400">
                    Welcome aboard, {userName}. Let&apos;s keep learning and evolving.
                  </p>
                </div>

                <div className="p-5 mb-8 text-left border border-[#19C8EE]/20 rounded-lg bg-[#0B1726]/70">
                  <h3 className="mb-4 text-lg font-bold text-[#19C8EE]">
                    Sign Into Your Account
                  </h3>
                  <div className="grid grid-cols-1 text-sm sm:grid-cols-3 gap-y-3 gap-x-16">
                    <div className="font-semibold text-slate-300">Email</div>
                    <div className="text-slate-400 sm:col-span-2">
                      {userEmail}
                    </div>
                  </div>
                </div>

                <p className="mb-8 text-sm leading-relaxed text-slate-400 sm:text-base text-start">
                  Congratulations! Your account has been successfully created. Check
                  your inbox for an email that includes your login details. Make sure
                  to store this email in a secure place. We appreciate your
                  registration!
                </p>

                <div className="flex flex-col space-y-1">
                  <Link href="/login">
                    <button
                      className="relative w-full py-3.5 rounded-lg font-semibold text-sm tracking-[0.15em] uppercase transition-all duration-300 overflow-hidden group text-[#0B1021]"
                      style={{
                        background: "linear-gradient(135deg, #10C7F4 0%, #19C8EE 45%, #347DFF 100%)",
                        boxShadow: "0 0 25px rgba(25,200,238,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
                      }}
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      <span className="relative flex items-center justify-center gap-2">
                        <FiArrowLeft className="text-xl" />
                        Back to SignIn
                      </span>
                    </button>
                  </Link>

                  <div className="flex items-start gap-3 p-4 border-l-4 rounded-md bg-amber-500/10 border-amber-500/40">
                    <FaExclamationTriangle className="text-amber-500 text-xl mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-snug text-slate-400">
                      Please change your password after logging in for the first time
                      to ensure account security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
