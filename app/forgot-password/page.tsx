"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, User, ArrowRight, KeyRound, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Yahan aap apna password reset API call logic likh sakte hain
    console.log("Reset link request for:", { userId, email });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg px-4 py-12 text-fg">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D6A84F]/10 blur-[120px] dark:bg-[#7C3AED]/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[440px] rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-[#0e0722] dark:shadow-2xl sm:p-10"
      >
        {/* Decorative Corner Borders */}
        <div className="absolute left-0 top-0 h-10 w-10 rounded-tl-2xl border-l-2 border-t-2 border-[#D6A84F]"></div>
        <div className="absolute right-0 top-0 h-10 w-10 rounded-tr-2xl border-r-2 border-t-2 border-[#D6A84F]"></div>
        <div className="absolute bottom-0 left-0 h-10 w-10 rounded-bl-2xl border-b-2 border-l-2 border-[#D6A84F]"></div>
        <div className="absolute bottom-0 right-0 h-10 w-10 rounded-br-2xl border-b-2 border-r-2 border-[#D6A84F]"></div>

        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <Link href="/" className="mb-4 flex items-center gap-2">
            <Image
              src="/Nexorax-Purple-Gold-Ribbon-Logo.png"
              alt="Nexorax logo"
              width={160}
              height={40}
              className="h-10 w-auto object-contain dark:hidden"
              priority
            />
            <Image
              src="/Nexorax-Purple-and-Gold-Ribbon-Logo.png"
              alt="Nexorax logo"
              width={160}
              height={40}
              className="hidden h-10 w-auto object-contain dark:block"
              priority
            />
          </Link>

          {/* Recover Account Badge */}
          <div className="mb-4 flex items-center gap-1.5 rounded-full border border-[#D6A84F]/30 bg-[#D6A84F]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#D6A84F]">
            <KeyRound size={12} />
            Recover Account
          </div>

          <h1 className="text-center text-2xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white sm:text-3xl">
            Forgot<br/>Password
          </h1>
          <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Reset Your Account Access
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          
          {/* Account Details Box */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-black/20">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#7C3AED] text-white">
                <User size={14} />
              </div>
              Account Details
            </div>

            {/* User ID */}
            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                User ID <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your User ID"
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#D6A84F] py-3.5 text-sm font-bold uppercase tracking-wider text-[#1a1033] transition-all hover:bg-[#c49743] focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:ring-offset-2 mt-6"
          >
            Send Reset Link
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8">
          <div className="relative mb-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
            </div>
            <span className="relative bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:bg-[#0e0722] dark:text-gray-400">
              Remembered?
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-1.5">
            <ArrowLeft size={14} className="text-gray-400" />
            <Link href="/login" className="text-sm font-semibold text-[#D6A84F] hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>

      </motion.div>
    </div>
  );
}