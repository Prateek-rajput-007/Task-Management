"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Context } from "../../components/Clients";
import { toast } from "react-hot-toast";
import axios from "axios";
import "../../styles/login.scss"; // Import SCSS

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(Context);
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/auth/login", { email, password });

      if (!data.success) {
        toast.error(data.message);
      } else {
        setUser(data.user);
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (user?._id) {
    router.push("/");
    return null;
  }

  return (
    <div className="login-page-container">
      <section className="login-page-box">
        <h2>Login</h2>
        <form onSubmit={loginHandler}>
          <div className="login-input-group">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="login-input-group">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="login-separator">OR</p>
          <Link href="/register" className="login-register-link">
            New User? Register
          </Link>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
