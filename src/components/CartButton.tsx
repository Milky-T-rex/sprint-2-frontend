import React from "react";
import { useCart } from "../context/CartContext"; // Import context
import { useNavigate } from "react-router-dom"; // For navigation

const CartButton: React.FC = () => {
  const { cartItems } = useCart(); // Access cart items from context
  const navigate = useNavigate(); // Initialize navigate function

  // Calculate the total quantity of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle click to navigate to the cart page
  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div className="relative">
      <button
        onClick={handleCartClick}
        className="bg-[#4B5320] hover:bg-[#667C26] text-white font-bold py-2 px-4 rounded flex items-center"
        aria-label={`Cart with ${totalItems} items`}
      >
        <i className="fa fa-shopping-cart mr-2"></i>
        Cart
        {totalItems > 0 && (
          <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-2">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartButton;
