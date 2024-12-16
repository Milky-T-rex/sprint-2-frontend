import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShopChoice from '../components/Shopchoice';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  taste?: string;
  weight?: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch product details from the backend
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`https://project-backend-pawt.onrender.com/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct({
          id: data._id,
          name: data.name,
          description: data.description,
          imageUrl: data.image || "",
          price: data.price || 0,
          category: data.category,
          taste: data.taste || "",
          weight: data.weight || "",
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product Not Found</div>;
  }

  // Navigate back to the previous page
  const handleHomeClick = () => navigate("/");
  const handleProductClick = () => navigate("/products");

  return (
    <div className="container mx-auto p-10 items-center">
      {/* Back Button */}
      {/* <button 
        onClick={handleBackClick} 
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Products
      </button> */}

      {/* Breadcrumb */}
      <nav className="flex gap-2 text-gray-600 text-sm mb-8">
        <button onClick={handleHomeClick} className='hover:text-[#667c26] transition-colors duration-500'>Home &gt;</button>
        <button onClick={handleProductClick} className='hover:text-[#667c26] transition-colors duration-500'>Products &gt;</button>
        <span className="font-semibold text-gray-800">{product.name}</span>
      </nav>

      {/* Shop Choice */}
      <div className='flex justify-center items-center'>
        <ShopChoice product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
