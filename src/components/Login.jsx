import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import CubeLoader from "./CubeLoader";

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" });

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
    const res = await axios.post(`${import.meta.env.VITE_URL}login`, form);
    if (res.status === 200) {
      localStorage.setItem("UserId", res.data.userId);
      window.location.href = "/";
    }
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }finally{
    setLoading(false)
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
           {loading? <CubeLoader /> :
      <div className="bg-[#111] p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-[#222] focus:outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-[#222] focus:outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline cursor-pointer">
            Sign up
          </Link>
        </p>
      </div>}
    </div>
  );
}
