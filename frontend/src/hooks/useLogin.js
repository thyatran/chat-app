import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (usernameOrEmail, password) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { usernameOrEmail, password },
        {
          withCredentials: true,
        }
      );

      const userData = await response.data;
      localStorage.setItem("chat-user", JSON.stringify(userData));

      toast.success("User logged in successfully!");
      console.log(userData);
    } catch (error) {
      const errorMessage = error.response?.data || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default useLogin;
