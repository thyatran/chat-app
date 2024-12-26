import React from "react";

const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer bg-sky-500">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src="" alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div>
            <p className="font-bold text-gray-200">name</p>
            <span className="text-xl">emoji</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
