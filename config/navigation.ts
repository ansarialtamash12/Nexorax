import type { NavItem } from "@/types/common";
import { APP_ROUTES } from "@/lib/constants";

export const primaryNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",

  },

  {
    label: "Packages",
    href: "/",
    isDropdown: true,
    dropdownItems: [
      { label: "Buy Subscription", href: "/investment-amount" },
      { label: "Order History", href: "/order-history" },

    ],

  },
  {
    label: "Fund Director",
    href: "/fund-director",

  },
  {
    label: "Academy",
    href: "/academy",

  },
  {
    label: "Affiliate",
    href: "/affiliate",

    isDropdown: true,
    dropdownItems: [
      { label: "Business Dashboard", href: "/ai-business-hub" },
      { label: "Direct Partners", href: "/direct-partners" },
      // { label: "Level Tree", href: "/network-tree" },
      // { label: "Level Partners Tree", href: "/intelligent-partner-view" },
      { label: "Downline Partners", href: "/downline" },
      { label: "Downline Tree", href: "/binary-tree" },
    ],
  },
  {
    label: "Reports",
    href: "/reports",

    isDropdown: true,
    dropdownItems: [
      { label: "Income Report", href: "/income-reports" },
      { label: "Wallet Manager", href: "/reports" },
      { label: "Rank", href: "/rank" },
    ],
  },
];
