import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

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

      console.log(response.data);
      toast.success("User registered successfully!");
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
