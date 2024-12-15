// src/components/ProductCard.tsx
import React from 'react';
import rainbow from '../assets/rainbow.jpg'
import { Link } from 'react-router-dom';

type ProductCardProps = {
  id: string;
  name: string;
  weight: string;
  price: number;
  imageUrl: string;
  category: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ 
  id,
  name,
  weight, 
  price
  
}) => {
  return (
    <div className="border p-4 rounded-lg transition-transform hover:scale-105 hover:shadow-lg">
      <Link to={`/products/${id}`} className="block border p-4 rounded shadow hover:shadow-lg">
        <div className="relative aspect-square mb-2">
          <img
            src={rainbow}
            alt={name}
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.jpg'; // ใส่รูป placeholder กรณีโหลดรูปไม่สำเร็จ
            }}
          />
        </div>
        <h2 className="text-md font-semibold truncate">{name}</h2>
        <p className="text-sm text-gray-600">{weight}</p>
        <p className="text-md font-bold text-green-600">{price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;