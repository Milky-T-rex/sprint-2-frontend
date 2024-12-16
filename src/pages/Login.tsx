import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import { useEffect, useState } from "react";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosinstance";
import axios from "axios";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const backendUrl= import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        await axiosInstance.get("/"); // เรียก API เชื่อมต่อเซิร์ฟเวอร์หลัก
        console.log("เชื่อมต่อกับเซิร์ฟเวอร์ได้");
        setLoading(true);
      } catch (error) {
        console.error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้", error);
      }
    };
    const intervalId = setInterval(checkServerConnection, 1000);
    if (loading) clearInterval(intervalId);
    return () => clearInterval(intervalId);
  }, [loading]);
  console.log("เชื่อมต่อ BackendUrl",backendUrl);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("กรุณากรอก Email ให้ถูกต้อง");
      return;
    }
    if (!password) {
      setError("กรุณาใส่รหัสผ่าน");
      return;
    }
    setError("");
    try {
      const response = await axios.post(backendUrl + "/api/user/login", {
        email: email,
        password: password,
      });
      console.log(import.meta.env.VITE_BACKEND_URL)
      if (response.data && response.data.accessToken) {
        console.log("login สำเร็จ");
        localStorage.setItem("token", response.data.accessToken);
        // ตั้งค่า accessToken ในคุกกี้
        document.cookie = `token=${response.data.accessToken}`;
        navigate("/");
      }
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
      {!loading ? (
        <>
          {/* <Navbar /> */}
          <div className="flex items-center justify-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10 flex justify-center">
              <h1>
                กำลังเชื่อมต่อ server... <br /> โปรดรอสักครู่.
              </h1>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center mt-28">
            <form onSubmit={handleLogin}>
              <div className="flex items-center justify-center min-h-screenrelative">
                <div className="relative w-full max-w-md bg-white p-8 rounded-lg shadow-lg z-10">
                  <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
                    Sign in to Milky Tea-rex
                  </h2>
                  <p className="text-center text-sm text-gray-600 mb-6">
                    Quick & Simple way to Automate your payment
                  </p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <PasswordInput
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                    <div className="flex items-center w-full">
                      <input type="checkbox" className="mr-2" />
                      <p className="text-sm text-gray-600">
                        I agree to the{" "}
                        <a href="#" className="text-blue-500 underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-500 underline">
                          Privacy Policy.
                        </a>
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Login
                    </button>
                    <div>
                      หากไม่มีบัญชี ?{" "}
                      <a href="/signup" className="text-blue-500 underline">
                        สมัครสมาชิก
                      </a>
                    </div>
                  <div className="flex items-center my-6">
                    <hr className="flex-1 border-gray-300" />
                    <span className="px-4 text-gray-500 text-sm">OR</span>
                    <hr className="flex-1 border-gray-300" />
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <img src="google-logo-url" alt="Google" className="h-6 w-6" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <img src="apple-logo-url" alt="Apple" className="h-6 w-6" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <img src="facebook-logo-url" alt="Facebook" className="h-6 w-6" />
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-6">
                    © 2024. All Rights Reserved. Milky Tea-rex
                  </p>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};
export default Login;