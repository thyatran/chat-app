import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (usernameOrEmail, password) => {
    const success = handleInputsErrors({ usernameOrEmail, password });
    if (!success) return;

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
      if (userData === "Login successful.") {
        localStorage.setItem("chat-user", JSON.stringify(userData));
        setAuthUser(userData);
        toast.success("User logged in successfully!");
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
  return { login, loading };
};

export default useLogin;

function handleInputsErrors({ usernameOrEmail, password }) {
  if (!usernameOrEmail || !password) {
    toast.error("Please fill in all the fields");
    return false;
  }
  return true;
}
