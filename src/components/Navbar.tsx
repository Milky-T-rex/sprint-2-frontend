import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import { useNavigate } from "react-router-dom";
import ProjectIcon from "../assets/Project-Group-3-Icon.png";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <div className="fixed w-full z-50">
      <div className="flex justify-between items-center bg-white text-black px-6 py-2 shadow-lg h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-2xl font-bold pr-6">
            <img src={ProjectIcon} className="flex w-6 object-scale-down mr-2" alt="Logo" />
            Milky-Tea-Rex
          </Link>

          <div className="hidden lg:flex gap-6 text-lg">
            <ul className="flex gap-6 items-center">
              <li>
                <Link
                  to="/products"
                  className="font-bold hover:text-[#667C26] transition-colors duration-500 cursor-pointer"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="font-bold hover:text-[#667C26] transition-colors duration-500 cursor-pointer"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          className="lg:hidden block text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 text-lg">
          <ul className="flex gap-6 items-center">
            <li>
              <Link to="/login" className="hover:text-gray-400 cursor-pointer py-4">
                <img
                  src="https://icon-library.com/images/login-icon-images/login-icon-images-0.jpg"
                  alt="Login"
                  className="w-8 h-8 rounded-full text-white bg-black hover:bg-[#667C26]"
                />
              </Link>
            </li>
            <li>
              <CartButton />
            </li>
            <li>
              <button
                onClick={logout}
                className="bg-black text-white px-4 py-2 rounded hover:bg-red-800 text-sm font-bold"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg text-black p-4">
          <ul className="flex flex-col items-center gap-4">
            <li>
              <Link
                to="/products"
                className="font-bold hover:text-[#667C26] transition-colors duration-500 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="font-bold hover:text-[#667C26] transition-colors duration-500 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-gray-400 cursor-pointer py-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src="https://icon-library.com/images/login-icon-images/login-icon-images-0.jpg"
                  alt="Login"
                  className="w-8 h-8 "
                />
              </Link>
            </li>
            <li>
              <CartButton />
            </li>
            <li>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="bg-black text-white px-4 py-2 rounded hover:bg-red-800 text-sm font-bold"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
