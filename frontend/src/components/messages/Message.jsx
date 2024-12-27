import React from "react";

const Message = () => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="Tailwind CSS chat bubble component"
          />
        </div>
      </div>

      <div>message</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        time
      </div>
    </div>
  );
};

export default Message;
