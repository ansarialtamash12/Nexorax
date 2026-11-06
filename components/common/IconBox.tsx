import { LucideIcon } from "lucide-react";
import React, { ReactNode, isValidElement } from "react";

interface IconBoxProps {
  icon: LucideIcon | ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function IconBox({ icon, size = "md", className = "" }: IconBoxProps) {
  const sizeClasses = {
    sm: "h-10 w-10 sm:h-12 sm:w-12",
    md: "h-16 w-16 sm:h-20 sm:w-20",
    lg: "h-20 w-20 sm:h-24 sm:w-24",
  };

  const iconSizeClasses = {
    sm: "h-5 w-5 sm:h-6 sm:w-6",
    md: "h-8 w-8 sm:h-10 sm:w-10",
    lg: "h-10 w-10 sm:h-12 sm:w-12",
  };

  const renderIcon = () => {
    // Case 1: JSX Element Pass Hua Hai
    if (isValidElement(icon)) {
      return icon; // Parent CSS handle karegi color ko
    }
    
    // Case 2: Component Type Pass Hua Hai
    if (typeof icon === "function" || (typeof icon === "object" && icon !== null && "$$typeof" in icon)) {
      const IconComponent = icon as LucideIcon;
      return (
        <IconComponent 
          aria-hidden="true" 
          className={iconSizeClasses[size]} 
          strokeWidth={2.5} 
        />
      );
    }

    return null;
  };

  return (
    <div
      className={`
        flex items-center justify-center rounded-2xl 
        bg-[#7C3AED] shadow-lg shadow-purple-500/30 
        transition-transform duration-300 group-hover:scale-110 
        ${sizeClasses[size]} ${className}
        
        /* CSS Magic: Yeh line icon ka color force kar degi */
        [&_svg]:!text-white [&_svg]:!stroke-white
      `}
    >
      {renderIcon()}
    </div>
  );
}