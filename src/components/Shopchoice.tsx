import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Import useCart

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface ShopChoiceProps {
  product: Product;
}


const ShopChoice: React.FC<ShopChoiceProps> = ({ product }) => {
  const { addToCart } = useCart(); // Access addToCart from context
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="border-2 w-[300px]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto"
        />
      </div>

      <div className="flex flex-col border-2 w-[300px] p-4">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="mt-2">ราคา: ฿{product.price}</p>

        {/* Quantity Selector */}
        <div className="flex items-center mt-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 bg-white text-black border-2 border-black rounded-full"
          >
            -
          </button>

          <span className="mx-4 text-lg">{quantity}</span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 bg-white text-black border-2 border-black rounded-full"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ShopChoice;
