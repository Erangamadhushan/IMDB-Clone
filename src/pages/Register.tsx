import React, { useState } from "react";
import { authAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

type FormState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((errs) => ({ ...errs, [e.target.name]: undefined }));
  }

  function validate(): boolean {
    const newErrs: Partial<FormState> = {};

    if (!form.username.trim()) newErrs.username = "Username is required";

    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrs.email = "Valid email is required";

    if (form.password.length < 6) newErrs.password = "Password must be at least 6 characters";

    if (form.password !== form.confirmPassword) newErrs.confirmPassword = "Passwords do not match";

    setErrors(newErrs);

    return Object.keys(newErrs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      
      const response = await authAPI.register(form.username, form.email, form.password);
      console.log("Registration response:", response.data.message);
      navigate("/login");
      alert("Registration successful! You can now log in.");

      
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {

      console.error(err);
      alert("Registration failed — check console for details.");

    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white" style={{ backgroundImage: "url('/dark-vip-cinema-studio.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/theatre-room.jpg')" }}
        aria-hidden
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-2rem)] py-12">
          {/* Left: Form card (on large screens column-span 4) */}
          <div className="lg:col-span-4">
            <div className="bg-black/60 border border-red-700/60 rounded-lg p-8 backdrop-blur-sm max-w-md">
              <h2 className="text-4xl font-semibold text-yellow-400 mb-2">Register</h2>
              <p className="text-sm text-gray-300 mb-6">Create an account to save favorites, write reviews and get recommendations.</p>

              <form onSubmit={handleSubmit} noValidate>
                <label className="block mb-4">
                  <span className="sr-only">Username</span>
                  <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className={`w-full rounded-md border px-4 py-3 bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 ${
                      errors.username ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Username"
                    aria-invalid={!!errors.username}
                    aria-describedby={errors.username ? "username-error" : undefined}
                  />
                  {errors.username && (
                    <p id="username-error" className="mt-1 text-red-400 text-sm">
                      {errors.username}
                    </p>
                  )}
                </label>

                <label className="block mb-4">
                  <span className="sr-only">Email</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full rounded-md border px-4 py-3 bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-red-400 text-sm">
                      {errors.email}
                    </p>
                  )}
                </label>

                <label className="block mb-4">
                  <span className="sr-only">Password</span>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full rounded-md border px-4 py-3 bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 ${
                      errors.password ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  {errors.password && (
                    <p id="password-error" className="mt-1 text-red-400 text-sm">
                      {errors.password}
                    </p>
                  )}
                </label>

                <label className="block mb-6">
                  <span className="sr-only">Confirm password</span>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`w-full rounded-md border px-4 py-3 bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Confirm password"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                  />
                  {errors.confirmPassword && (
                    <p id="confirm-error" className="mt-1 text-red-400 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-700 hover:bg-red-600 disabled:opacity-60 text-white font-medium rounded-md py-3 mb-3"
                >
                  {submitting ? "Registering..." : "Register"}
                </button>

                <p className="text-sm text-red-400">
                  Already have an account? <a href="/login" className="underline text-yellow-300">Login</a>
                </p>
              </form>
            </div>
          </div>

          {/* Right: Hero text (on large screens column-span 8) */}
          <div className="lg:col-span-8">
            <div className="px-6 lg:px-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-yellow-400 leading-tight mb-6">Welcome to Cinema Vault</h1>
              <p className="max-w-3xl text-lg md:text-xl text-gray-200">
                Access your personalized movie collection, reviews, and recommendations by creating an account. Dive back into the world
                of cinema with just a few clicks — save favorites, rate films and discover curated lists.
              </p>

              {/* Decorative vertical divider to mimic the reference */}
              <div className="hidden lg:block mt-10">
                <div className="w-px h-48 bg-red-700/60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small accessibility-only hint */}
      <div className="sr-only">Register page for IMDB-style clone site</div>
    </div>
  );
}
