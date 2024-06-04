import React from "react";

const FullScreenLoading = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="animate-spin w-40 h-40 flex items-center justify-center border-[10px] border-current border-b-transparent border-t-transparent text-gray-400 rounded-full"
        role="status"
        aria-label="loading"
      >
        <div
          className="inline-block w-20 h-20 border-[10px] border-current border-r-transparent border-l-transparent text-gray-400 rounded-full"
          role="status"
          aria-label="loading"
        />
      </div>
    </div>
  );
};

export default FullScreenLoading;
