import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      const userData = await response.data;

      // Clear localStorage and auth context
      localStorage.removeItem("chat-user");
      setAuthUser(null);

      toast.success("Successfully logged out");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
