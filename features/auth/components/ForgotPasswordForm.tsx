"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/features/auth/schemas/auth.schema";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import { cn } from "@/lib/utils";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { ArrowLeft, ArrowRight, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { UserId: "", Email: "" },
  });

  const forgotPassword = useForgotPassword();

  const onSubmit = form.handleSubmit((values) => {
    forgotPassword.mutate(values, {
      onSuccess: () => setIsSubmitted(true),
    });
  });

  // Shared input styles
  const inputBase = cn(
    "w-full rounded-lg border bg-bg px-4 py-3 pl-11 pr-4 text-sm text-fg placeholder:text-muted outline-none transition-all duration-200",
    "focus:border-violet focus:ring-2 focus:ring-violet/20"
  );

  return (
    <div
      className="auth-page auth-forgot-page relative min-h-screen w-full overflow-hidden"
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

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
        <div className="w-full max-w-md">

          {/* ═══ Main Card ═══ */}
          <div className="auth-forgot-card relative overflow-hidden rounded-2xl border border-line bg-surface shadow-xl backdrop-blur-xl">

            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-violet to-gold" />

            <div className="auth-forgot-corner pointer-events-none absolute left-0 top-0 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2" />
            <div className="auth-forgot-corner pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-tr-2xl border-r-2 border-t-2" />
            <div className="auth-forgot-corner pointer-events-none absolute bottom-0 left-0 h-16 w-16 rounded-bl-2xl border-b-2 border-l-2" />
            <div className="auth-forgot-corner pointer-events-none absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl border-b-2 border-r-2" />

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

                {/* "RESET PASSWORD" badge */}
                <div className="auth-forgot-badge mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
                  <Sparkles className="auth-forgot-accent h-3 w-3" />
                  <span className="auth-forgot-accent text-[10px] font-medium uppercase tracking-[0.25em] sm:text-xs">
                    Recover Account
                  </span>
                </div>

                {/* Display heading */}
                <h1
                  className="auth-forgot-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl"
                  style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
                >
                  Forgot Password
                </h1>

                {/* Subtitle */}
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted sm:text-xs">
                  Reset your account access
                </p>
              </div>

              {isSubmitted ? (
                // Success state
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet to-gold shadow-lg">
                    <ShieldCheck className="h-8 w-8 text-[#1a1033]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-fg">Check Your Email</h3>
                  <p className="mb-6 text-sm text-muted">
                    We&apos;ve sent a password reset link to your email address.
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet to-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#1a1033] shadow-lg transition-opacity hover:opacity-90"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              ) : (
                // Form state
                <FormProvider {...form}>
                  <form onSubmit={onSubmit} className="space-y-5" autoComplete="off">

                    {/* ═══ Account Details Section ═══ */}
                    <div className="auth-forgot-section rounded-xl border border-line bg-bg2/70 p-5">
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-gold shadow-sm">
                          <FaUser className="text-xs text-[#1a1033]" />
                        </div>
                        <h3 className="auth-forgot-accent text-xs font-semibold uppercase tracking-[0.15em]">
                          Account Details
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {/* UserId */}
                        <div>
                          <label className="mb-2 block text-xs font-medium text-soft">
                            User ID <span className="auth-forgot-accent">*</span>
                          </label>
                          <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm" />
                            <input
                              {...form.register("UserId")}
                              type="text"
                              autoComplete="username"
                              placeholder="Enter your User ID"
                              className={cn(
                                inputBase,
                                form.formState.errors.UserId
                                  ? "border-red-500/60 bg-red-500/5"
                                  : "border-line"
                              )}
                            />
                          </div>
                          {form.formState.errors.UserId && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {form.formState.errors.UserId.message}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="mb-2 block text-xs font-medium text-soft">
                            Email Address <span className="auth-forgot-accent">*</span>
                          </label>
                          <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm" />
                            <input
                              {...form.register("Email")}
                              type="email"
                              autoComplete="email"
                              placeholder="Enter your email"
                              className={cn(
                                inputBase,
                                form.formState.errors.Email
                                  ? "border-red-500/60 bg-red-500/5"
                                  : "border-line"
                              )}
                            />
                          </div>
                          {form.formState.errors.Email && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {form.formState.errors.Email.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ═══ Submit Button ═══ */}
                    <button
                      type="submit"
                      disabled={forgotPassword.isPending}
                      className={cn(
                        "auth-forgot-submit group relative w-full overflow-hidden rounded-lg py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-[#1a1033] transition-opacity duration-300 hover:opacity-90",
                        "disabled:cursor-not-allowed disabled:opacity-60"
                      )}
                    >
                      {/* Shimmer effect */}
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                      <span className="relative flex items-center justify-center gap-2">
                        {forgotPassword.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Reset Link
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </FormProvider>
              )}

              {/* ═══ Footer ═══ */}
              {!isSubmitted && (
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet/40" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-muted">remembered?</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
                  </div>
                  <p className="text-sm text-muted">
                    Back to{" "}
                    <Link
                      href="/login"
                      className="auth-forgot-accent font-semibold transition-colors hover:opacity-75"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Trust footer */}
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] uppercase tracking-[0.25em] text-muted">
            <ShieldCheck className="auth-forgot-accent h-3.5 w-3.5" />
            Secure encrypted access
          </p>
        </div>
      </div>
    </div>
  );
}
