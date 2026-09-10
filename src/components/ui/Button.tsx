import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200";

  const variants = {
    primary:
      "bg-geoweb-red text-white hover:bg-geoweb-indigo",
    secondary:
      "border border-geoweb-indigo text-geoweb-indigo hover:bg-geoweb-indigo hover:text-white",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}