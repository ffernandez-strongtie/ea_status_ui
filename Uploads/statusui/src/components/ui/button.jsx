import React from "react";

const variants = {
  default: "button",
  primary: "button primary",
  secondary: "button secondary",
  outline: "button outline-primary",
  ghost: "button ghost",
  destructive: "button danger-soft",
  link: "button link",
};

const sizes = {
  default: "",
  sm: "button-sm",
  lg: "button-lg",
  icon: "button-icon",
};

function mergeClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Button = React.forwardRef(function Button(
  { className = "", variant = "default", size = "default", asChild = false, children, ...props },
  ref,
) {
  const Comp = asChild ? React.Fragment : "button";
  const classNames = mergeClassNames(variants[variant] || variants.default, sizes[size] || "", className);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ref,
      className: mergeClassNames(classNames, children.props.className),
    });
  }

  return (
    <Comp ref={ref} className={classNames} {...props}>
      {children}
    </Comp>
  );
});
