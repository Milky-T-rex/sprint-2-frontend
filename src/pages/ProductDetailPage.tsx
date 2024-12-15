import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Shopchoice from "../components/Shopchoice";

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
        const response = await fetch(`http://localhost:8000/api/product/${id}`);
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

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Products
      </button>

      <ul className="flex gap-3 ml-40 pb-10">
        <li>Home &gt;</li>
        <li>Product &gt;</li>
        <li>{product.name}</li>
      </ul>

      <Shopchoice product={product} />

      <div className="flex flex-row justify-center mt-20 pb-20">
        <section className="flex flex-col border-4 px-10 py-10 mr-6 w-1/5">
          <div className="flex justify-center mb-4">
            <img
              src="https://koph.co/img/icons/cocoa.svg"
              className="w-16 h-16"
              alt="Taste Note"
            />
          </div>
          <div>
            <h1 className="text-center font-bold text-xl">Cocoa & Nutty</h1>
            <h2 className="text-center">Taste Note</h2>
          </div>
        </section>

        <section className="flex flex-col border-4 px-10 py-10 mr-6 w-1/5">
          <div className="flex justify-center mb-4">
            <img
              src="https://koph.co/img/icons/medium-scale.svg"
              className="w-16 h-16"
              alt="Roast Level"
            />
          </div>
          <div>
            <h1 className="text-center font-bold text-xl">Medium</h1>
            <h2 className="text-center">Roast Level</h2>
          </div>
        </section>

        <section className="flex flex-col border-4 px-10 py-10 mr-6 w-1/5">
          <div className="flex justify-center mb-4">
            <img
              src="https://koph.co/img/icons/house-blend.svg"
              className="w-16 h-16"
              alt="Mixed Origin"
            />
          </div>
          <div>
            <h1 className="text-center font-bold text-xl">House Blend</h1>
            <h2 className="text-center">Mixed Origin</h2>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;