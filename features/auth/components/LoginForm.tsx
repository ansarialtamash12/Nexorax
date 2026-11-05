"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/auth.schema";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { cn } from "@/lib/utils";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowRight, Check, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isHumanCheckChecked, setIsHumanCheckChecked] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { userid: "", password: "" },
  });

  const login = useLogin();

  const onSubmit = form.handleSubmit((values) => login.mutate(values));

  // Shared input styles
  const inputBase = cn(
    "w-full pl-11 pr-4 py-3 text-sm rounded-lg bg-[#0B1726]/80 border text-white placeholder-slate-500 outline-none transition-all duration-200",
    "focus:border-[#19C8EE]/70 focus:bg-[#102238] focus:ring-2 focus:ring-[#19C8EE]/20"
  );

  return (
    <div
      className="auth-page relative min-h-screen w-full overflow-hidden"
      style={{ background: "var(--auth-page-background)" }}
    >
      {/* Cyan/blue glow from logo (top center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Cyan/blue ambient glow (bottom corners) */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle cyan grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(25,200,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(25,200,238,0.4) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* ═══ Main Card ═══ */}
          <div className="auth-card relative rounded-2xl overflow-hidden border border-[#19C8EE]/20 shadow-[0_0_60px_-15px_rgba(25,200,238,0.3)] backdrop-blur-xl bg-[#081321]/70">

            {/* Cyan gradient top bar */}
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
                    priority
                  />
                </Link>

                {/* "WELCOME BACK" badge — matches landing page style */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#19C8EE]/40 bg-[#19C8EE]/5 mb-4">
                  <Sparkles className="w-3 h-3 text-[#10C7F4]" />
                  <span className="text-[10px] sm:text-xs font-medium tracking-[0.25em] text-[#10C7F4] uppercase">
                    Welcome back
                  </span>
                </div>

                {/* Display heading — Cinzel-style font */}
                <h1
                  className="text-3xl sm:text-4xl font-bold tracking-wide uppercase"
                  style={{
                    fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
                    background: "linear-gradient(180deg, #347DFF 0%, #19C8EE 60%, #155DF5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Sign In
                </h1>

                {/* Subtitle with wide tracking */}
                <p className="mt-3 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-slate-400">
                  Continue your journey
                </p>
              </div>

              <FormProvider {...form}>
                <form onSubmit={onSubmit} className="space-y-5" autoComplete="off">

                  {/* ═══ Credentials Section ═══ */}
                  <div className="rounded-xl bg-[#0B1726]/60 border border-[#19C8EE]/15 p-5">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10C7F4] to-[#155DF5] flex items-center justify-center shadow-[0_0_15px_rgba(25,200,238,0.4)]">
                        <FaLock className="text-[#06121d] text-xs" />
                      </div>
                      <h3 className="text-xs font-semibold tracking-[0.15em] text-[#10C7F4] uppercase">
                        Account Access
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {/* Username */}
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-2">
                          Username <span className="text-[#10C7F4]">*</span>
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                          <input
                            {...form.register("userid")}
                            type="text"
                            autoComplete="userid"
                            placeholder="Enter your userid"
                            className={cn(
                              inputBase,
                              form.formState.errors.userid
                                ? "border-red-500/60 bg-red-500/5"
                                : "border-[#19C8EE]/20"
                            )}
                          />
                        </div>
                        {form.formState.errors.userid && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {form.formState.errors.userid.message}
                          </p>
                        )}
                      </div>

                      {/* Password */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-medium text-slate-300">
                            Password <span className="text-[#10C7F4]">*</span>
                          </label>
                          <Link
                            href="/forgot-password"
                            className="text-[10px] sm:text-xs text-[#10C7F4] hover:text-[#73DDF5] transition-colors tracking-wide"
                          >
                            Forgot?
                          </Link>
                        </div>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                          <input
                            {...form.register("password")}
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            className={cn(
                              inputBase,
                              "pr-12",
                              form.formState.errors.password
                                ? "border-red-500/60 bg-red-500/5"
                                : "border-[#19C8EE]/20"
                            )}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#10C7F4] transition-colors"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                          </button>
                        </div>
                        {form.formState.errors.password && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {form.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#19C8EE]/30 bg-[#0B1726]/40 p-2.5 sm:p-3">
                    <div className="flex min-h-[68px] items-center justify-between gap-3 rounded-xl border border-[#19C8EE]/25 px-3 sm:px-4">
                      <button
                        type="button"
                        aria-pressed={isHumanCheckChecked}
                        aria-describedby="human-check-disclaimer"
                        onClick={() => setIsHumanCheckChecked((checked) => !checked)}
                        className="flex min-h-14 min-w-0 flex-1 items-center gap-3 text-left text-sm text-slate-300 transition-colors hover:text-[#10C7F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19C8EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081321] sm:gap-4 sm:text-base"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                            isHumanCheckChecked
                              ? "border-[#19C8EE] bg-[#19C8EE] text-[#06121d]"
                              : "border-[#19C8EE]/50"
                          )}
                        >
                          {isHumanCheckChecked && <Check className="h-4 w-4" strokeWidth={3} />}
                        </span>
                        <span className="truncate">I&apos;m not a robot</span>
                      </button>
                      <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#10C7F4] sm:gap-2 sm:text-sm">
                        <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                        Privacy
                      </span>
                    </div>
                    <span id="human-check-disclaimer" className="sr-only">
                      This visual checkbox only enables the sign-in button and does not perform CAPTCHA verification.
                    </span>
                  </div>

                  {/* ═══ Submit Button ═══ */}
                  <button
                    type="submit"
                    disabled={login.isPending || !isHumanCheckChecked}
                    className={cn(
                      "relative w-full py-3.5 rounded-lg font-semibold text-sm tracking-[0.15em] uppercase transition-all duration-300 overflow-hidden group",
                      isHumanCheckChecked ? "text-black" : "text-slate-500",
                      "disabled:cursor-not-allowed"
                    )}
                    style={{
                      background: isHumanCheckChecked
                        ? "linear-gradient(135deg, #10C7F4 0%, #19C8EE 50%, #155DF5 100%)"
                        : "#cbd5e1",
                      boxShadow: isHumanCheckChecked
                        ? "0 0 25px rgba(25,200,238,0.35), inset 0 1px 0 rgba(255,255,255,0.3)"
                        : "none",
                    }}
                  >
                    {/* Shimmer effect */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                    <span className="relative flex items-center justify-center gap-2">
                      {login.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </FormProvider>

              {/* ═══ Footer ═══ */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#19C8EE]/40" />
                  <span className="text-[10px] tracking-[0.3em] text-slate-500 uppercase">new here?</span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#19C8EE]/40" />
                </div>
                <p className="text-sm text-slate-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-[#10C7F4] hover:text-[#73DDF5] transition-colors"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Trust footer */}
          <p className="mt-6 text-center text-[10px] tracking-[0.25em] uppercase text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#19C8EE]" />
            Secure encrypted access
          </p>
        </div>

      </div>
    </div>
  );
}