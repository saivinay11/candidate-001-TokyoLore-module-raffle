import React from "react";
import { APP_CONFIG } from "@/lib/config";
import { LoadingSpinner } from "./loading-spinner";

type ButtonVariant = "primary" | "success" | "danger" | "outline";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const ActionButton = ({
  children,
  variant = "primary",
  isLoading = false,
  loadingText,
  fullWidth = false,
  icon,
  className = "",
  ...props
}: ActionButtonProps) => {
  const { primaryColor, successColor, dangerColor, borderRadius } =
    APP_CONFIG.widgetStyles;

  // Determine background color based on variant
  const getStyleForVariant = (): React.CSSProperties => {
    switch (variant) {
      case "success":
        return {
          backgroundColor: successColor,
          boxShadow: `0 4px 10px -2px rgba(34, 197, 94, 0.4)`,
        };
      case "danger":
        return {
          backgroundColor: dangerColor,
          boxShadow: `0 4px 10px -2px rgba(239, 68, 68, 0.4)`,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          border: `1px solid ${primaryColor}`,
          color: primaryColor,
        };
      default:
        return {
          backgroundColor: primaryColor,
          boxShadow: `0 4px 10px -2px rgba(233, 30, 99, 0.4)`,
        };
    }
  };

  const buttonStyle = getStyleForVariant();

  return (
    <button
      className={`py-2 px-4 rounded-md transition-all duration-300 text-white relative overflow-hidden 
        disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 min-h-[44px] 
        flex items-center justify-center font-semibold
        ${fullWidth ? "w-full" : ""} 
        ${variant === "outline" ? "text-[#E91E63] hover:bg-[#E91E63]/10" : ""}
        ${className}`}
      style={{
        ...buttonStyle,
        borderRadius,
      }}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className="flex items-center justify-center">
        {isLoading && (
          <LoadingSpinner
            size="small"
            color={variant === "outline" ? primaryColor : "white"}
            className="mr-2"
          />
        )}
        {icon && !isLoading && <span className="mr-2">{icon}</span>}
        {isLoading && loadingText ? loadingText : children}
      </span>
    </button>
  );
};
