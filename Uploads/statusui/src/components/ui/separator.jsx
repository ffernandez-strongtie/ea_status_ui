import React from "react";

export function Separator({ className = "", orientation = "horizontal", ...props }) {
  return <hr className={`separator ${orientation} ${className}`.trim()} {...props} />;
}
