import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderCompletePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderSummary, subtotal, shipping, tax, total } = location.state as {
    orderSummary: { product: string; quantity: number; price: number }[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };

  const handleNavigateToProducts = () => {
    navigate("/products");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-center">
        <div className="flex flex-col items-center">
          <div className="text-green-500 text-6xl mb-4">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Order Complete!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully
            processed.
          </p>
        </div>
        <div className="text-left">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Order Summary
          </h3>
          <ul>
            {orderSummary.map((item, index) => (
              <li
                key={index}
                className="flex justify-between mb-3 text-gray-700"
              >
                <span>
                  {item.product} x{item.quantity}
                </span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-3 text-gray-700">
            <p className="flex justify-between">
              <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping:</span> <span>${shipping.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax:</span> <span>${tax.toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-bold text-gray-800 mt-3">
              <span>Total:</span> <span>${total.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <button 
          onClick={handleNavigateToProducts}
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderCompletePage;
