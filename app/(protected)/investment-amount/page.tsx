// "use client";
// import React, { useState, useEffect, useCallback } from 'react';
// import { Loader2, Wallet } from "lucide-react";
// import { toast } from 'sonner';
// import { useQueryClient } from '@tanstack/react-query';
// import { QUERY_KEYS } from '@/lib/constants';

// interface PlanFeature {
//   text: string;
// }

// interface Plan {
//   id: string;
//   title: string;
//   subtitle: string;
//   icon: string;
//   investmentRange: string;
//   features: PlanFeature[];
//   theme: {
//     text: string;
//     bg: string;
//     border: string;
//     glow: string;
//     button: string;
//     buttonHover: string;
//     iconBg: string;
//   };
//   isPopular?: boolean;
//   BoosterPackage: number;
// }

// interface ActivatePlanModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   plan: Plan | null;
//   userId?: string;
// }

// const ActivatePlanModal: React.FC<ActivatePlanModalProps> = ({
//   isOpen,
//   onClose,
//   plan,
//   userId = "",
// }) => {
//   const queryClient = useQueryClient();
//   const [amount, setAmount] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [amountError, setAmountError] = useState("");
//   const [quantityError, setQuantityError] = useState("");
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [isLoadingWallet, setIsLoadingWallet] = useState(false);
//   const [isActivating, setIsActivating] = useState(false);
//   const [activationError, setActivationError] = useState("");
//   const [userIdInput, setUserIdInput] = useState(userId);
//   const [userName, setUserName] = useState("");
//   const [userNameError, setUserNameError] = useState("");
//   const [isLoadingUserName, setIsLoadingUserName] = useState(false);

//   // Fetch wallet details when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setUserIdInput(userId);
//       setUserName("");
//       setUserNameError("");
//       fetchWalletDetails();
//     }
//   }, [isOpen, userId]);

//   const fetchUserName = useCallback(async () => {
//     setIsLoadingUserName(true);
//     setUserName("");
//     setUserNameError("");
//     try {
//       const response = await fetch(`/api/FundManager?authLogin=${userIdInput}`);
//       const data = await response.json();

//       if (response.ok && data.statusCode === 200 && data.data?.Name) {
//         setUserName(data.data.Name);
//       } else {
//         setUserNameError(
//           typeof data.message === "string" ? data.message : "User ID not found.",
//         );
//       }
//     } catch (error) {
//       console.error('Failed to fetch user name:', error);
//       setUserNameError("Could not verify this User ID. Please try again.");
//     } finally {
//       setIsLoadingUserName(false);
//     }
//   }, [userIdInput]);

//   // Fetch user name when userId changes (debounced)
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (userIdInput && userIdInput.length > 0) {
//         fetchUserName();
//       } else {
//         setUserName("");
//       }
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [userIdInput, fetchUserName]);

//   const fetchWalletDetails = async () => {
//     setIsLoadingWallet(true);
//     try {
//       const response = await fetch('/api/FundManager');
//       const data = await response.json();

//       if (data.statusCode === 200 && data.data) {
//         setWalletBalance(data.data.DepositWallet || 0);
//       } else {
//         setWalletBalance(0);
//       }
//     } catch (error) {
//       console.error('Failed to fetch wallet details:', error);
//       setWalletBalance(0);
//     } finally {
//       setIsLoadingWallet(false);
//     }
//   };

//   const handleActivate = async () => {
//     if (!plan) return;

//     setIsActivating(true);
//     setActivationError("");

//     try {
//       const response = await fetch('/api/FundManager', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           productId: plan.id,
//           rkprice: Number(amount) || 0,
//           byAuthlogin: userIdInput,
//           RechargeType: plan.BoosterPackage,
//         }),
//       });


//       const data = await response.json();

//       if (data.statusCode === 200) {
//         // Success - close modal and refresh wallet
//         toast.success(data.message || "Plan activated successfully!");
//         // Invalidate dashboard summary query to refresh Navbar data
//         queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.summary });
//         onClose();
//         // Optionally show success message or redirect
//       } else {
//         setActivationError(data.message || "Failed to activate plan");
//         toast.error(data.message || "Failed to activate plan");
//       }
//     } catch (error) {
//       console.error('Failed to activate plan:', error);
//       setActivationError("An error occurred while activating the plan");
//       toast.error("An error occurred while activating the plan");
//     } finally {
//       setIsActivating(false);
//     }
//   };

//   if (!isOpen || !plan) return null;

//   const isQuantityPlan = plan.BoosterPackage === 3;

//   // ✅ Quantity change — hamesha update karo, error bhi handle karo
//   const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const qty = e.target.value;
//     setQuantity(qty);

//     const numQty = Number(qty);
//     if (qty === "" || numQty <= 0) {
//       setQuantityError("Please enter a valid quantity");
//       setAmount("");
//     } else {
//       const calculatedAmount = numQty * 660;
//       setAmount(calculatedAmount.toString());

//       if (calculatedAmount > walletBalance) {
//         setQuantityError("Insufficient balance");
//       } else {
//         setQuantityError("");
//       }
//     }
//   };

//   // ✅ Amount change — hamesha update karo, sirf error message dikhao
//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setAmount(value);

//     if (value === "") {
//       setAmountError("");
//       return;
//     }

//     const numValue = Number(value);

//     const minimumAmount = plan.BoosterPackage === 1
//       ? 100
//       : plan.BoosterPackage === 2
//         ? 3000
//         : null;

//     if (minimumAmount !== null && numValue < minimumAmount) {
//       setAmountError(`Minimum investment is $${minimumAmount.toLocaleString()}`);
//     } else if (numValue > walletBalance) {
//       setAmountError("Insufficient balance");
//     } else {
//       setAmountError("");
//     }
//   };

//   const getModalTheme = () => {
//     if (plan.title === "Normal") {
//       return { btn: "bg-blue-500 hover:bg-blue-600 text-white", text: "text-blue-600", iconBg: "bg-blue-100" };
//     }
//     if (plan.title === "Legacy Reborn") {
//       return { btn: "bg-amber-500 hover:bg-amber-600 text-white", text: "text-amber-600", iconBg: "bg-amber-100" };
//     }
//     return { btn: "bg-purple-500 hover:bg-purple-600 text-white", text: "text-purple-600", iconBg: "bg-purple-100" };
//   };

//   const modalTheme = getModalTheme();


//   const isSubmitDisabled =
//     !amount ||
//     !userIdInput ||
//     !!amountError ||
//     (isQuantityPlan && (!!quantityError || !quantity)) ||
//     isActivating;

//   return (
//     <>
//       <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #334155;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #475569;
//         }
//       `}</style>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
//         <div className="relative w-full max-w-[480px] bg-white dark:bg-[#11111a] rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 border border-gray-100 dark:border-white/10">

//           {/* Header */}
//           <div className="flex justify-between items-start mb-6">
//             <div>
//               <p className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-1">
//                 Subscribe Now
//               </p>
//               <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
//                 Activate <span className={modalTheme.text}>{plan.title}</span>
//               </h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors border border-gray-100 dark:border-white/10"
//             >
//               <span className="text-gray-500 dark:text-gray-400 font-bold text-lg leading-none">&times;</span>
//             </button>
//           </div>

//           {/* Wallet Info Box */}
//           <div className="flex items-center justify-start gap-4 bg-[#f0fdf4] dark:bg-green-900/20 border border-green-100 dark:border-green-500/30 rounded-2xl p-5 mb-6">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400">
//               <Wallet className="h-6 w-6" aria-hidden="true" />
//             </div>
//             <div className="text-right">
//               <p className="text-gray-600 dark:text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Wallet Balance</p>
//               <p className="text-green-600 dark:text-green-400 text-2xl font-bold">
//                 {isLoadingWallet ? <Loader2 className="h-6 w-6 animate-spin text-[#F5C451]" aria-label="Loading" /> : `$${walletBalance}`}
//               </p>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="space-y-5">
//             <div>
//               <label className="block text-gray-800 dark:text-gray-200 text-sm font-bold mb-2">
//                 USER ID <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={userIdInput}
//                   placeholder="Enter UserID"
//                   onChange={(e) => {
//                     setUserIdInput(e.target.value);
//                     setUserName("");
//                     setUserNameError("");
//                   }}
//                   aria-invalid={!!userNameError}
//                   aria-describedby={userNameError ? "user-id-error" : undefined}
//                   className="w-full bg-[#f4f6fc] dark:bg-white/5 text-gray-800 dark:text-white text-lg placeholder-gray-400 font-medium px-4 py-3.5 pr-12 rounded-xl border outline-none transition-all"
//                 />
//                 {isLoadingUserName && (
//                   <Loader2
//                     className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-[#F5C451]"
//                     aria-label="Loading user name"
//                   />
//                 )}
//               </div>
//               {userName && (
//                 <span className="text-green-600 dark:text-green-400 text-sm font-medium mt-2 block">
//                   {userName}
//                 </span>
//               )}
//               {userNameError && !isLoadingUserName && (
//                 <p id="user-id-error" className="mt-2 text-xs font-medium text-red-500" role="alert">
//                   {userNameError}
//                 </p>
//               )}
//             </div>

//             {isQuantityPlan ? (
//               <div>
//                 <label className="block text-gray-800 dark:text-gray-200 text-sm font-bold mb-2">
//                   QUANTITY <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Enter quantity"
//                   value={quantity}
//                   onChange={handleQuantityChange}
//                   className={`w-full bg-[#f4f6fc] dark:bg-white/5 text-gray-800 dark:text-white text-lg placeholder-gray-400 font-medium px-4 py-3.5 rounded-xl border outline-none transition-all ${quantityError
//                     ? "border-red-400 dark:border-red-500"
//                     : "border-transparent focus:border-blue-300 dark:focus:border-blue-500"
//                     }`}
//                 />
//                 {quantityError ? (
//                   <p className="text-red-500 text-xs font-medium mt-2">⚠️ {quantityError}</p>
//                 ) : (
//                   <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-2 flex items-center gap-1">
//                     💡 1 Quantity = $660
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <div>
//                 <label className="block text-gray-800 dark:text-gray-200 text-sm font-bold mb-2">SELECTED PLAN</label>
//                 <div className="w-full bg-[#f8f9fc] dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-300 text-lg font-medium px-4 py-3.5 rounded-xl flex items-center gap-3">
//                   <span className={`text-xl p-1.5 rounded-md ${modalTheme.iconBg}`}>{plan.icon}</span>
//                   <span className={modalTheme.text}>{plan.title}</span>
//                 </div>
//               </div>
//             )}

//             <div>
//               <label className="block text-gray-800 dark:text-gray-200 text-sm font-bold mb-2">
//                 INVESTMENT AMOUNT (USD) <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 placeholder="Enter amount"
//                 value={amount}
//                 onChange={handleAmountChange}
//                 readOnly={isQuantityPlan}
//                 className={`w-full bg-[#f4f6fc] dark:bg-white/5 text-gray-800 dark:text-white text-lg placeholder-gray-400 font-medium px-4 py-3.5 rounded-xl border outline-none transition-all ${isQuantityPlan ? "cursor-not-allowed" : ""
//                   } ${amountError
//                     ? "border-red-400 dark:border-red-500"
//                     : "border-transparent focus:border-blue-300 dark:focus:border-blue-500"
//                   }`}
//               />
//               {amountError ? (
//                 <p className="text-red-500 text-xs font-medium mt-2">⚠️ {amountError}</p>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-2 flex items-center gap-1">
//                   💡 Investment range: <span className="text-gray-900 dark:text-white font-bold">{plan.investmentRange}</span>
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Button */}
//           <button
//             onClick={handleActivate}
//             disabled={isSubmitDisabled || isActivating}
//             className={`w-full mt-8 py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-extrabold tracking-widest uppercase transition-all duration-300 ${modalTheme.btn} ${isSubmitDisabled || isActivating ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//           >
//             <span className="text-xl">{isActivating ? "⏳" : "🚀"}</span>
//             {isActivating ? "Activating..." : `Activate ${plan.title}`}
//           </button>

//           {activationError && (
//             <p className="text-red-500 text-xs font-medium mt-3 text-center">⚠️ {activationError}</p>
//           )}

//         </div>
//       </div>
//     </>
//   );
// };

// export default function PricingPage() {
//   const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
//   const [plans, setPlans] = useState<Plan[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await fetch('/api/investment-plans?Type=1', {
//           method: 'GET',
//         });

//         const data = await response.json();

//         if (data.statusCode === 200 && data.data) {
//           const hardcodedPlans: Plan[] = [
//             {
//               id: "", // Will be set from API
//               title: "", // Will be set from API
//               subtitle: "Perfect for New Investors",
//               icon: "🚀",
//               investmentRange: "$100+",
//               isPopular: true,
//               features: [
//                 { text: "Trading Credit Account: $100" },
//                 { text: "Get a $100 trading credit account" },
//                 { text: "Maximum profit eligible for withdrawal: $200 (above $100)" },
//               ],
//               theme: {
//                 text: "text-blue-600 dark:text-blue-400",
//                 bg: "bg-blue-50 dark:bg-blue-500/10",
//                 border: "border-blue-200 dark:border-blue-500/30",
//                 glow: "shadow-sm dark:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
//                 button: "bg-blue-500 text-white border-transparent dark:bg-transparent dark:border-2 dark:border-blue-500 dark:text-blue-400",
//                 buttonHover: "hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white",
//                 iconBg: "bg-gradient-to-br from-blue-400 to-blue-600",
//               },
//               BoosterPackage: 1,
//             },
//             {
//               id: "", // Will be set from API
//               title: "", // Will be set from API
//               subtitle: "For Consistent Growth",
//               icon: "📊",
//               investmentRange: "$3,000+",

//               features: [
//                 { text: "ROI 12%" },
//                 { text: "Investor Limit 2.5X" },
//                 { text: "Leaders Limit 5X" },
//               ],
//               theme: {
//                 text: "text-amber-600 dark:text-amber-400",
//                 bg: "bg-amber-50 dark:bg-amber-500/10",
//                 border: "border-amber-200 dark:border-amber-500/30",
//                 glow: "shadow-sm dark:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
//                 button: "bg-amber-500 text-white border-transparent dark:bg-gradient-to-r dark:from-amber-500 dark:to-orange-500 dark:text-black font-bold",
//                 buttonHover: "hover:bg-amber-600 dark:hover:from-amber-400 dark:hover:to-orange-400",
//                 iconBg: "bg-gradient-to-br from-amber-400 to-orange-600",
//               },
//               BoosterPackage: 2,
//             },
//             {
//               id: "", // Will be set from API
//               title: "", // Will be set from API
//               subtitle: "Professional Trading Suite",
//               icon: "💎",
//               investmentRange: "$660 - 1 Quantity",
//               features: [
//                 { text: "ROI 14%" },
//                 { text: "Investor Limit 2.5X" },
//                 { text: "Leaders Limit 5X" },
//               ],
//               theme: {
//                 text: "text-purple-600 dark:text-purple-400",
//                 bg: "bg-purple-50 dark:bg-purple-500/10",
//                 border: "border-purple-200 dark:border-purple-500/30",
//                 glow: "shadow-sm dark:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
//                 button: "bg-purple-500 text-white border-transparent dark:bg-gradient-to-r dark:from-purple-500 dark:to-fuchsia-500 font-bold",
//                 buttonHover: "hover:bg-purple-600 dark:hover:from-purple-400 dark:hover:to-fuchsia-400",
//                 iconBg: "bg-gradient-to-br from-purple-500 to-fuchsia-600",
//               },
//               BoosterPackage: 3,
//             },
//           ];

//           const mappedPlans = data.data.flatMap((apiItem: {
//             productId?: string;
//             name?: string;
//             description?: string;
//             tittle?: string;
//             BoosterPackage?: number;
//           }) => {
//             if (!apiItem.productId) return [];

//             const packageType = Number(apiItem.BoosterPackage);
//             const template = hardcodedPlans.find(
//               (plan) => plan.BoosterPackage === packageType,
//             ) ?? hardcodedPlans[0];
//             if (!template) return [];

//             return [{
//               ...template,
//               id: apiItem.productId,
//               title: apiItem.tittle || apiItem.name || "Investment Plan",
//               subtitle: apiItem.name || apiItem.description || template.subtitle,
//               investmentRange: apiItem.description || template.investmentRange,
//               BoosterPackage: packageType || template.BoosterPackage,
//             }];
//           });

//           setPlans(mappedPlans);
//         }
//       } catch (error) {
//         console.error('Failed to fetch plans:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPlans();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] p-4 sm:p-8 font-sans relative transition-colors duration-300">

//       <div className="flex flex-wrap justify-center gap-8 max-w-7xl w-full mx-auto">
//         {isLoading ? (
//           <div className="w-full flex justify-center py-16">
//             <Loader2 className="h-10 w-10 animate-spin text-[#F5C451]" aria-label="Loading" />
//           </div>
//         ) : plans.map((plan) => (
//           <div
//             key={plan.id}
//             className={`relative flex flex-col w-full lg:w-[calc((100%-4rem)/3)] p-8 rounded-3xl bg-white dark:bg-[#11111a] border ${plan.theme.border} ${plan.theme.glow} transition-all duration-300 hover:-translate-y-2`}
//           >
//             {plan.isPopular && (
//               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
//                 ★ Most Popular ★
//               </div>
//             )}

//             <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-3xl ${plan.theme.iconBg} shadow-lg`}>
//               {plan.icon}
//             </div>

//             <h2 className={`text-3xl font-bold mb-3 ${plan.theme.text}`}>
//               {plan.title}
//             </h2>

//             <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-8 ${plan.theme.bg} ${plan.theme.text} border ${plan.theme.border}`}>
//               {plan.subtitle}
//             </div>

//             <ul className="flex-1 space-y-4 mb-8">
//               {plan.features.map((feature, index) => (
//                 <li key={index} className="flex items-start gap-3">
//                   <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border ${plan.theme.border} ${plan.theme.bg}`}>
//                     <span className={`text-[10px] font-bold ${plan.theme.text}`}>✓</span>
//                   </div>
//                   <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
//                     {feature.text}
//                   </span>
//                 </li>
//               ))}
//             </ul>

//             <button
//               onClick={() => setSelectedPlan(plan)}
//               className={`w-full py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${plan.theme.button} ${plan.theme.buttonHover}`}
//             >
//               Activate Package
//               <span className="text-lg">→</span>
//             </button>
//           </div>
//         ))}
//       </div>

//       <ActivatePlanModal
//         isOpen={!!selectedPlan}
//         onClose={() => setSelectedPlan(null)}
//         plan={selectedPlan}
//       />
//     </div>
//   );
// }




"use client";

import React, { useState, useEffect, useCallback, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, DollarSign, Layers, Loader2, ShieldCheck, Sparkles, UserRound, Wallet, X } from "lucide-react";
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';

type Tier = "Starter" | "Professional" | "Enterprise";

// --- Data Interfaces ---
export interface Plan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  cta: string;
  popular?: boolean;
  tier: Tier;
  BoosterPackage: number;
}

// --- Modal Component (Includes Dynamic API Logic) ---
interface ActivatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  userId?: string;
}

const ActivatePlanModal: React.FC<ActivatePlanModalProps> = ({
  isOpen,
  onClose,
  plan,
  userId = "",
}) => {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amountError, setAmountError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [activationError, setActivationError] = useState("");
  const [userIdInput, setUserIdInput] = useState(userId);
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [isLoadingUserName, setIsLoadingUserName] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setUserIdInput(userId);
      setUserName("");
      setUserNameError("");
      setAmount("");
      setQuantity("");
      fetchWalletDetails();
    }
  }, [isOpen, userId]);

  const fetchUserName = useCallback(async () => {
    setIsLoadingUserName(true);
    setUserName("");
    setUserNameError("");
    try {
      const response = await fetch(`/api/FundManager?authLogin=${userIdInput}`);
      const data = await response.json();
      if (response.ok && data.statusCode === 200 && data.data?.Name) {
        setUserName(data.data.Name);
      } else {
        setUserNameError(typeof data.message === "string" ? data.message : "User ID not found.");
      }
    } catch (error) {
      setUserNameError("Could not verify this User ID. Please try again.");
    } finally {
      setIsLoadingUserName(false);
    }
  }, [userIdInput]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (userIdInput && userIdInput.length > 0) {
        fetchUserName();
      } else {
        setUserName("");
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [userIdInput, fetchUserName]);

  const fetchWalletDetails = async () => {
    setIsLoadingWallet(true);
    try {
      const response = await fetch('/api/FundManager');
      const data = await response.json();
      if (data.statusCode === 200 && data.data) {
        setWalletBalance(data.data.DepositWallet || 0);
      } else {
        setWalletBalance(0);
      }
    } catch (error) {
      setWalletBalance(0);
    } finally {
      setIsLoadingWallet(false);
    }
  };

  const handleActivate = async () => {
    if (!plan) return;
    setIsActivating(true);
    setActivationError("");
    try {
      const response = await fetch('/api/FundManager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: plan.id,
          rkprice: Number(amount) || 0,
          byAuthlogin: userIdInput,
          RechargeType: plan.BoosterPackage,
        }),
      });
      const data = await response.json();
      if (data.statusCode === 200) {
        toast.success(data.message || "Plan activated successfully!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.summary });
        onClose();
      } else {
        setActivationError(data.message || "Failed to activate plan");
        toast.error(data.message || "Failed to activate plan");
      }
    } catch (error) {
      setActivationError("An error occurred while activating the plan");
    } finally {
      setIsActivating(false);
    }
  };

  if (!isOpen || !plan) return null;

  const isQuantityPlan = plan.BoosterPackage === 3;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = e.target.value;
    setQuantity(qty);
    const numQty = Number(qty);
    if (qty === "" || numQty <= 0) {
      setQuantityError("Please enter a valid quantity");
      setAmount("");
    } else {
      const calculatedAmount = numQty * 660;
      setAmount(calculatedAmount.toString());
      if (calculatedAmount > walletBalance) {
        setQuantityError("Insufficient balance");
      } else {
        setQuantityError("");
      }
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    if (value === "") {
      setAmountError("");
      return;
    }
    const numValue = Number(value);
    const minimumAmount = plan.BoosterPackage === 1 ? 10 : plan.BoosterPackage === 2 ? 500 : null;

    if (minimumAmount !== null && numValue < minimumAmount) {
      setAmountError(`Minimum investment is $${minimumAmount.toLocaleString()}`);
    } else if (numValue > walletBalance) {
      setAmountError("Insufficient balance");
    } else {
      setAmountError("");
    }
  };

  const isSubmitDisabled =
    !amount || !userIdInput || !!amountError || (isQuantityPlan && (!!quantityError || !quantity)) || isActivating;

  /* ---------- Design helpers (no logic) ---------- */
  const numericAmount = Number(amount) || 0;
  const showSummary = numericAmount > 0 && !amountError && !quantityError;
  const remaining = walletBalance - numericAmount;

  const inputBase =
    "h-12 w-full rounded-xl border bg-slate-50 pl-11 pr-4 text-[15px] font-medium text-[#1b1740] placeholder:font-normal placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-4 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/[0.07]";
  const inputOk =
    "border-slate-200 focus:border-violet-600 focus:ring-violet-600/15 dark:border-white/10 dark:focus:border-violet-400 dark:focus:ring-violet-400/20";
  const inputErr =
    "border-red-500 focus:border-red-500 focus:ring-red-500/15 dark:border-red-400 dark:focus:border-red-400";
  const labelCls =
    "mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400";
  const iconCls =
    "pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 dark:text-slate-500";
  const errCls =
    "mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500 dark:text-red-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0f0c24]/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <style>{`
        @keyframes apm-pop { from { opacity: 0; transform: translateY(16px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .apm-pop { animation: apm-pop .28s cubic-bezier(.2,.8,.2,1) both; }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className="apm-pop relative w-full max-w-[500px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-20px_rgba(15,12,36,0.6)] ring-1 ring-black/5 dark:bg-[#14102b] dark:ring-white/10"
      >
        {/* ===== Hero header ===== */}
        <div className="relative overflow-hidden bg-violet-700 px-6 pb-14 pt-6 text-white dark:bg-violet-800">
          {/* decorative solid shapes */}
          <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute right-16 top-16 h-16 w-16 rounded-full bg-orange-400/90" />
          <div className="pointer-events-none absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-white/10" />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-violet-700 shadow-lg">
              <Sparkles className="h-7 w-7" />
            </div>
            <div className="min-w-0 pr-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-200">Activate Plan</p>
              <h2 className="truncate text-2xl font-extrabold leading-tight">{plan.title}</h2>
            </div>
          </div>

          <div className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white">
            <span className="text-violet-200">Allowed:</span>
            <span className="font-bold">{plan.price}</span>
          </div>
        </div>

        {/* ===== Wallet card (overlaps header) ===== */}
        <div className="relative -mt-8 px-6">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-100 dark:bg-[#1d1840] dark:ring-white/10">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Wallet Balance
                </p>
                <div className="text-2xl font-extrabold leading-tight text-[#1b1740] dark:text-white">
                  {isLoadingWallet ? (
                    <Loader2 className="my-1 h-5 w-5 animate-spin text-violet-700 dark:text-violet-400" />
                  ) : (
                    `$${walletBalance}`
                  )}
                </div>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
              Available
            </span>
          </div>
        </div>

        {/* ===== Form ===== */}
        <div className="px-6 pb-6 pt-6">
          <div className="space-y-5">
            {/* User ID */}
            <div>
              <label className={labelCls}>User ID *</label>
              <div className="relative">
                <UserRound className={iconCls} />
                <input
                  type="text"
                  value={userIdInput}
                  onChange={(e) => { setUserIdInput(e.target.value); setUserName(""); setUserNameError(""); }}
                  placeholder="Enter User ID"
                  className={`${inputBase} ${userNameError && !isLoadingUserName ? inputErr : inputOk} pr-11`}
                />
                {isLoadingUserName && (
                  <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-violet-600 dark:text-violet-400" />
                )}
              </div>
              {userName && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {userName}
                </div>
              )}
              {userNameError && !isLoadingUserName && (
                <p className={errCls}>
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {userNameError}
                </p>
              )}
            </div>

            {/* Quantity */}
            {isQuantityPlan && (
              <div>
                <label className={labelCls}>Quantity *</label>
                <div className="relative">
                  <Layers className={iconCls} />
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="Enter Quantity"
                    className={`${inputBase} ${quantityError ? inputErr : inputOk}`}
                  />
                </div>
                {quantityError ? (
                  <p className={errCls}>
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {quantityError}
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">1 Quantity = $660</p>
                )}
              </div>
            )}

            {/* Amount */}
            <div>
              <label className={labelCls}>Investment Amount (USD) *</label>
              <div className="relative">
                <DollarSign className={iconCls} />
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  readOnly={isQuantityPlan}
                  placeholder="Enter Amount"
                  className={`${inputBase} ${amountError ? inputErr : inputOk} ${
                    isQuantityPlan ? "cursor-not-allowed !bg-slate-100 dark:!bg-white/10" : ""
                  }`}
                />
              </div>
              {amountError && (
                <p className={errCls}>
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {amountError}
                </p>
              )}
            </div>
          </div>

          {/* Summary */}
          {showSummary && (
            <div className="mt-5 space-y-2.5 rounded-2xl border border-dashed border-violet-300 bg-violet-50 p-4 text-sm dark:border-violet-400/30 dark:bg-violet-500/10">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Investing</span>
                <span className="font-extrabold text-[#1b1740] dark:text-white">${numericAmount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Balance after activation</span>
                <span className="font-bold text-violet-700 dark:text-violet-300">${remaining.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleActivate}
            disabled={isSubmitDisabled || isActivating}
            className={`mt-6 flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl text-base font-bold transition ${
              isSubmitDisabled || isActivating
                ? "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-white/10 dark:text-slate-500"
                : "bg-violet-700 text-white shadow-lg shadow-violet-400/40 hover:-translate-y-0.5 hover:bg-violet-800 active:translate-y-0 dark:shadow-violet-900/50"
            }`}
          >
            {isActivating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <ShieldCheck className="h-5 w-5" />
                Confirm &amp; Activate
              </>
            )}
          </button>

          {activationError && (
            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:bg-red-500/10 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {activationError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-violet-700 dark:text-violet-400">
    <circle cx="12" cy="12" r="11" fill="currentColor" />
    <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-violet-700 dark:text-violet-400">
    <circle cx="12" cy="12" r="11" fill="currentColor" />
    <path d="M12 11v6" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12" cy="7.5" r="1.3" fill="white" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor">
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>
);

const AIChipIcon = () => (
  <svg viewBox="0 0 48 48" className="h-12 w-12 text-violet-700 dark:text-violet-400">
    <rect x="10" y="10" width="28" height="28" rx="6" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M17 4v6M24 4v6M31 4v6M17 38v6M24 38v6M31 38v6M4 17h6M4 24h6M4 31h6M38 17h6M38 24h6M38 31h6" />
    </g>
    <text x="24" y="29" textAnchor="middle" fontSize="13" fontWeight="800" fill="white" fontFamily="sans-serif">AI</text>
  </svg>
);

const UsersBig = () => (
  <svg viewBox="0 0 64 56" className="h-14 w-16">
    <circle cx="22" cy="16" r="11" fill="#8b5cf6" />
    <path d="M2 50c0-12 9-20 20-20s20 8 20 20z" fill="#8b5cf6" />
    <circle cx="44" cy="14" r="9" fill="#7c3aed" />
    <path d="M34 48c0-10 7-17 16-17s14 6 14 17z" fill="#5b21b6" />
  </svg>
);

const CrownBig = () => (
  <svg viewBox="0 0 64 56" className="h-14 w-16">
    <path d="M4 18l14 12 14-20 14 20 14-12-5 28H9z" fill="#7c3aed" />
    <rect x="9" y="46" width="46" height="6" rx="3" fill="#5b21b6" />
    <circle cx="4" cy="16" r="4" fill="#a78bfa" />
    <circle cx="32" cy="8" r="4" fill="#a78bfa" />
    <circle cx="60" cy="16" r="4" fill="#a78bfa" />
  </svg>
);

const RocketBig = () => (
  <svg viewBox="0 0 64 64" className="h-16 w-16">
    <path d="M12 44c-4 2-6 8-6 14 6 0 12-2 14-6z" fill="#fb923c" />
    <path d="M22 46L18 42c2-14 14-30 36-34 0 22-14 34-28 36z" fill="#6d28d9" />
    <circle cx="40" cy="24" r="6" fill="#e0e7ff" />
    <circle cx="40" cy="24" r="3" fill="#7c3aed" />
  </svg>
);

const tierIcon: Record<Tier, ReactNode> = {
  Starter: <UsersBig />,
  Professional: <CrownBig />,
  Enterprise: <RocketBig />,
};

const StatIcon = ({ type }: { type: string }) => {
  const common = "h-6 w-6 text-violet-700 dark:text-violet-400";
  switch (type) {
    case "users":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <circle cx="8" cy="8" r="3.5" />
          <circle cx="17" cy="9" r="2.8" />
          <path d="M1.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6z" />
          <path d="M15 14.2c.6-.2 1.2-.2 1.8-.2 3 0 5.2 2 5.2 5h-6z" />
        </svg>
      );
    case "trophy":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-orange-500 dark:text-orange-400" fill="currentColor">
          <path d="M7 3h10v6a5 5 0 01-10 0z" />
          <path d="M5 4H2v2a4 4 0 004 4V8a2 2 0 01-1-2zM19 4h3v2a4 4 0 01-4 4V8a2 2 0 001-2z" />
          <rect x="10.5" y="14" width="3" height="4" />
          <rect x="7" y="18" width="10" height="3" rx="1" />
        </svg>
      );
    case "trend":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M15 7h6v6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5z" />
          <path d="M8.5 12l2.5 2.5L16 9.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
};

// --- Main Page ---
export default function PackagesPage() {
  const [filter, setFilter] = useState<"All Packages" | Tier>("All Packages");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const tabs: ("All Packages" | Tier)[] = ["All Packages", "Starter", "Professional"];

  // Attach BoosterPackage ID for API integration
  const packages: Plan[] = [
    {
      tier: "Starter",
      title: "Starter Package",
      subtitle: "Perfect for beginners to join AI ecosystem",
      price: "$10 – $490",
      features: [
        "Access to AI Participant Community",
        "Earn Rewards for Participation",
        "Basic Analytics Dashboard",
        "Priority Support",
      ],
      cta: "Get Started",
      id: "starter-id", // Ideally from API
      BoosterPackage: 1,
    },
    {
      tier: "Professional",
      title: "Professional Package",
      subtitle: "For active participants & creators",
      price: "$500 & Above",
      features: [
        "All Starter Features",
        "Higher Earning Potential",
        "Advanced Analytics",
        "Dedicated Support",
      ],
      cta: "Upgrade Now",
      popular: true,
      id: "professional-id", // Ideally from API
      BoosterPackage: 2,
    },
  ];

  const visible = packages.filter((p) => filter === "All Packages" || p.tier === filter);

  return (
    <main className="min-h-screen bg-transparent px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Top banner */}
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-[#1E293B] dark:bg-[#0b0b0e] sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-5">
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-violet-50 shadow-inner dark:bg-violet-900/20">
              <AIChipIcon />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1b1740] dark:text-white sm:text-3xl">AI Participant Packages</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                Join AI participants and get more rewards, engagement and growth opportunities.
              </p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 self-start rounded-full border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-semibold text-violet-800 transition hover:bg-violet-100 dark:border-violet-700/50 dark:bg-violet-900/20 dark:text-violet-300 dark:hover:bg-violet-900/40 sm:self-center">
            <InfoIcon />
            Package Benefits
          </button>
        </section>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-xl px-6 py-3 text-sm font-medium transition ${
                filter === t
                  ? "bg-violet-700 text-[#fff] shadow-md shadow-violet-300/50 dark:shadow-violet-900/50"
                  : "border border-slate-100 bg-white text-slate-800 shadow-sm hover:bg-violet-50 dark:border-[#1E293B] dark:bg-[#0b0b0e] dark:text-slate-300 dark:hover:bg-[#15151a]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Package cards */}
        <section className="grid gap-6 pt-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <div
              key={p.tier}
              className={`relative flex flex-col rounded-2xl bg-white p-6 shadow-sm dark:bg-[#0b0b0e] ${
                p.popular
                  ? "border-2 border-violet-600 shadow-xl shadow-violet-200/50 dark:border-violet-500 dark:shadow-violet-900/20"
                  : "border border-slate-100 dark:border-[#1E293B]"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                    <StarIcon />
                    Most Popular
                  </span>
                </div>
              )}

              {p.tier !== "Starter" && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute bottom-0 right-0 h-40 w-40 rounded-tl-[100%] bg-violet-100/60 dark:bg-violet-900/10" />
                </div>
              )}

              <div className="relative flex items-start justify-between">
                {tierIcon[p.tier]}
                <span className="rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                  {p.tier}
                </span>
              </div>

              <h2 className="relative mt-4 text-2xl font-bold text-[#1b1740] dark:text-white">{p.title}</h2>
              <p className="relative mt-1 text-sm text-slate-600 dark:text-slate-400">{p.subtitle}</p>

              <div className="relative mt-5 flex items-end gap-2">
                <span className="text-3xl font-extrabold text-[#1b1740] dark:text-white">{p.price}</span>
                <span className="text-base text-slate-600 dark:text-slate-400">/ Month</span>
              </div>

              <ul className="relative mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[15px] text-slate-800 dark:text-slate-300">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(p)}
                className={`relative mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold transition ${
                  p.popular
                    ? "bg-violet-700 text-[#fff] shadow-lg shadow-violet-300/50 hover:bg-violet-800 dark:bg-violet-600 dark:shadow-violet-900/50 dark:hover:bg-violet-500"
                    : "border-2 border-violet-700 bg-white text-violet-800 hover:bg-violet-50 dark:border-violet-500 dark:bg-transparent dark:text-violet-400 dark:hover:bg-violet-900/20"
                }`}
              >
                {p.cta}
                <ArrowIcon />
              </button>
            </div>
          ))}
        </section>

        {/* Stats bar */}
        <section className="grid grid-cols-2 gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-[#1E293B] dark:bg-[#0b0b0e] lg:grid-cols-4 lg:gap-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-center gap-4 lg:px-6 ${
                i !== stats.length - 1 ? "lg:border-r lg:border-slate-200 dark:lg:border-[#1E293B]" : ""
              }`}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/20">
                <StatIcon type={s.icon} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1b1740] dark:text-white">{s.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Modal Open Integration */}
      <ActivatePlanModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        plan={selectedPlan}
      />
    </main>
  );
}

const stats = [
  { value: "50K+", label: "Active Participants", icon: "users" },
  { value: "2K+", label: "Campaigns Completed", icon: "trophy" },
  { value: "1.2M+", label: "Tasks Executed", icon: "trend" },
  { value: "800+", label: "Brands Served", icon: "shield" },
];
