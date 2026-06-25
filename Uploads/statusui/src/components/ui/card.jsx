import React from "react";

export function Card({ className = "", ...props }) {
  return <section className={`card ${className}`.trim()} {...props} />;
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`card-header ${className}`.trim()} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={`card-body ${className}`.trim()} {...props} />;
}

export function CardFooter({ className = "", ...props }) {
  return <div className={`card-footer ${className}`.trim()} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h2 className={`card-title ${className}`.trim()} {...props} />;
}

export function CardDescription({ className = "", ...props }) {
  return <p className={`card-description ${className}`.trim()} {...props} />;
}

export function CardAction({ className = "", ...props }) {
  return <div className={`card-action ${className}`.trim()} {...props} />;
}
