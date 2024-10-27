import React from "react";

const Pagination = ({
  handleNextPage,
  handlePreviousePage,
  offSet,
  hasMore,
}) => {
  return (
    <div className="flex gap-4 mb-10 justify-center items-center">
      <button
        onClick={handlePreviousePage}
        disabled={offSet === 0}
        className={`${
          offSet === 0
            ? "opacity-40 pointer-events-none cursor-not-allowed border flex items-center hover:border-slate-500 border-slate-300 p-1 rounded-lg"
            : "border flex items-center hover:border-slate-500 border-slate-300 p-1 rounded-lg"
        }   `}
      >
        Prev
        <img
          width="20"
          height="20"
          src="https://img.icons8.com/ios-glyphs/30/previous.png"
          alt="previous"
        />
      </button>
      <button
        onClick={handleNextPage}
        disabled={!hasMore}
        className={`${
          !hasMore
            ? "opacity-40 pointer-events-none cursor-not-allowed border flex items-center hover:border-slate-500 border-slate-300 p-1 rounded-lg"
            : "border flex items-center hover:border-slate-500 border-slate-300 p-1 rounded-lg"
        }   `}
      >
        Next
        <img
          width="20"
          height="20"
          src="https://img.icons8.com/ios-glyphs/30/next.png"
          alt="next"
        />
      </button>
    </div>
  );
};

export default Pagination;
