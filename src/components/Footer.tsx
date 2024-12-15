import facebookLogo from "../assets/Facebook-logo.svg";
import instagramLogo from "../assets/Instagram-logo.svg";

const Footer = () => {
  return (
    <div id="footer" className="bg-slate-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
        {/* Left Section */}
        <div className="text-left">
          <h1 className="text-3xl font-semibold">MILKY-TEA-REX</h1>
          <p className="text-sm mt-2 max-w-md">
            Incredible, sustainably sourced tea delivered fresh from the best
            roasters in the nation.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebookLogo}
                alt="facebook"
                className="w-6 hover:opacity-80 transition"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagramLogo}
                alt="instagram"
                className="w-6 hover:opacity-80 transition"
              />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-left">
          <h2 className="text-xl font-semibold">OVERVIEW</h2>
          <div className="flex gap-12 mt-4">
            <div>
              <p className="hover:text-gray-400 cursor-pointer">HOME</p>
              <p className="hover:text-gray-400 cursor-pointer">SHOP</p>
              <p className="hover:text-gray-400 cursor-pointer">HOW TO</p>
            </div>
            <div>
              <p className="hover:text-gray-400 cursor-pointer">
                RECOMMENDATION
              </p>
              <p className="hover:text-gray-400 cursor-pointer">ROASTER</p>
              <p className="hover:text-gray-400 cursor-pointer">BLOG</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-slate-700 text-center py-4 mt-8">
        <p className="text-sm">Copyright 2024 All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
