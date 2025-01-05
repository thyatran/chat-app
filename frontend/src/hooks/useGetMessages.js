import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import getCookie from "./getCookie";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const jwtToken = getCookie("jwt");

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/messages/${selectedConversation.id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            withCredentials: true,
          }
        );
        const data = await response.data;
        console.log(data);

        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data);
      } catch (error) {
        toast.error(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?.id) getMessages();
  }, [selectedConversation?.id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
