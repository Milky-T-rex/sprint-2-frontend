import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

const AutoMate: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>{isLogin ? "Login to Milky Tea-rex" : "Sign up for Milky Tea-rex"}</h2>
        <button 
          onClick={handleToggle} 
          className="toggle-button"
        >
          {isLogin ? "Switch to Sign Up" : "Switch to Login"}
        </button>
      </div>

      {isLogin ? (
        <Login />
      ) : (
        <Signup />
      )}
    </div>
  );
};

export default AutoMate;