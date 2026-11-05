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
    "w-full rounded-lg border bg-bg px-4 py-3 pl-11 pr-4 text-sm text-fg placeholder:text-muted outline-none transition-all duration-200",
    "focus:border-violet focus:ring-2 focus:ring-violet/20"
  );

  return (
    <div
      className="auth-page auth-login-page relative min-h-screen w-full overflow-hidden"
    >
      {/* Violet and gold ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet/15 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gold/10 blur-[100px]" />

      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-violet/5 blur-[100px]" />

      {/* Subtle violet grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* ═══ Main Card ═══ */}
          <div className="auth-login-card relative overflow-hidden rounded-2xl border border-line bg-surface shadow-xl backdrop-blur-xl">

            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-violet to-gold" />

            <div className="auth-login-corner pointer-events-none absolute left-0 top-0 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2" />
            <div className="auth-login-corner pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-tr-2xl border-r-2 border-t-2" />
            <div className="auth-login-corner pointer-events-none absolute bottom-0 left-0 h-16 w-16 rounded-bl-2xl border-b-2 border-l-2" />
            <div className="auth-login-corner pointer-events-none absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl border-b-2 border-r-2" />

            <div className="p-6 sm:p-8 md:p-10">

              {/* ═══ Header ═══ */}
              <div className="flex flex-col items-center text-center mb-8">
                <Link href="/" className="mb-5">
                  <Image
                    src="/Nexorax-Purple-Gold-Ribbon-Logo.png"
                    alt="NEXORAX"
                    width={192}
                    height={128}
                    className="h-24 w-auto object-contain dark:hidden sm:h-28"
                    priority
                  />
                  <Image
                    src="/Nexorax-Purple-and-Gold-Ribbon-Logo.png"
                    alt="NEXORAX"
                    width={192}
                    height={128}
                    className="hidden h-24 w-auto object-contain dark:block sm:h-28"
                    priority
                  />
                </Link>

                {/* "WELCOME BACK" badge — matches landing page style */}
                <div className="auth-login-badge mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
                  <Sparkles className="auth-login-accent h-3 w-3" />
                  <span className="auth-login-accent text-[10px] font-medium uppercase tracking-[0.25em] sm:text-xs">
                    Welcome back
                  </span>
                </div>

                {/* Display heading — Cinzel-style font */}
                <h1
                  className="auth-login-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl"
                  style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
                >
                  Sign In
                </h1>

                {/* Subtitle with wide tracking */}
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted sm:text-xs">
                  Continue your journey
                </p>
              </div>

              <FormProvider {...form}>
                <form onSubmit={onSubmit} className="space-y-5" autoComplete="off">

                  {/* ═══ Credentials Section ═══ */}
                  <div className="auth-login-section rounded-xl border border-line bg-bg2/70 p-5">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-gold shadow-sm">
                        <FaLock className="text-xs text-[#1a1033]" />
                      </div>
                      <h3 className="auth-login-accent text-xs font-semibold uppercase tracking-[0.15em]">
                        Account Access
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {/* Username */}
                      <div>
                        <label className="mb-2 block text-xs font-medium text-soft">
                          Username <span className="auth-login-accent">*</span>
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm" />
                          <input
                            {...form.register("userid")}
                            type="text"
                            autoComplete="userid"
                            placeholder="Enter your userid"
                            className={cn(
                              inputBase,
                              form.formState.errors.userid
                                ? "border-red-500/60 bg-red-500/5"
                                : "border-line"
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
                          <label className="block text-xs font-medium text-soft">
                            Password <span className="auth-login-accent">*</span>
                          </label>
                          <Link
                            href="/forgot-password"
                            className="auth-login-accent text-[10px] tracking-wide transition-colors hover:opacity-75 sm:text-xs"
                          >
                            Forgot?
                          </Link>
                        </div>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm" />
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
                                : "border-line"
                            )}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="auth-login-accent absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:opacity-75"
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

                  <div className="auth-login-human-check rounded-2xl border p-2.5 sm:p-3">
                    <div className="flex min-h-[68px] items-center justify-between gap-3 rounded-xl border border-line px-3 sm:px-4">
                      <button
                        type="button"
                        aria-pressed={isHumanCheckChecked}
                        aria-describedby="human-check-disclaimer"
                        onClick={() => setIsHumanCheckChecked((checked) => !checked)}
                        className="auth-login-human-label flex min-h-14 min-w-0 flex-1 items-center gap-3 text-left text-sm transition-colors hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:gap-4 sm:text-base"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                            isHumanCheckChecked
                              ? "border-violet bg-gradient-to-br from-violet to-gold text-[#1a1033]"
                              : "border-violet/50"
                          )}
                        >
                          {isHumanCheckChecked && <Check className="h-4 w-4" strokeWidth={3} />}
                        </span>
                        <span className="truncate">I&apos;m not a robot</span>
                      </button>
                      <span className="auth-login-accent flex shrink-0 items-center gap-1.5 text-xs font-medium sm:gap-2 sm:text-sm">
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
                      "auth-login-submit group relative w-full overflow-hidden rounded-lg py-3.5 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300",
                      isHumanCheckChecked ? "auth-login-submit-enabled text-[#1a1033]" : "auth-login-submit-disabled",
                      "disabled:cursor-not-allowed"
                    )}
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
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet/40" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted">new here?</span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
                </div>
                <p className="text-sm text-muted">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="auth-login-accent font-semibold transition-colors hover:opacity-75"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Trust footer */}
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] uppercase tracking-[0.25em] text-muted">
            <ShieldCheck className="auth-login-accent h-3.5 w-3.5" />
            Secure encrypted access
          </p>
        </div>

      </div>
    </div>
  );
}