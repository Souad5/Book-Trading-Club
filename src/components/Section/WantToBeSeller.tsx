import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";

export function WantToBeSellerSection() {
  return (
    <section
      className="rounded-3xl p-10 shadow-2xl my-16 relative overflow-hidden"
      style={{ backgroundColor: "#fff" }}
    >
      {/* Decorative shapes */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white opacity-20 rounded-full animate-pulse"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* Left text section */}
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold mb-4 flex items-center gap-3 text-gray-800">
            <FiUserPlus size={32} className="text-yellow-500" /> Become a Seller
          </h2>
          <p className="mb-6 text-lg text-gray-700">
            Join our thriving community of book lovers. Sell your books, manage your listings, 
            track orders, and grow your business — all in one place.
          </p>
          <Link
            to="/seller/signup"
            className="inline-block px-8 py-3 bg-yellow-500 text-white font-bold rounded-full shadow-lg hover:bg-yellow-600 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Right image section */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative">
            <img
              src="https://i.postimg.cc/XqnrddRk/image.png"
              alt="Become a seller"
              className="rounded-2xl shadow-xl max-w-sm lg:max-w-md transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-200 opacity-30 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WantToBeSellerSection;
