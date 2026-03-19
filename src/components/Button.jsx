import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  onClick,
  type = "button",
  className = "",
}) => {
  const base =
    "inline-flex items-center justify-center rounded-base font-medium transition duration-200 cursor-pointer";

  const variants = {
    primary: "bg-brand text-white hover:bg-brand-strong hover:text-background",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    // danger: "bg-red-600 text-white hover:bg-red-700",
    // outline: "border border-gray-300 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-4 py-2.5 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <span className="animate-spin mr-2">⏳</span>
      ) : (
        icon && <span className="mr-2">{icon}</span>
      )}

      {children}
    </button>
  );
};

export default Button;
