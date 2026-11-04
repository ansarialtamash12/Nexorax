"use client";

import { useEffect, useRef, useState } from "react";
// import { NftSection } from "@/app/components/NftSection";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
// import { getPageName } from "@/app/utils/utils";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";

// Import icons
import { FaCalendarAlt } from "react-icons/fa";

import {
  RiTimerLine,
  RiLineChartLine,
  RiFlowChart,
  RiRocketLine,
  RiShareLine,
  RiAwardLine,
  RiGroupLine,
  RiBankCardLine,
  RiMoneyDollarCircleLine,
  RiUserStarLine,
  RiTeamLine,
  RiKeyLine,
  RiBarChartLine,
  RiBriefcaseLine,
} from "react-icons/ri";
import { ExternalLink, Link, PercentIcon } from "lucide-react";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ---------- Count-up hook ----------
function useCountUp(endValue: number, duration = 1000) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startValueRef = useRef(0);

  useEffect(() => {
    const target = Number(endValue) || 0;
    const startValue = startValueRef.current;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = startValue + (target - startValue) * progress;
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(target);
        startValueRef.current = target;
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endValue, duration]);

  return value;
}

function useCountUpAny(rawValue: string | number | undefined | null, duration = 1000) {
  const [display, setDisplay] = useState(rawValue ?? "");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rawValue === undefined || rawValue === null || rawValue === "") {
      setDisplay(rawValue ?? "");
      return;
    }

    const str = String(rawValue);
    const match = str.match(/^(-?\d+(\.\d+)?)/);

    if (!match || !match[1]) {
      setDisplay(str);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = str.slice(match[1].length);
    const decimals = match[1].includes(".") ? (match[1].split(".")[1]?.length || 0) : 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = target * progress;
      setDisplay(current.toFixed(decimals) + suffix);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(target.toFixed(decimals) + suffix);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawValue, duration]);

  return display;
}

interface AffiliateSummary {
  BoosterRemDateTime?: string;
  TotalInvestment?: number;
  TotalEarning?: number;
  EarningLimit?: number;
  RemainingLimit?: number;
  ActiveDirectMembers?: number;
  DirectBusiness?: number;
  LeftTeam?: number;
  RightTeam?: number;
  Subscription?: number;
  ROIAmt?: number;
  MatchingIncome?: number;
  RankBonus?: number;
  PerformanceWithdrawal?: number;
  YieldWithdrawal?: number;
  TradingPackage?: number;
  RebornPacakge?: number;
  LeftBusvolume?: number;
  RightBusvolume?: number;
  Reborn2Pacakge?: number;
  LeadershipRank?: string;
  Levelopen?: number;
}

export default function AIBUSINESSHUB() {
  const pathname = usePathname();
  const { data: dashboardSummary } = useDashboardSummary();
  const dashboardIncome = dashboardSummary?.data?.[0];
  //   const pageName = getPageName(pathname);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [affiliate, setAffiliate] = useState<AffiliateSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/Authentication/affiliate-network');

        const data = await response.json();
        if (data.statusCode === 200 && data.data && data.data.length > 0) {
          setAffiliate(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (!affiliate?.BoosterRemDateTime) return;
    const target = new Date(affiliate.BoosterRemDateTime);
    const updateTimer = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setHours(h);
        setMinutes(m);
        setSeconds(s);
      } else {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [affiliate?.BoosterRemDateTime]);

  // Animated values
  const countedTotalInvestment = affiliate?.TotalInvestment || 0;
  const countedTotalEarning = affiliate?.TotalEarning || 0;
  const countedEarningLimit = affiliate?.EarningLimit || 0;
  const countedRemainingLimit = affiliate?.RemainingLimit || 0;
  const countedActiveDirectMembers = affiliate?.ActiveDirectMembers || 0;
  const countedDirectBusiness = affiliate?.DirectBusiness || 0;
  const countedTeamDownline = affiliate?.LeftTeam || 0;
  const countedTeamBusiness = affiliate?.RightTeam || 0;

  const countedCommunityBuildingBonus = affiliate?.MatchingIncome || 0;
  const countedRankBonus = affiliate?.RankBonus || 0;

  const countedPerformanceWithdrawal = useCountUp(affiliate?.PerformanceWithdrawal || 0);
  const countedYieldWithdrawal = affiliate?.YieldWithdrawal || 0;

  const countedOtherLegBus = affiliate?.TradingPackage || 0;
  const countedStrongLegBus = affiliate?.RebornPacakge || 0;
  const countedLeftBusvolume = affiliate?.LeftBusvolume || 0;
  const countedRightBusvolume = affiliate?.RightBusvolume || 0;

  const countedStrongLegID = affiliate?.Reborn2Pacakge || 0;
  const countedLeadershipRank = affiliate?.LeadershipRank || "N/A";
  const countedRankPercentage = affiliate?.Levelopen || 0;

  if (loading) {
    return (
      <>
        {/* <NftSection pageName={pageName} /> */}
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#19C8EE]" aria-label="Loading" />
        </div>
      </>
    );
  }

  return (
    <>
      {/* <NftSection pageName={pageName} /> */}

      <div className="px-4 sm:px-6 lg:px-8">

        {/* Header Card */}
        <div
          className="relative rounded-2xl overflow-hidden mb-6 shadow-[0_12px_48px_rgba(11,16,33,0.18)] dark:shadow-[0_12px_48px_rgba(0,0,0,0.4)]"
          style={{ background: "linear-gradient(135deg,#0B1021 0%,#17213A 58%,#102238 100%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 80% 50%, rgba(25,200,238,0.16) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(52,125,255,0.10) 0%, transparent 50%)",
            }}
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 items-start lg:items-center p-6 sm:p-8 sm:px-9">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#19C8EE] mb-2">
                Total Investment
              </div>
              <div className="text-[38px] sm:text-[52px] font-black text-white tracking-[-1.5px] leading-none break-all">
                <span className="text-[#19C8EE]">${countedTotalInvestment.toFixed(2)}</span>
              </div>
              <div className="text-[13px] text-white/50 mt-2">
                Across all income streams · Updated just now
              </div>
              <div className="flex flex-wrap gap-5 mt-5 sm:gap-7">
                <div>
                  <div className="text-[20px] font-bold text-white">${countedTotalEarning.toFixed(2)}</div>
                  <div className="text-[16px] text-white/40 mt-[2px]">Total Earning</div>
                </div>
                <div>
                  <div className="text-[20px] font-bold text-white">${countedEarningLimit.toFixed(2)}</div>
                  <div className="text-[16px] text-white/40 mt-[2px]">Earning Limit</div>
                </div>
                <div>
                  <div className="text-[20px] font-bold text-white">${countedRemainingLimit.toFixed(2)}</div>
                  <div className="text-[16px] text-white/40 mt-[2px]">Remaining Limit</div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 lg:flex-col lg:items-end">
              <div className="flex-1 lg:flex-none bg-cyan-300/[0.06] border border-cyan-300/20 rounded-xl p-2 text-right backdrop-blur-sm lg:min-w-[180px]">
                <div className="text-[10px] uppercase tracking-[0.07em] text-white/70 mb-1">
                  Forex  Trading Package
                </div>
                <div className="text-[18px] sm:text-[20px] font-extrabold text-white">
                  ${countedOtherLegBus.toFixed(2)}
                </div>
              </div>



            </div>
          </div>
        </div>


        {/* Incomes & Withdrawals */}
        <div className="p-4 mb-6 transition-colors bg-white border rounded-lg shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30 dark:border-gray-700 sm:p-6 sm:mb-8">
          <h3 className="flex items-center p-3 mb-3 font-semibold text-gray-700 dark:text-gray-200 sm:text-md lg:text-md geidt-font">
            <RiMoneyDollarCircleLine className="mr-2 text-xl text-green-600 dark:text-green-400 sm:mr-3 sm:text-2xl geidt-font" />
            Incomes
          </h3>

          <div className="grid grid-cols-1 gap-3 mb-4 sm:gap-4 sm:mb-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Direct Bonus */}
            <div className="relative p-3 overflow-hidden transition-colors border border-blue-100 rounded-lg sm:p-4 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 text-xs font-medium text-blue-700 sm:text-sm dark:text-blue-300 geidt-font">
                    Direct Bonus
                  </h4>
                  <p className="text-lg font-bold text-blue-900 sm:text-xl dark:text-blue-200">
                    ${(dashboardIncome?.DirectBonus ?? 0).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full sm:w-10 sm:h-10 dark:bg-blue-800/50">
                  <RiFlowChart className="text-blue-600 dark:text-blue-300 sm:text-lg" />
                </div>
              </div>
            </div>

            <div className="relative p-3 overflow-hidden transition-colors border border-blue-100 rounded-lg sm:p-4 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 text-xs font-medium text-blue-700 sm:text-sm dark:text-blue-300 geidt-font">
                    Binary Bonus
                  </h4>
                  <p className="text-lg font-bold text-blue-900 sm:text-xl dark:text-blue-200">
                    ${(dashboardIncome?.MatchingIncome ?? 0).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full sm:w-10 sm:h-10 dark:bg-blue-800/50">
                  <RiMoneyDollarCircleLine className="text-blue-600 dark:text-blue-300 sm:text-lg" />
                </div>
              </div>
            </div>

            {/* Reward Bonus */}
            <div className="relative p-3 overflow-hidden transition-colors border border-green-200 rounded-lg sm:p-4 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 text-xs font-medium text-green-700 sm:text-sm dark:text-green-300 geidt-font">
                    Reward Bonus
                  </h4>
                  <p className="text-lg font-bold text-green-900 sm:text-xl dark:text-green-200">
                    ${(dashboardIncome?.RewardBonus ?? 0).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full sm:w-10 sm:h-10 dark:bg-green-800/50">
                  <FaCalendarAlt className="text-green-600 dark:text-green-300 sm:text-lg" />
                </div>
              </div>
            </div>

            {/* Royalty Bonus */}
            <div className="relative p-3 overflow-hidden transition-colors border border-blue-300 rounded-lg sm:p-4 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 text-xs font-medium text-blue-700 sm:text-sm dark:text-blue-300">
                    Level Bonus
                  </h4>
                  <p className="text-lg font-bold text-blue-900 sm:text-xl dark:text-blue-200">
                    ${(dashboardIncome?.LevelIncome ?? 0).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full sm:w-10 sm:h-10 dark:bg-blue-800/50">
                  <RiAwardLine className="text-blue-600 dark:text-blue-300 sm:text-lg" />
                </div>
              </div>
            </div>


          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 sm:pt-6">
            <h3 className="flex items-center p-3 mb-3 font-semibold text-gray-700 dark:text-gray-200 sm:text-md lg:text-md geidt-font">
              Withdrawals
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
              <div
                className="relative p-3 overflow-hidden transition-colors border border-blue-200 rounded-lg sm:p-4 bg-gradient-to-r from-sky-100 via-blue-100 to-blue-100 dark:from-sky-900/40 dark:via-blue-900/40 dark:to-blue-900/40 text-slate-800 dark:text-slate-200 dark:border-blue-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="mb-1 text-xs font-medium sm:text-sm text-slate-600 dark:text-slate-300 geidt-font">
                      Income Withdrawal
                    </h4>
                    <p className="text-lg font-bold sm:text-xl text-slate-900 dark:text-white">
                      ${countedPerformanceWithdrawal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-blue-200/70 dark:bg-blue-700/50">
                    <RiBankCardLine className="text-sm text-blue-700 dark:text-blue-300 sm:text-lg" />
                  </div>
                </div>
                <div className="absolute w-12 h-12 rounded-full sm:w-16 sm:h-16 -right-1 sm:-right-2 -top-1 sm:-top-2 bg-blue-300/30 dark:bg-blue-500/20"></div>
                <div className="absolute w-16 h-16 rounded-full sm:w-20 sm:h-20 -right-3 sm:-right-4 -bottom-3 sm:-bottom-4 bg-blue-300/20 dark:bg-blue-500/10"></div>
              </div>

            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="p-4 transition-colors bg-white border rounded-lg shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30 dark:border-gray-700 sm:p-6">
          <div className="flex items-center mb-4 space-x-3 sm:mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600">
              <RiBriefcaseLine className="text-lg text-white sm:text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 sm:text-md lg:text-md geidt-font">
                Business Information
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 geidt-font">
                Your network performance overview
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-4 sm:gap-4 sm:mb-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Left Business */}
            <div className="relative p-3 overflow-hidden transition-colors border border-teal-200 rounded-lg sm:p-4 bg-gradient-to-r from-teal-50 via-cyan-50 to-teal-50 dark:from-teal-900/30 dark:via-cyan-900/30 dark:to-teal-900/30 text-slate-800 dark:text-slate-200 dark:border-teal-800">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 text-xs font-medium text-teal-700 sm:text-sm dark:text-teal-300 geidt-font">Left Business</h4>
                  <p className="text-sm font-bold text-teal-900 dark:text-teal-200">${countedLeftBusvolume.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-teal-200/70 dark:bg-teal-700/50">
                  <RiBarChartLine className="text-lg text-teal-600 dark:text-teal-300" />
                </div>
              </div>
              <div className="absolute w-12 h-12 rounded-full sm:w-16 sm:h-16 -right-1 sm:-right-2 -top-1 sm:-top-2 bg-teal-300/30 dark:bg-teal-500/20"></div>
              <div className="absolute w-16 h-16 rounded-full sm:w-20 sm:h-20 -right-3 sm:-right-4 -bottom-3 sm:-bottom-4 bg-cyan-300/20 dark:bg-cyan-500/10"></div>
            </div>

            {/* Right Business */}
            <div className="relative p-3 overflow-hidden transition-colors border border-indigo-200 rounded-lg sm:p-4 bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 dark:from-indigo-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 text-slate-800 dark:text-slate-200 dark:border-indigo-800">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 text-xs font-medium text-indigo-700 sm:text-sm dark:text-indigo-300 geidt-font">Right Business</h4>
                  <p className="text-sm font-bold text-blue-900 dark:text-blue-200">${countedRightBusvolume.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-indigo-200/70 dark:bg-indigo-700/50">
                  <RiFlowChart className="text-lg text-indigo-600 dark:text-indigo-300" />
                </div>
              </div>
              <div className="absolute w-12 h-12 rounded-full sm:w-16 sm:h-16 -right-1 sm:-right-2 -top-1 sm:-top-2 bg-indigo-300/30 dark:bg-indigo-500/20"></div>
              <div className="absolute w-16 h-16 rounded-full sm:w-20 sm:h-20 -right-3 sm:-right-4 -bottom-3 sm:-bottom-4 bg-blue-300/20 dark:bg-blue-500/10"></div>
            </div>

            {/* Direct Business */}
            <div className="relative p-3 overflow-hidden transition-colors border rounded-lg sm:p-4 bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 dark:from-emerald-900/30 dark:via-green-900/30 dark:to-emerald-900/30 text-slate-800 dark:text-slate-200 border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 text-xs font-medium sm:text-sm text-emerald-700 dark:text-emerald-300 geidt-font">Direct Business</h4>
                  <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">${countedDirectBusiness.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-emerald-200/70 dark:bg-emerald-700/50">
                  <RiKeyLine className="text-lg text-emerald-600 dark:text-emerald-300" />
                </div>
              </div>
              <div className="absolute w-12 h-12 rounded-full sm:w-16 sm:h-16 -right-1 sm:-right-2 -top-1 sm:-top-2 bg-emerald-300/30 dark:bg-emerald-500/20"></div>
              <div className="absolute w-16 h-16 rounded-full sm:w-20 sm:h-20 -right-3 sm:-right-4 -bottom-3 sm:-bottom-4 bg-green-300/20 dark:bg-green-500/10"></div>
            </div>

            {/* Left Team Members */}
            <div className="relative p-3 overflow-hidden transition-colors border rounded-lg sm:p-4 bg-gradient-to-r from-rose-50 via-red-50 to-rose-50 dark:from-rose-900/30 dark:via-red-900/30 dark:to-rose-900/30 text-slate-800 dark:text-slate-200 border-rose-200 dark:border-rose-800">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 text-xs font-medium sm:text-sm text-rose-700 dark:text-rose-300 geidt-font">Left Team Members</h4>
                  <p className="text-sm font-bold text-rose-900 dark:text-rose-200">{countedTeamDownline}</p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-rose-200/70 dark:bg-rose-700/50">
                  <RiGroupLine className="text-lg text-rose-600 dark:text-rose-300" />
                </div>
              </div>
              <div className="absolute w-12 h-12 rounded-full sm:w-16 sm:h-16 -right-1 sm:-right-2 -top-1 sm:-top-2 bg-rose-300/30 dark:bg-rose-500/20"></div>
              <div className="absolute w-16 h-16 rounded-full sm:w-20 sm:h-20 -right-3 sm:-right-4 -bottom-3 sm:-bottom-4 bg-red-300/20 dark:bg-red-500/10"></div>
            </div>

            {/* Right Team Members */}
            <div className="relative p-3 overflow-hidden transition-colors border rounded-lg sm:p-4 bg-gradient-to-r from-cyan-50 via-blue-50 to-cyan-50 dark:from-cyan-900/30 dark:via-blue-900/30 dark:to-cyan-900/30 text-slate-800 dark:text-slate-200 border-cyan-200 dark:border-cyan-800">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 text-xs font-medium sm:text-sm text-cyan-700 dark:text-cyan-300 geidt-font">Right Team Members</h4>
                  <p className="text-sm font-bold text-cyan-900 dark:text-cyan-200">{countedTeamBusiness}</p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-cyan-200/70 dark:bg-cyan-700/50">
                  <RiTeamLine className="text-lg text-cyan-600 dark:text-cyan-300" />
                </div>
              </div>
              <div className="absolute w-12 h-12 rounded-full sm:w-16 sm:h-16 -right-1 sm:-right-2 -top-1 sm:-top-2 bg-cyan-300/30 dark:bg-cyan-500/20"></div>
              <div className="absolute w-16 h-16 rounded-full sm:w-20 sm:h-20 -right-3 sm:-right-4 -bottom-3 sm:-bottom-4 bg-blue-300/20 dark:bg-blue-500/10"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            {/* Current Rank */}
            <div className="p-4 transition-colors border-l-4 border-blue-500 rounded-lg sm:p-6 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-blue-900/30">
              <div className="flex items-center mb-3 space-x-3">
                <RiFlowChart className="text-lg text-blue-600 dark:text-blue-400 sm:text-xl" />
                <h4 className="text-base font-semibold text-blue-900 dark:text-blue-200 sm:text-lg">
                  Current Rank
                </h4>
              </div>
              <div className="text-xl font-semibold text-blue-900 dark:text-blue-200 sm:text-2xl">
                {countedLeadershipRank}
              </div>
            </div>

            {/* Level Open */}
            <div className="p-4 transition-colors border-l-4 border-teal-500 rounded-lg sm:p-6 bg-gradient-to-r from-teal-50 via-cyan-50 to-teal-50 dark:from-teal-900/30 dark:via-cyan-900/30 dark:to-teal-900/30">
              <div className="flex items-center mb-3 space-x-3">
                <RiAwardLine className="text-lg text-teal-600 dark:text-teal-400 sm:text-xl" />
                <h4 className="text-base font-semibold text-teal-900 dark:text-teal-200 sm:text-lg">
                  Level Open
                </h4>
              </div>
              <div className="mt-2 text-xl font-semibold text-teal-900 dark:text-teal-200 sm:text-2xl">
                {countedRankPercentage}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
