// Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import ProjectIcon from "../assets/Project-Group-3-Icon.png";

const Navbar: React.FC = () => {

  return (
    <div className=" fixed w-full z-50">
      <div className="flex justify-between items-center bg-white text-black px-6 py-2 shadow-lg">
        <div className="flex flex-row items-center">
          
          <Link to="/" className="flex items-center text-2xl font-bold">
            <img src={ProjectIcon} className="flex w-6 object-scale-down"/>Milky-Tea-Rex
          </Link>
          <div>
            <ul className="flex gap-6 text-lg px-4">
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
              <CartButton/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;