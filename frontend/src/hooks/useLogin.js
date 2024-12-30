import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputsErrors({ username, password });
    if (!success) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password },
        {
          withCredentials: true,
        }
      );

      const data = await response.data;

      if (data.error) {
        toast.error(error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data.user));
      setAuthUser(data.user);
      toast.success("User logged in successfully!");
      console.log(data.user);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default useLogin;

function handleInputsErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all the fields");
    return false;
  }
  return true;
}
