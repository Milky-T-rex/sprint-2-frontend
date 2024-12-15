import React from "react";

interface AddToCartButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`px-8 py-3 mt-4 mb-2 bg-red-500 text-white rounded-full text-lg hover:bg-red-400 transition duration-300 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      ใส่ลงตะกร้า
    </button>
  );
};

export default AddToCartButton;
