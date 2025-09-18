import React from "react";
import { FcGoogle } from "react-icons/fc";
import picture from '../assests/photo/login-image.png'

const Login = () => {
    return (
          <div className="min-h-screen flex items-center justify-center bg-black text-white">
      {/* Left Image Section */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center relative">
        <img
          src={picture}
          alt="Student Illustration"
          className="w-3/4 object-contain"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 px-8 md:px-16">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          Welcome to Neth BookPoint!
        </h1>
        <p className="text-gray-300 mb-8">
          Discover a seamless way to sell your books and unlock exclusive
          benefits. Enjoy a hassle-free experience, save valuable time, and
          take advantage of our amazing offers.
        </p>

        <h2 className="text-xl font-semibold text-yellow-600 mb-4">
          Login to Your Account!
        </h2>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 rounded bg-yellow-200 text-gray-800 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 rounded bg-yellow-200 text-gray-800 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div className="text-right text-sm text-gray-400">
            Forgot Password?
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-black py-3 rounded font-bold hover:bg-yellow-500 transition"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-4 text-center text-gray-400">
          Don't you have an account?{" "}
          <a href="#" className="text-yellow-600 font-semibold">
            Create an account
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 cursor-pointer border border-gray-500 rounded p-2 hover:bg-gray-800 transition">
          <FcGoogle size={24} />
          <span>Login with Google</span>
        </div>
      </div>
    </div>
    );
};

export default Login;