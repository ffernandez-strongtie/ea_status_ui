import React from "react";

const tones = {
  default: "badge",
  success: "badge success",
  warning: "badge warning",
  info: "badge info",
  destructive: "badge danger-soft",
};

export function Badge({ tone = "default", className = "", children, ...props }) {
  return (
    <span className={`${tones[tone] || tones.default} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
