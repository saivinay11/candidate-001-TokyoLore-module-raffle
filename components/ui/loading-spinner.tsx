import React from "react";
import { APP_CONFIG } from "@/lib/config";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
  className?: string;
}

export const LoadingSpinner = ({
  size = "medium",
  color = APP_CONFIG.widgetStyles.primaryColor,
  className = "",
}: LoadingSpinnerProps) => {
  // Determine size based on prop
  const getSizeInPixels = () => {
    switch (size) {
      case "small":
        return 4;
      case "large":
        return 8;
      default:
        return 6;
    }
  };

  const sizeInPixels = getSizeInPixels();

  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 ${className}`}
      style={{
        width: `${sizeInPixels * 4}px`,
        height: `${sizeInPixels * 4}px`,
        borderColor: color,
      }}
      aria-label="Loading..."
      role="status"
    />
  );
};
