"use client";

import Link from "next/link";
import { useState, createContext, useContext, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import useLogout from "../hooks/useLogout";

// Create Context API
export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/auth/me");
        if (data.success) setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data?.message || error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster position="top-center" />
    </Context.Provider>
  );
};

// Logout Button Component
export const LogoutBtn = () => {
  const { user } = useContext(Context);
  const logout = useLogout();

  return user._id ? (
    <button className="btn logout" onClick={logout}>
      Logout
    </button>
  ) : (
    <Link href="/login" className="btn login">Login</Link>
  );
};

// Todo Actions Component
export const TodoButton = ({ id }) => {
  const router = useRouter();

  const apiRequest = async (method, data = {}) => {
    try {
      const response = await axios({
        method,
        url: `/api/task/${id}`,
        data,
      });

      if (!response.data.success) return toast.error(response.data.message);
      toast.success(response.data.message);
      router.refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="todo-actions">
      <button className="btn delete" onClick={() => apiRequest("DELETE")}>
        Delete
      </button>
    </div>
  );
};
