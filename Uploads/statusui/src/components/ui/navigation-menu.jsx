import React from "react";

export function NavigationMenu({ className = "", ...props }) {
  return <nav className={`navigation-menu ${className}`.trim()} {...props} />;
}

export function NavigationMenuList({ className = "", ...props }) {
  return <div className={`navigation-menu-list ${className}`.trim()} {...props} />;
}

export function NavigationMenuItem({ className = "", ...props }) {
  return <div className={`navigation-menu-item ${className}`.trim()} {...props} />;
}

export function NavigationMenuLink({ className = "", ...props }) {
  return <a className={`navigation-menu-link ${className}`.trim()} {...props} />;
}

export function NavigationMenuTrigger({ className = "", ...props }) {
  return <button type="button" className={`navigation-menu-trigger ${className}`.trim()} {...props} />;
}

export function NavigationMenuContent({ className = "", ...props }) {
  return <div className={`navigation-menu-content ${className}`.trim()} {...props} />;
}

export function NavigationMenuIndicator({ className = "", ...props }) {
  return <div className={`navigation-menu-indicator ${className}`.trim()} {...props} />;
}

export function NavigationMenuViewport({ className = "", ...props }) {
  return <div className={`navigation-menu-viewport ${className}`.trim()} {...props} />;
}
