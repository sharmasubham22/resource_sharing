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
    "flex items-center justify-center rounded-base transition duration-200 font-body cursor-pointer";

  const variants = {
    primary: "bg-brand text-white hover:bg-brand-strong hover:text-white",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    // outline: "border border-gray-300 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-4 py-2.5 text-md",
    md: "px-4 py-2 text-lg",
    lg: "px-6 py-3 text-xl",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled || loading ? disabledStyles : "hover:opacity-90"
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⏳</span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
