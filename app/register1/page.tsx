"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Eye, EyeOff, Mail, Lock, ShieldCheck, ArrowRight, Sparkles, 
  User, Phone, Globe, Users, Shield, Check 
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [placement, setPlacement] = useState<"Left" | "Right">("Left");
  
  // Form State
  const [formData, setFormData] = useState({
    referralId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    country: "India",
    countryCode: "+91",
    password: "",
    agreeTerms: false,
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt:", { ...formData, placement });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg px-4 py-12 text-fg">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D6A84F]/10 blur-[120px] dark:bg-[#7C3AED]/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[700px] rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#0e0722] dark:shadow-2xl sm:p-10"
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

          <div className="mb-4 flex items-center gap-1.5 rounded-full border border-[#D6A84F]/30 bg-[#D6A84F]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#D6A84F]">
            <Sparkles size={12} />
            Join The New Era
          </div>

          <h1 className="text-2xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white sm:text-3xl">
            Create Account
          </h1>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Powering the Future of Wealth
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* 📌 SECTION 1: Referral & Placement */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-black/20">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#7C3AED] text-white">
                <Users size={14} />
              </div>
              Referral & Placement
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Referral ID */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Referral ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Users size={16} />
                  </div>
                  <input
                    type="text"
                    name="referralId"
                    required
                    value={formData.referralId}
                    onChange={handleChange}
                    placeholder="Enter Referral ID"
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Placement Toggle */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Placement Side <span className="text-red-500">*</span>
                </label>
                <div className="flex rounded-lg bg-gray-200 p-1 dark:bg-black/40">
                  <button
                    type="button"
                    onClick={() => setPlacement("Left")}
                    className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all ${
                      placement === "Left"
                        ? "bg-[#D6A84F] text-[#1a1033] shadow-sm"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    Left Team
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlacement("Right")}
                    className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all ${
                      placement === "Right"
                        ? "bg-[#D6A84F] text-[#1a1033] shadow-sm"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    Right Team
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 📌 SECTION 2: Personal Information */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-black/20">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#7C3AED] text-white">
                <User size={14} />
              </div>
              Personal Information
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* First Name */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">First Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><User size={16} /></div>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="John" className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400" />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">Last Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><User size={16} /></div>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Doe" className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Mail size={16} /></div>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400" />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">Mobile Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Phone size={16} /></div>
                  <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} placeholder="0000000000" className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400" />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">Country <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Globe size={16} /></div>
                  <input type="text" name="country" required value={formData.country} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400" />
                </div>
              </div>

              {/* Country Code */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">Country Code <span className="text-red-500">*</span></label>
                <input type="text" name="countryCode" required value={formData.countryCode} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Lock size={16} /></div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-10 text-sm text-gray-900 outline-none transition-colors focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] dark:border-gray-600 dark:bg-black/20 dark:text-white dark:placeholder-gray-400"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                required
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-[#D6A84F] checked:bg-[#D6A84F] dark:border-gray-600 dark:bg-black/20"
              />
              <Check size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1a1033] opacity-0 peer-checked:opacity-100" />
            </div>
            <label className="text-xs text-gray-600 dark:text-gray-400">
              I agree to the <Link href="#" className="text-[#D6A84F] hover:underline">Terms & Conditions</Link> and <Link href="#" className="text-[#D6A84F] hover:underline">Privacy Policy</Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#D6A84F] py-3.5 text-sm font-bold uppercase tracking-wider text-[#1a1033] transition-all hover:bg-[#c49743] focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:ring-offset-2"
          >
            Create Account
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
              OR
            </span>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#D6A84F] hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Bottom Secure Tag */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          <Shield size={12} />
          Your data is encrypted & secure
        </div>

      </motion.div>
    </div>
  );
}