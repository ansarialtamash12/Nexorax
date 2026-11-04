"use client";

import { FiUserPlus } from "react-icons/fi";
import { RiBrainLine } from "react-icons/ri";
import React, { useState } from "react";
import ReferralLink from "./ReferralLink";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";

export const WelcomeBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: dashboardData } = useDashboardSummary();

  // Get data from dashboard API
  const fullName = dashboardData?.data?.[0]?.FullName || user?.name || "";
  const authLogin = dashboardData?.data?.[0]?.AuthLogin || user?.email || "";

  const getInitials = (fullName: string) => {
    if (!fullName) return "";
    const names = fullName.trim().split(/\s+/).filter(Boolean);
    return names.map((name: string) => name[0]).join("").toUpperCase();
  };

  const initials = getInitials(fullName);

  return (
    <div className="relative px-1 py-2 transition-colors duration-300 sm:px-2 md:px-3 lg:px-4 sm:py-3">
      <div className="relative overflow-hidden transition-all duration-300 border shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 rounded-2xl sm:rounded-3xl hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/20">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute w-64 h-64 rounded-full -top-20 -right-20 bg-cyan-400/10 dark:bg-cyan-500/5 blur-3xl"></div>
          <div className="absolute w-64 h-64 rounded-full -bottom-20 -left-20 bg-cyan-400/10 dark:bg-cyan-500/5 blur-3xl"></div>
        </div>

        {/* Gradient line at top */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-cyan-500 to-blue-500"></div>

        <div className="relative p-3 sm:p-4 md:p-5 lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-4">
            {/* Left Section - User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white rounded-full shadow-lg sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 via-cyan-500 to-blue-500 sm:text-base shadow-cyan-500/25">
                    {initials || "U"}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Welcome back</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold capitalize text-gray-800 dark:text-white sm:text-base">
                      {fullName || "User"}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 font-mono border border-cyan-200 dark:border-cyan-700/50">
                      {authLogin || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Action Button */}
            <div className="flex-shrink-0">
              {pathname === "/buy-agent-license" ? (
                <button
                  onClick={() => router.push('/ai-tools')}
                  className="group flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-cyan-600 via-cyan-600 to-blue-600 hover:from-cyan-700 hover:via-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full transition-transform duration-1000 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full"></span>
                  <RiBrainLine size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                  Ai Tools Demo
                </button>
              ) : (
                <button
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 shadow-md shadow-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full transition-transform duration-1000 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full"></span>
                  <FiUserPlus size={18} className="transition-transform duration-300 group-hover:scale-110" />
                  Invite Friends
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Premium */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen px-4 bg-black/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-sky-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-cyan-900/60 dark:bg-[#081321] animate-in slide-in-from-top-4 duration-300">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
              <div className="absolute w-48 h-48 rounded-full -top-20 -right-20 bg-cyan-400/5 dark:bg-cyan-500/5 blur-2xl"></div>
              <div className="absolute w-48 h-48 rounded-full -bottom-20 -left-20 bg-cyan-400/5 dark:bg-cyan-500/5 blur-2xl"></div>
            </div>

            {/* Close Button */}
            <button
              className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-300 rounded-full top-4 right-4 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="relative mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/25">
                  <FiUserPlus className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                    Invite Friends
                  </h3>
                  <p className="text-xs text-cyan-700 sm:text-sm dark:text-cyan-300">
                    Share your referral link and earn rewards
                  </p>
                </div>
              </div>
            </div>

            {/* Referral Link Component */}
            <div className="relative">
              <ReferralLink />
            </div>

            {/* Footer Note */}
            <div className="relative mt-4 border-t border-sky-100 pt-3 dark:border-cyan-900/40">
              <p className="text-center text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">
                Earn rewards for every friend who joins through your link
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
