import { useState, FormEvent } from "react";
import PasswordInput from "../components/PasswordInput";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosinstance";
import axios from "axios";
import facebookLogo from "../assets/Facebook-logo.svg";
import googleLogo from "../assets/Google_Icons-09-512.webp";
import appleLogo from "../assets/Apple_logo_black.png";
import imgBG from "../assets/SignuP.png";

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      setError("กรุณาใส่ชื่อผู้ใช้งาน");
      return;
    }

    if (!validateEmail(email)) {
      setError("กรุณากรอก Email ให้ถูกต้อง");
      return;
    }

    if (!password) {
      setError("กรุณาใส่รหัสผ่าน");
      return;
    }

    setError(null);

    // SignUp API call
    try {
      const response = await axiosInstance.post(backendUrl + "/api/user/register", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      alert("Registration Successful!"); // ใช้ toast หรือ sweetalert2 แทนได้
      navigate("/login");

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // ตรวจสอบว่ามี response และ message หรือไม่
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("เกิดข้อผิดพลาดจากการตอบสนองของเซิร์ฟเวอร์");
        }
      } else if (error instanceof Error) {
        // กรณีที่เป็น Error ปกติ
        setError(error.message);
      } else {
        // กรณีที่ไม่สามารถระบุประเภทได้
        setError("มีErrorที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง");
      }
    }
  };

  return (
    <>
      <div
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${imgBG})`,
        }}
      >
        <form onSubmit={handleSignUp} className="relative w-full max-w-md bg-white p-8 rounded-lg shadow-xl z-10">
          <h2 className="text-center text-3xl font-semibold text-gray-800 mb-2">
            Sign up to Milky Tea-rex
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Quick & Simple way to Automate your payment
          </p>
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="space-y-4">
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"  // Ensure full width for consistency
            />
          </div>
          {error && <p className="text-red-500 text-xs pt-2">{error} </p>}
          <div className="flex items-center w-full my-4">
            <input type="checkbox" className="mr-2" />
            <p className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            CREATE AN ACCOUNT
          </button>
          <div className="px-4 py-2 text-center">
            มีบัญชีอยู่แล้ว ?{" "}
            <a href="/login" className="text-blue-500 underline">
              เข้าสู่ระบบ
            </a>
          </div>
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>
          <div className="flex justify-center space-x-4">
            <a
              href="https://accounts.google.com/o/oauth2/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <img src={googleLogo} alt="Google" className="h-6 w-6" />
            </a>
            <a
              href="https://appleid.apple.com/auth/authorize"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <img src={appleLogo} alt="Apple" className="h-6 w-5" />
            </a>
            <a
              href="https://www.facebook.com/vX.X/dialog/oauth"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <img src={facebookLogo} alt="Facebook" className="h-6 w-6" />
            </a>
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">
            © 2024. All Rights Reserved. Milky Tea-rex
          </p>
        </form>

      </div>
    </>
  );
};

export default SignUp;