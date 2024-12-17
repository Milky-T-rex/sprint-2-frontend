import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  _id: string;
  name: string;
  weight: string;
  price: number;
  imageUrl: string;
  category: string;
}

const ProductListPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://project-backend-pawt.onrender.com/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const mappedData = data.map((product: Product) => ({
          id: product._id,
          name: product.name,
          weight: product.weight || "",
          price: product.price || 0,
          imageUrl: product.imageUrl || "",
          category: product.category || "",
        }));
        setProducts(mappedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const handleSearch = (query: string) => {
    setSelectedCategory("ทั้งหมด");
    setSearchQuery(query);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "ทั้งหมด" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHomeClick = () => navigate("/");
  const handleProductClick = () => navigate("/products");

  return (
    <div className="flex flex-col mx-auto p-10">
      <nav className="flex text-gray-600 text-sm flex-wrap mb-6">
        <button onClick={handleHomeClick} className="hover:text-[#667c26] transition-colors duration-500">Home &gt;</button>
        <button onClick={handleProductClick} className="hover:text-[#667c26] transition-colors duration-500">Products &gt;</button>
      </nav>
      <div className="flex flex-wrap">
        <Sidebar onCategoryChange={handleCategoryChange} onSearch={handleSearch} />
        <main className="w-full lg:w-3/4 p-4">
  {loading ? (
    <p>กำลังโหลดสินค้า...</p>
  ) : error ? (
    <p className="text-red-500">เกิดข้อผิดพลาด: {error}</p>
  ) : (
    <>
      <h1 className="mb-4 text-xl font-bold">
        {filteredProducts.length} รายการในหมวดหมู่: {searchQuery || selectedCategory}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <ProductCard
              id={product.id}
              name={product.name}
              weight={product.weight}
              price={product.price}
              imageUrl={product.imageUrl}
              category={product.category}
            />
          </Link>
        ))}
      </div>
    </>
  )}
</main>

      </div>
    </div>
  );
};

export default ProductListPage;
