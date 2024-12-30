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
          withCredentials: true,
        }
      );

      const data = await response.data;
      if (data.error) {
        toast.error(error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data.user);
      toast.success("User registered successfully!");
      console.log(data.user);
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
