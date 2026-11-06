"use client";

import { TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";
import { formatCurrency } from "@/lib/utils";
import { IconBox } from "@/components/common/IconBox";


export function GlobalInfrastructure() {
  const { data } = useDashboardSummary();
  const dashboardData = data?.data?.[0];
  
  const programs = [
    { name: "Trading Account", key: "TradingPackage" },
    { name: "Direct Bonus", key: "DirectBonus" },
    { name: "Binary Bonus", key: "MatchingIncome" },
    { name: "Level Bonus", key: "LevelIncome" },
    { name: "Reward Bonus", key: "RewardBonus" },
  ] as const;

  return (
    <div className="mt-4">
      {/* Header Section */}
      <div className="mb-6 flex items-center gap-3">
        {/* Yahan use kiya */}
        <IconBox icon={TrendingUp} size="sm" className="rounded-xl" />
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white md:text-xl">
            Nexorax{" "}
            <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
              Executing Trades
            </span>
          </h2>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Your live self-trading position.
          </p>
        </div>
      </div>

      <section className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-[#1E293B] dark:bg-[#0b0b0e]">
        {/* Table Header */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] items-center border-b border-gray-100 bg-gray-50/50 px-4 py-3 text-gray-500 dark:border-[#1E293B] dark:bg-[#15151a] dark:text-gray-400 sm:px-6">
          <div className="text-[11px] font-bold uppercase tracking-wider sm:text-xs">Program</div>
          <div className="text-center text-[11px] font-bold uppercase tracking-wider sm:text-xs">Status</div>
          <div className="text-right text-[11px] font-bold uppercase tracking-wider sm:text-xs">Amount</div>
        </div>

        {/* Data Rows */}
        <div className="px-4 sm:px-6">
          {programs.map((program, index) => {
            const value = dashboardData?.[program.key] ?? 0;
            const isStringActive = typeof value === "string" && value === "Active";
            const numericAmount = typeof value === "number" ? value : 0;
            const isActive = isStringActive || numericAmount > 0;

            return (
              <div
                key={program.key}
                className={`grid grid-cols-[1.5fr_1fr_1fr] items-center py-4 text-gray-900 dark:text-white ${
                  index !== programs.length - 1 ? "border-b border-gray-100 dark:border-[#1E293B]" : ""
                }`}
              >
                <div className="text-xs font-semibold sm:text-sm">{program.name}</div>
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide sm:text-[11px] ${
                      isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`} />
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="text-right text-xs font-bold sm:text-sm">
                  {isStringActive ? "Active" : formatCurrency(numericAmount)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deposit Card */}
        <div className="mt-6 flex justify-center p-4 sm:mt-8 sm:p-6">
          <Link
            href="/fund-director"
            aria-label="Go to Self Deposit"
            className="group relative block w-full max-w-[560px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl dark:border-[#1E293B] dark:bg-[#0b0b0e] dark:hover:border-purple-800 sm:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-purple-900/10" />
            <div className="relative z-10 flex flex-col">
              {/* Yahan use kiya */}
              <div className="mx-auto mb-4 sm:mb-5">
                <IconBox icon={ArrowUpRight} size="md" />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
                Deposit to{" "}
                <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
                  Nexorax
                </span>
              </h3>
              <p className="mx-auto mt-2 max-w-[400px] text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
                Trade smarter with a strategy designed to optimize your potential returns.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}