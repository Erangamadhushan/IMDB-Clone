import React, { useState } from "react";
import { authAPI } from "../services/api"; 
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type LoginState = {
  usernameOrEmail: string;
  password: string;
};

export default function LoginPage() {
    const [form, setForm] = useState<LoginState>({ usernameOrEmail: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuthContext();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
        setError(null);
    }

    function validate(): boolean {
        if (!form.usernameOrEmail.trim()) {
            setError("Username or email is required");
            return false;
        }
        if (!form.password) {
            setError("Password is required");
            return false;
        }
        return true;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            const response = await authAPI.login(form.usernameOrEmail, form.password);
            console.log("Login response:", response.data.message);
            alert("Login successful! You can now log in.");
            login(response.data.user, response.data.token);
            console.log(response.data);
            navigate("/");
            setForm({ usernameOrEmail: "", password: "" });
        } catch (error) {
            console.error(error);
            setError("Login failed — please check your credentials");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white relative" style={{ backgroundImage: "url('/dark-vip-cinema-studio.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center opacity-90"
                style={{ backgroundImage: "url('/hero-bg.jpg')" }}
                aria-hidden
            />

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-2rem)] py-12">
                    {/* Left: Login form */}
                    <div className="lg:col-span-4">
                        <div className="bg-black/60 border border-red-700/60 rounded-lg p-8 backdrop-blur-sm max-w-md">
                        <h2 className="text-4xl font-semibold text-yellow-400 mb-2">Login</h2>
                        <p className="text-sm text-gray-300 mb-6">Already have an account? Please login below.</p>

                        <form onSubmit={handleSubmit} noValidate>
                            <label className="block mb-4">
                            <span className="sr-only">Username or Email</span>
                            <input
                                name="usernameOrEmail"
                                value={form.usernameOrEmail}
                                onChange={handleChange}
                                className={`w-full rounded-md border px-4 py-3 bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 border-gray-700`}
                                placeholder="Username or Email"
                                aria-invalid={!!error}
                            />
                            </label>

                            <label className="block mb-4">
                            <span className="sr-only">Password</span>
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                className={`w-full rounded-md border px-4 py-3 bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 border-gray-700`}
                                placeholder="Password"
                                aria-invalid={!!error}
                            />
                            </label>

                            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                            <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-red-700 hover:bg-red-600 disabled:opacity-60 text-white font-medium rounded-md py-3 mb-3"
                            >
                            {submitting ? "Signing in..." : "Login"}
                            </button>

                            <div className="flex items-center justify-between text-sm text-gray-300">
                            <a href="/register" className="underline text-yellow-300">Don't have an account? Register</a>
                            <a href="/forgot" className="underline">Forgot password?</a>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right: Welcome back hero content */}
                <div className="lg:col-span-8">
                    <div className="px-6 lg:px-12 text-center lg:text-left">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-yellow-400 leading-tight mb-6">Welcome Back!</h1>
                    <p className="max-w-3xl text-lg md:text-xl text-gray-200 mx-auto lg:mx-0">
                        Access your personalized movie collection, reviews, and recommendations by logging into your account. Dive back into the
                        world of cinema with just a few clicks!
                    </p>

                    {/* Decorative vertical divider on large screens to match the register layout */}
                    <div className="hidden lg:block mt-10">
                        <div className="w-px h-48 bg-red-700/60" />
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="sr-only">Login page for IMDB-style clone site</div>
        </div>
    );
}