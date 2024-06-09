const FullScreenLoading = () => {
  return (
    <div className="absolute inset-0 flex items-center z-50 bg-opacity-50 bg-gray-600 justify-center w-full h-screen">
      <div
        className="animate-spin w-40 h-40 flex items-center justify-center
       border-[10px] border-current border-b-transparent border-t-transparent text-sub-text rounded-full"
      >
        <div
          className="inline-block w-20 h-20 border-[10px] border-current
         border-r-transparent border-l-transparent text-sub-text rounded-full"
        />
      </div>
    </div>
  );
};

export default FullScreenLoading;
