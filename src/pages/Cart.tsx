import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate(); // Create navigate function

  // const handleAddToCart = () => {
  //   addToCart({ id: 4, name: "New Tea Blend", price: 10.99, quantity: 1 });
  // };
  const handleAddMoreProducts  = () => {
    navigate("/products");
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleIncreaseQuantity = (id: string) => {
    updateQuantity(id, 1);  // เพิ่มปริมาณ
  };

  const handleDecreaseQuantity = (id: string) => {
    updateQuantity(id, -1); // ลดปริมาณ
  };

  const handleCheckout = () => {
    const subtotal = calculateSubtotal();
    const shipping = 5.99;
    const tax = 6.40;
    const total = subtotal + shipping + tax;

    // Pass detailed information to Checkout page
    navigate("/checkout", {
      state: {
        orderSummary: cartItems,
        subtotal,
        shipping,
        tax,
        total,
      },
    });
  };

  return (
    <div className="flex justify-between p-6">
      {/* Left Side: Cart Items */}
      <div className="w-3/4">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-6 p-4 border-b">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200"></div> {/* Placeholder for image */}
                  <div>
                    <p className="text-lg font-medium">{item.name}</p>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="text-gray-500 hover:text-gray-700 text-lg font-bold px-3 py-1 rounded"
                    disabled={item.quantity <= 1} // ไม่ให้ลดจำนวนสินค้าถ้าปริมาณเป็น 1
                  >
                    -
                  </button>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="text-gray-500 hover:text-gray-700 text-lg font-bold px-3 py-1 rounded"
                  >
                    +
                  </button>


                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-trash-alt"></i> {/* Trash Icon */}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>

      {/* Right Side: Order Summary */}
      <div className="w-1/4 bg-white p-6 border-l">
        <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
        <div className="space-y-4">
          <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
          <p>Shipping: $5.99</p>
          <p>Tax: $6.40</p>
          <p className="font-bold">Total: ${(calculateSubtotal() + 5.99 + 6.40).toFixed(2)}</p>
        </div>
        <div className="mt-6 space-y-4">
          <button
            onClick={handleClearCart}
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Clear Cart
          </button>
          <button
            onClick={handleAddMoreProducts }
            className="w-full py-2 mt-4 text-gray-600 hover:text-gray-800"
          >
            Add More Products
          </button>
          <button
            onClick={handleCheckout}
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;