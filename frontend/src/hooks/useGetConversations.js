import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import getCookie from "./getCookie";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const jwtToken = getCookie("jwt");

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/users/", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        });
        const data = response.data;
        //console.log(data);

        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
