import { useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../components/Clients";

const useLogout = () => {
  const { setUser } = useContext(Context);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/auth/logout");
      if (!data.success) return toast.error(data.message);
      setUser({});
      toast.success("Logged out successfully");
      window.location.href = "/login"; // Navigate to login page after successful logout
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed!");
    }
  };

  return logout;
};

export default useLogout;
