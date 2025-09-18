import React, { useState, useEffect } from "react";
import { FaBook, FaEye, FaEyeSlash } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  genre: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    genre: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  // 🔹 Hide Sign Up button from Navbar when on Register page
  useEffect(() => {
    const signupBtn = document.querySelector("a[href='/register']");
    if (signupBtn) {
      (signupBtn as HTMLElement).style.display = "none";
    }

    return () => {
      if (signupBtn) {
        (signupBtn as HTMLElement).style.display = "inline-block";
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.genre) newErrors.genre = "Select a genre";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
      console.log("✅ User Registered:", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f3ee] p-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden bg-white">
        {/* Left Section */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-b from-emerald-600 to-teal-600 text-white w-1/3 p-10">
          <FaBook size={90} className="mb-6" />
          <h2 className="text-3xl font-bold text-center">Book Trading Club</h2>
          <p className="text-center mt-3 opacity-90">
            Swap, sell, share, or find an investor for your next masterpiece. 
            Turn your books into opportunities!
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-2/3 p-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Join our community and start your book trading journey today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="label font-semibold">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full rounded-lg shadow-sm border-gray-300"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full rounded-lg shadow-sm border-gray-300"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full rounded-lg shadow-sm border-gray-300 pr-10"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label font-semibold">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className="input input-bordered w-full rounded-lg shadow-sm border-gray-300"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Genre */}
            <div>
              <label className="label font-semibold">Favorite Genre</label>
              <select
                name="genre"
                className="select select-bordered w-full rounded-lg shadow-sm border-gray-300"
                value={formData.genre}
                onChange={handleChange}
              >
                <option value="">-- Select Genre --</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="biography">Biography</option>
              </select>
              {errors.genre && (
                <p className="text-red-500 text-sm">{errors.genre}</p>
              )}
            </div>

            {/* Submit */}
            <button className="btn w-full rounded-lg text-lg font-semibold tracking-wide bg-emerald-600 hover:bg-emerald-700 border-none text-white shadow-md">
              Register
            </button>
          </form>

          {/* Success Message */}
          {submitted && (
            <div className="mt-6 p-5 bg-green-500 text-white rounded-lg shadow-md">
              <h3 className="font-bold text-lg">🎉 Registration Successful</h3>
              <p>Name: {formData.name}</p>
              <p>Email: {formData.email}</p>
              <p>Favorite Genre: {formData.genre}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
