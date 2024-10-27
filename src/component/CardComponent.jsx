import React from "react";

const CardComponent = ({ allQuotes }) => {
  return (
    <>
      <div className="relative">
        <img
          className="w-full h-80"
          src={allQuotes.mediaUrl}
          alt={allQuotes.mediaUrl}
        />
        <p className="absolute bottom-4 left-1/2 w-11/12 transform -translate-x-1/2 bg-black bg-opacity-35  p-2 rounded-lg  text-white  ">
          {allQuotes.text}
        </p>
      </div>
      <div>
        <p className="mt-1 font-semibold ">
          UserName: <span className="font-normal ">{allQuotes.username}</span>
        </p>
        <p className="mt-1 font-semibold">
          CreatedAt: <span className="font-normal">{allQuotes.createdAt}</span>
        </p>
      </div>
    </>
  );
};

export default CardComponent;
