import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { FaFacebookF, FaApple } from "react-icons/fa";
import picture from "../assests/photo/login-image.png";
import { Link } from "react-router";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Login</h1>
            <p className="text-gray-500 text-sm">
              Login to access your travelwise account
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-gray-600 text-sm">Email</label>
              <input
                type="email"
                placeholder="john.doe@gmail.com"
                className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <label className="text-gray-600 text-sm">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute mt-3 right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <label>
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-red-500">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-500 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            Don’t have an account?{" "}
            <Link to={"/register"}>
              <a href="#" className="text-red-500 font-semibold">
                Sign up
              </a>
            </Link>
          </p>

          <div className="mt-6 text-center text-gray-400 text-sm relative">
            <span className="bg-white px-2 relative z-10">Or login with</span>
            <hr className="absolute top-1/2 left-0 w-full border-gray-300 -z-0" />
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <button className="border border-gray-300 rounded p-2 hover:bg-gray-100 transition">
              <FaFacebookF />
            </button>
            <button className="border border-gray-300 rounded p-2 hover:bg-gray-100 transition">
              <FcGoogle />
            </button>
            <button className="border border-gray-300 rounded p-2 hover:bg-gray-100 transition">
              <FaApple />
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-100">
          <img
            src={picture}
            alt="Login Illustration"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
