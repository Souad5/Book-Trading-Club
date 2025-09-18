import React, { useState } from "react";
import { FaBook } from "react-icons/fa"; // FontAwesome book icon

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
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-xl bg-base-100 rounded-lg overflow-hidden">
        {/* Left side icon / info */}
        <div className="hidden md:flex md:flex-col items-center justify-center bg-primary text-white w-1/3 p-8">
          <FaBook size={80} className="mb-4" />
          <h2 className="text-2xl font-bold text-center">Book Trading Club</h2>
          <p className="text-center mt-2">
            Join our community and start trading your favorite books!
          </p>
        </div>

        {/* Right side form */}
        <div className="w-full md:w-2/3 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-error text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-error text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <div className="flex gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className="input input-bordered w-full"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-error text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Favorite Genre */}
            <div>
              <label className="label">Favorite Genre</label>
              <select
                name="genre"
                className="select select-bordered w-full"
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
                <p className="text-error text-sm">{errors.genre}</p>
              )}
            </div>

            {/* Submit */}
            <button className="btn btn-primary w-full">Register</button>
          </form>

          {/* Preview after submission */}
          {submitted && (
            <div className="mt-4 p-4 bg-success text-white rounded">
              <h3 className="font-bold">🎉 Registration Successful</h3>
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
