import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import getCookie from "./getCookie";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const jwtToken = getCookie("jwt");

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/messages/send/${selectedConversation.id}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      console.log(data);
      console.log(selectedConversation.id);

      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
