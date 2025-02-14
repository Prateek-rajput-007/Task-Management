"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Context } from "../../components/Clients";
import "../../styles/register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(Context);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("All fields are required!");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user?._id) return redirect("/");

  return (
    <div className="register-page-container">
      <section className="register-page-card">
        <h2>Create an Account</h2>
        <form onSubmit={registerHandler}>
          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder="Full Name"
            required
            className="register-input"
          />
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            placeholder="Email Address"
            required
            className="register-input"
          />
          <input
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            placeholder="Password"
            required
            className="register-input"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p>Already have an account? <Link href="/login">Log In</Link></p>
        </form>
      </section>
    </div>
  );
};

export default Register;
