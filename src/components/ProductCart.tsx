// // src/components/ProductCart.tsx
import React from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface ProductCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ProductCart: React.FC<ProductCartProps> = ({ isOpen, onClose, cartItems, setCartItems }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleDelete = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-8rem)]">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-4 border-b pb-4">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm">฿{item.price} x {item.quantity}</p>
              </div>
              <div className="text-right font-bold">฿{item.price * item.quantity}</div>
              <div className="flex items-center ml-4">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity > 1 ? item.quantity - 1 : 1)}
                  className="bg-gray-200 px-2 py-1 text-xs rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 text-xs rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 ml-4 hover:text-red-700"
              >
                ลบ
              </button>
              
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <div className="pb-10 border-t">
        <div className="flex justify-between font-bold mb-4">
          <span>Total:</span>
          <span>฿{totalPrice}</span>
        </div>
        <button
          className="w-full bg-red-500 text-white rounded hover:bg-red-400 transition duration-300"
          disabled={cartItems.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
