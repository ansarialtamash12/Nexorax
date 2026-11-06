"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

declare global {
  interface Window {
    googleTranslateScriptAdded?: boolean;
    googleTranslateInitialized?: boolean;
    googleTranslateElementInit?: () => void;
    google: {
      translate: {
        TranslateElement: new (options: { pageLanguage: string; autoDisplay: boolean }, elementId: string) => void;
      };
    };
  }
}


const languages = [
 { code: "en", label: "English" },
 { code: "ar", label: "العربية" },
 { code: "zh-CN", label: "中文" },
 { code: "es", label: "Español" },
 { code: "it", label: "Italian" },
 { code: "fr", label: "Français" },
 { code: "hi", label: "हिंदी" },
 { code: "vi", label: "Tiếng Việt" },
 { code: "ja", label: "日本語" },
 { code: "ko", label: "한국어" },
 { code: "ru", label: "Русский" },
 { code: "pt", label: "Português" },
 { code: "ms", label: "Melayu" },
 { code: "th", label: "แบบไทย" },
 { code: "de", label: "Deutsch" },
];


const flagMap: Record<string, string> = {
 'en': 'https://flagcdn.com/w20/us.png',
 'ar': 'https://flagcdn.com/w20/sa.png',
 'zh-CN': 'https://flagcdn.com/w20/cn.png',
 'es': 'https://flagcdn.com/w20/es.png',
 'it': 'https://flagcdn.com/w20/it.png',
 'fr': 'https://flagcdn.com/w20/fr.png',
 'hi': 'https://flagcdn.com/w20/in.png',
 'vi': 'https://flagcdn.com/w20/vn.png',
 'ja': 'https://flagcdn.com/w20/jp.png',
 'ko': 'https://flagcdn.com/w20/kr.png',
 'ru': 'https://flagcdn.com/w20/ru.png',
 'pt': 'https://flagcdn.com/w20/pt.png',
 'ms': 'https://flagcdn.com/w20/my.png',
 'th': 'https://flagcdn.com/w20/th.png',
 'de': 'https://flagcdn.com/w20/de.png',
};

const GoogleTranslate = () => {
 const [currentLang, setCurrentLang] = useState(languages[0] ?? { code: "en", label: "English" });
 const [isOpen, setIsOpen] = useState(false);
 const [mounted, setMounted] = useState(false);
 const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
 const dropdownRef = useRef<HTMLUListElement>(null);
 const containerRef = useRef<HTMLDivElement>(null);
 const buttonRef = useRef<HTMLButtonElement>(null);

 // ✅ Ensure component is mounted on client
 useEffect(() => {
   setMounted(true);
   // Create a separate container for Google Translate widget outside React's DOM
   const container = document.createElement("div");
   container.id = "google_translate_element";
   container.style.display = "none";
   document.body.appendChild(container);
   setPortalContainer(container);

   return () => {
     setMounted(false);
     // Clean up the container
     if (container && container.parentNode) {
       try {
         container.parentNode.removeChild(container);
       } catch (e) {
         // Ignore errors
       }
     }
   };
 }, []);

 // ✅ Load Google Translate only once globally
 useEffect(() => {
   if (!mounted || !portalContainer) return;
   // if google already loaded, skip
   if (window.googleTranslateScriptAdded) return;
   window.googleTranslateScriptAdded = true;

   // Delay loading to ensure DOM is stable
   const timeoutId = setTimeout(() => {
     window.googleTranslateElementInit = function () {
       // Prevent double initialization
       if (!window.googleTranslateInitialized) {
         window.googleTranslateInitialized = true;
         try {
           if (portalContainer && document.body.contains(portalContainer)) {
             new window.google.translate.TranslateElement(
               { pageLanguage: "en", autoDisplay: false },
               portalContainer.id
             );
           }
         } catch (error) {
           console.error("Google Translate initialization error:", error);
         }
       }
     };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => console.error("Failed to load Google Translate script");
    document.body.appendChild(script);
  }, 1000); // Delay by 1 second

   // Cleanup on unmount
   return () => {
     clearTimeout(timeoutId);
     // Clean up the container and any Google Translate elements
     if (portalContainer && portalContainer.parentNode) {
       try {
         portalContainer.innerHTML = "";
         portalContainer.parentNode.removeChild(portalContainer);
       } catch (e) {
         // Ignore errors
       }
     }
   };
 }, [mounted, portalContainer]);


 // ✅ Close dropdown when clicking outside
 useEffect(() => {
   const handleClickOutside = (event: MouseEvent) => {
     if (containerRef.current && !containerRef.current.contains(event.target as Node) && !dropdownRef.current?.contains(event.target as Node)) {
       setIsOpen(false);
     }
   };

   if (isOpen) document.addEventListener("mousedown", handleClickOutside);
   return () => document.removeEventListener("mousedown", handleClickOutside);
 }, [isOpen]);

 // ✅ Language change
 const handleLanguageClick = (lang: { code: string; label: string }) => {
   const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
   if (select) {
     select.value = lang.code;
     select.dispatchEvent(new Event("change"));
     setCurrentLang(lang);
     setIsOpen(false);
   } else {
     // Retry after a short delay if Google Translate isn't ready
     setTimeout(() => {
       const retrySelect = document.querySelector(".goog-te-combo") as HTMLSelectElement;
       if (retrySelect) {
         retrySelect.value = lang.code;
         retrySelect.dispatchEvent(new Event("change"));
         setCurrentLang(lang);
         setIsOpen(false);
       } else {
         console.warn("Google Translate not yet initialized");
       }
     }, 500);
   }
 };

 // Don't render until mounted on client
 if (!mounted) {
   return null;
 }

 return (
   <div className="relative" ref={containerRef}>
     {/* Button — navbar ke andar fit */}
     <button
       ref={buttonRef}
       onClick={() => setIsOpen((prev) => !prev)}
       className="flex items-center justify-center p-1.5 rounded-md hover:bg-fg/5 transition focus:outline-none"
       type="button"
       id="googleTranslateDropdown"
       aria-expanded={isOpen}
       aria-label="Change language"
     >
       <img
         src={flagMap[currentLang.code]}
         alt={currentLang.label}
         className="w-5 h-4 rounded-sm object-cover"
       />
     </button>

     {/* Dropdown — compact, navbar theme */}
     {isOpen && (
       <ul
         ref={dropdownRef}
         className="absolute right-0 top-full mt-2 w-56 max-h-[70vh] overflow-y-auto rounded-xl border border-line bg-bg/95 p-2 shadow-xl backdrop-blur-xl z-[9999]"
         aria-labelledby="googleTranslateDropdown"
       >
         {languages.map((lang) => (
           <li
             key={lang.code}
             role="button"
             tabIndex={0}
             onClick={() => handleLanguageClick(lang)}
             onKeyDown={(e) => e.key === "Enter" && handleLanguageClick(lang)}
             className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition hover:bg-gold/10 ${
               currentLang.code === lang.code ? "text-gold font-semibold" : "text-soft"
             }`}
           >
             <img
               src={flagMap[lang.code]}
               alt={lang.label}
               className="w-5 h-4 rounded-sm object-cover"
             />
             <span className="text-sm">{lang.label}</span>
             {currentLang.code === lang.code && (
               <span className="ml-auto text-gold text-xs">✓</span>
             )}
           </li>
         ))}
       </ul>
     )}
   </div>
 );
};


export default GoogleTranslate;