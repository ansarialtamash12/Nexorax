"use client";

import { useEffect, useState } from "react";
import { FiCopy, FiHelpCircle } from "react-icons/fi";
import { Link as LinkIcon } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaTwitter, FaTelegramPlane } from "react-icons/fa";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";

const ReferralLink = () => {
  const { user } = useAuthStore();
  const { data: dashboardData } = useDashboardSummary();
  const authLogin = dashboardData?.data?.[0]?.AuthLogin || user?.email || "user123";
  const [position, setPosition] = useState("L");
  const [appOrigin, setAppOrigin] = useState("");

  useEffect(() => {
    setAppOrigin(window.location.origin);
  }, []);

  const referralLink = appOrigin
    ? `${appOrigin}/register?RefID=${encodeURIComponent(authLogin)}&Position=${position}`
    : "";
  const referralMessage = `🚀 𝐉𝐨𝐢𝐧 NEXORAX – 𝐄𝐦𝐩𝐨𝐰𝐞𝐫𝐢𝐧𝐠 𝐭𝐡𝐞 𝐅𝐮𝐭𝐮𝐫𝐞 𝐨𝐟 𝐓𝐫𝐚𝐝𝐢𝐧𝐠.
Start your trading journey today and explore exciting market opportunities. Sign up using my referral link and unlock exclusive rewards:
👉 ${referralLink}`;

  const handleCopyClick = () => {
    if (!referralLink) return;
    navigator.clipboard
      .writeText(referralMessage)
      .then(() => {
        toast.success("Referral message copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleCopy = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    toast.success("copied to clipboard!");
  };

  return (
    <div className="relative z-10">
      <div className="w-full max-w-xl mx-auto space-y-6 rounded-2xl text-slate-900 dark:text-slate-100">
        
        {/* Position Selector - SOLID COLORS */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Position:</span>
          <button
            onClick={() => setPosition("L")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
              position === "L"
                ? "bg-[#7C3AED] text-[#fff] shadow-md shadow-purple-500/20"
                : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-purple-300 hover:bg-purple-50 dark:border-[#1E293B] dark:bg-[#15151a] dark:text-slate-300 dark:hover:border-purple-700 dark:hover:bg-purple-950/30"
            }`}
          >
            Left Position
          </button>
          <button
            onClick={() => setPosition("R")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
              position === "R"
                ? "bg-[#7C3AED] text-[#fff] shadow-md shadow-purple-500/20"
                : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-purple-300 hover:bg-purple-50 dark:border-[#1E293B] dark:bg-[#15151a] dark:text-slate-300 dark:hover:border-purple-700 dark:hover:bg-purple-950/30"
            }`}
          >
            Right Position
          </button>
        </div>

        {/* Referral Box - SOLID COLORS */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-[#1E293B] dark:bg-[#15151a]">
          <div className="flex items-center gap-2 mb-3">
            <p className="relative z-10 text-sm font-semibold text-[#7C3AED] dark:text-purple-400">
              Your Referral Link
            </p>
            <button
              onClick={handleCopy}
              className="relative rounded-md p-1 text-[#7C3AED] transition-colors hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/30"
            >
              <FiCopy className="" />
            </button>
          </div>
          <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              readOnly
              value={referralLink}
              onClick={() => {
                if (referralLink) window.open(referralLink, "_blank");
              }}
              className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg cursor-pointer sm:flex-1 focus:outline-none dark:bg-[#0b0b0e] dark:border-[#1E293B] dark:text-gray-200"
            />
            <button
              onClick={handleCopyClick}
              className="flex items-center justify-center gap-1 rounded-lg bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-[#fff] transition hover:bg-[#6D28D9]"
            >
              <LinkIcon size={16} />
              Copy
            </button>
          </div>
        </div>

        {/* How It Works - SOLID COLORS */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-slate-700 shadow-sm dark:border-[#1E293B] dark:bg-[#15151a] dark:text-slate-300 sm:text-base">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7C3AED] font-bold text-[#fff]">
              <FiHelpCircle className="text-lg" />
            </div>
            <p className="font-semibold text-[#7C3AED] dark:text-purple-400">How Referrals Work</p>
          </div>
          <ul className="mt-3 list-disc list-inside lg:ml-5 space-y-1">
            <li className="text-sm text-slate-600 dark:text-slate-300">
              Share your unique referral link
            </li>
            <li className="text-sm text-slate-600 dark:text-slate-300">
              Friends sign up and activate their accounts
            </li>
            <li className="text-sm text-slate-600 dark:text-slate-300">
              You both earn commissions and bonuses
            </li>
            <li className="text-sm text-slate-600 dark:text-slate-300">
              Grow your network for more rewards
            </li>
          </ul>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              referralMessage
            )}&media=${encodeURIComponent(
              "https://imagedelivery.net/nq9qT5FHZv9Sg48UUnD1-A/6db933b4-d8e8-4cb4-f94d-5ff7533aba00/public"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fff] bg-[#25D366] hover:bg-[#25D366]/90 focus:ring-4 focus:outline-none focus:ring-[#25D366]/50 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center me-2 mb-2"
          >
            <FaWhatsapp className="w-4 h-4 me-2" />
            WhatsApp
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              referralLink
            )}&quote=${encodeURIComponent(referralMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fff] bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center me-2 mb-2"
          >
            <FaFacebookF className="w-4 h-4 me-2" />
            Facebook
          </a>

          {/* Twitter/X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              referralMessage
            )}&url=${encodeURIComponent(referralLink)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fff] bg-[#000000] hover:bg-[#1DA1F2]/90 focus:ring-4 focus:outline-none focus:ring-[#1DA1F2]/50 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center me-2 mb-2"
          >
            <FaTwitter className="w-4 h-4 me-2" />
            Twitter
          </a>

          {/* NEXORAX */}
          <a
            href="/"
            className="text-[#fff] bg-[#7C3AED] hover:bg-[#6D28D9] focus:ring-4 focus:outline-none focus:ring-purple-500/50 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center me-2 mb-2"
          >
            <LinkIcon className="w-4 h-4 me-2" />
            NEXORAX
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              referralLink
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fff] bg-[#0077B5] hover:bg-[#0077B5]/90 focus:ring-4 focus:outline-none focus:ring-[#0077B5]/50 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(
              referralLink
            )}&text=${encodeURIComponent(referralMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fff] bg-[#0088cc] hover:bg-[#0088cc]/90 focus:ring-4 focus:outline-none focus:ring-[#0088cc]/50 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center me-2 mb-2"
          >
            <FaTelegramPlane className="w-4 h-4 me-2" />
            Telegram
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=${encodeURIComponent(
              "Join me on NEXORAX"
            )}&body=${encodeURIComponent(referralMessage)}`}
            className="text-[#fff] bg-[#34495e] hover:bg-[#34495e]/90 focus:ring-4 focus:outline-none focus:ring-[#34495e]/50 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReferralLink;