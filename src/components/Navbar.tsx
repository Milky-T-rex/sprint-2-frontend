// Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className=" fixed w-full z-50">
      <div className="flex justify-between items-center bg-white text-black px-6 py-2 shadow-lg">
        <div className="flex flex-row items-center">
          <Link to="/" className="text-2xl font-bold">Milky-Tea-Rex</Link>
          <div>
            <ul className="flex gap-6 text-lg px-4 py-1">
              <li>
                <Link
                  to="/products"
                  className="hover:text-gray-400 cursor-pointer"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-gray-400 cursor-pointer"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <ul className="flex gap-6 text-lg items-center">
            <li>
              <Link
                to="/login"
                className="hover:text-gray-400 cursor-pointer py-4"
              >
                <img
                  src="https://icon-library.com/images/login-icon-images/login-icon-images-0.jpg"
                  alt="Login"
                  className="w-8 h-8"
                />
              </Link>
            </li>
            <li>
              <CartButton />
            </li>
            <li>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;