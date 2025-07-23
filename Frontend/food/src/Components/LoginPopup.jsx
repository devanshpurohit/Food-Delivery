import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/zomato.avif";

const LoginPopup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role || "user"; // get role from navigation state

  const getLoginEndpoint = () => {
    switch (role) {
      case "restaurant":
        return "http://localhost:5000/rest/login";
      case "delivery":
        return "http://localhost:5000/delivery-boy/login";
      case "admin":
        return "http://localhost:5000/admin/login";
      default:
        return "http://localhost:5000/users/login";
    }
  };

  const getRedirectPath = () => {
    switch (role) {
      case "restaurant":
        return "/rest-welcome";
      case "delivery":
        return "/delivery-dashboard";
      case "admin":
        return "/admin";
      default:
        return "/user-dashboard";
    }
  };

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill in all fields.");
    setLoading(true);

    try {
      const endpoint = getLoginEndpoint();
      const payload = { email, password };

      const response = await axios.post(endpoint, payload);
      console.log("Login Success:", response.data);

      // Optionally save user data or token here
      navigate(getRedirectPath());
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Login Box */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white p-6 rounded-md shadow-lg w-96 relative">
          <button
            className="absolute top-2 right-3 text-xl font-bold"
            onClick={() => navigate("/")}
          >
            ×
          </button>

          <h2 className="text-2xl font-semibold mb-4 capitalize">
            {role} Log in
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-3 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <span
              className="text-red-500 font-semibold cursor-pointer"
              onClick={() => navigate("/signup", { state: { role } })}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
