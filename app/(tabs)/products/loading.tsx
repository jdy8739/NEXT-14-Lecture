const Loading = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      {[...Array(6)].map((_, index) => {
        return (
          <div key={index} className="flex gap-5">
            <div className="w-32 h-32 bg-neutral-600 rounded-md animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="w-36 h-6 bg-neutral-600 rounded-md animate-pulse" />
              <div className="w-20 h-6 bg-neutral-600 rounded-md animate-pulse" />
              <div className="w-12 h-6 bg-neutral-600 rounded-md animate-pulse" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Loading;
