import React from "react";

const SheetContext = React.createContext(null);

export function Sheet({ open = false, onOpenChange, children }) {
  return <SheetContext.Provider value={{ open, onOpenChange }}>{children}</SheetContext.Provider>;
}

export function SheetTrigger({ asChild = false, children, ...props }) {
  const context = React.useContext(SheetContext);
  if (!context) return null;
  const handleClick = (event) => {
    if (typeof children?.props?.onClick === "function") {
      children.props.onClick(event);
    }
    if (!event.defaultPrevented) {
      context.onOpenChange?.(true);
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { ...props, onClick: handleClick });
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export function SheetContent({ className = "", children, ...props }) {
  const context = React.useContext(SheetContext);
  if (!context?.open) return null;
  return (
    <div className={`sheet is-open ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function SheetHeader({ className = "", ...props }) {
  return <div className={`sheet-header ${className}`.trim()} {...props} />;
}

export function SheetTitle({ className = "", ...props }) {
  return <h2 className={`sheet-title ${className}`.trim()} {...props} />;
}

export function SheetDescription({ className = "", ...props }) {
  return <p className={`sheet-description ${className}`.trim()} {...props} />;
}

export function SheetFooter({ className = "", ...props }) {
  return <div className={`sheet-footer ${className}`.trim()} {...props} />;
}

export function SheetClose({ asChild = false, children, ...props }) {
  const context = React.useContext(SheetContext);
  const handleClick = (event) => {
    if (typeof children?.props?.onClick === "function") {
      children.props.onClick(event);
    }
    if (!event.defaultPrevented) {
      context?.onOpenChange?.(false);
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { ...props, onClick: handleClick });
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
