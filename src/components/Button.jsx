import React from "react";

const Button = ({ className, circle, variant, children, ...rest }) => {
  const bg =
    (variant == "primary" && "bg-primary") ||
    (variant == "secondary" && "bg-secondary") ||
    (variant == "danger" && "bg-[#dc3545]") ||
    (variant == "warning" && "bg-[#ffc107] !text-black") ||
    (variant == "success" && "bg-[#198754]") ||
    variant;
  return (
    <button
      className={`${bg} hover:opacity-75
  p-2 transition duration-100 text-gray-50 flex items-center justify-center gap-2 ${
    circle ? "rounded-full aspect-square" : "rounded-radius"
  } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
