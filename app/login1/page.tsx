"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Lock, ShieldCheck, ArrowRight, Sparkles, Shield } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
  };

  return (
    // bg-bg aapki site ka main background uthayega (light ya dark)
    <div className="relative flex min-h-screen items-center justify-center bg-bg px-4 py-12 text-fg">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D6A84F]/10 blur-[120px] dark:bg-[#7C3AED]/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // Card background: Light mode me white, Dark mode me dark purple
        className="relative w-full max-w-[440px] rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-[#0e0722] dark:shadow-2xl sm:p-10"
      >
        {/* Decorative Corner Borders */}
        <div className="absolute left-0 top-0 h-10 w-10 rounded-tl-2xl border-l-2 border-t-2 border-[#D6A84F]"></div>
        <div className="absolute right-0 top-0 h-10 w-10 rounded-tr-2xl border-r-2 border-t-2 border-[#D6A84F]"></div>
        <div className="absolute bottom-0 left-0 h-10 w-10 rounded-bl-2xl border-b-2 border-l-2 border-[#D6A84F]"></div>
        <div className="absolute bottom-0 right-0 h-10 w-10 rounded-br-2xl border-b-2 border-r-2 border-[#D6A84F]"></div>

        {/* Logo Section */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <Link href="/" className="mb-4 flex items-center gap-2">
            {/* LIGHT LOGO */}
            <Image
              src="/Nexorax-Purple-Gold-Ribbon-Logo.png" // Yahan apna Light logo dalein
              alt="Nexorax logo"
              width={160}
              height={40}
              className="h-10 w-auto object-contain dark:hidden"
              priority
            />
            {/* DARK LOGO */}
            <Image
              src="/Nexorax-Purple-and-Gold-Ribbon-Logo.png" // Yahan apna Dark logo dalein
              alt="Nexorax logo"
              width={160}
              height={40}
              className="hidden h-10 w-auto object-contain dark:block"
              priority
            />
          </Link>

          {/* Welcome Badge */}
          <div className="mb-4 flex items-center gap-1.5 rounded-full border border-[#D6A84F]/30 bg-[#D6A84F]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#D6A84F]">
            <Sparkles size={12} />
            Welcome Back
          </div>

          <h1 className="text-3xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white">
            Sign In
          </h1>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Continue Your Journey
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Account Access Box */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-black/20">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#7C3AED] text-white">
                <Lock size={14} />
              </div>
              Account Access
            </div>

            {/* Username */}
            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your userid"
                  // Yahan inputs ko light me white aur dark me transparent kiya hai
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Password <span className="text-red-500">*</span>
                </label>
                <Link href="/forgot-password" className="text-xs font-medium text-[#D6A84F] hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-10 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Captcha / Privacy Box */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-black/20">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="not-robot"
                className="h-5 w-5 rounded border-gray-300 accent-[#D6A84F] dark:border-gray-600 dark:bg-black/20"
              />
              <label htmlFor="not-robot" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                I'm not a robot
              </label>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D6A84F]">
              <ShieldCheck size={16} />
              Privacy
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#D6A84F] py-3.5 text-sm font-bold uppercase tracking-wider text-[#1a1033] transition-all hover:bg-[#c49743] focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:ring-offset-2"
          >
            Sign In
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
              New Here?
            </span>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-[#D6A84F] hover:underline">
              Create account
            </Link>
          </p>
        </div>

        {/* Bottom Secure Tag */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          <Shield size={12} />
          Secure Encrypted Access
        </div>

      </motion.div>
    </div>
  );
}