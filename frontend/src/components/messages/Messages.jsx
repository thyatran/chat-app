import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <div className="px-4 flex-1 overflow-auto">
      <div>
        <Message />
      </div>
      <p className="text-center">Send a message to start this conversation</p>
    </div>
  );
};

export default Messages;
