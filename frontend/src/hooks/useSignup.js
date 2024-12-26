import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (inputs) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        inputs,
        {
          withCredentials: true, // Sends cookies
        }
      );

      const userData = await response.data;

      if (userData === "User registered successfully.") {
        localStorage.setItem("chat-user", JSON.stringify(userData));
        setAuthUser(userData);
        toast.success("User registered successfully!");
      } else {
        toast.error(userData);
      }

      console.log(userData);
    } catch (error) {
      const errorMessage = error.response?.data || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};

export default useSignup;
