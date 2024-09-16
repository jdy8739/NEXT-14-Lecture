const Loading = () => {
  return (
    <div>
      <div className="h-[300vh] relative">
        {[...Array(20)].map((_, index) => {
          return (
            <div
              key={index}
              className="p-4 h-28 flex flex-col gap-2 *:rounded-md *:animate-pulse"
            >
              <div className="w-16 h-4 bg-neutral-700" />
              <div className="w-32 h-4 bg-neutral-700" />
              <div className="w-full h-4 flex gap-2 *:rounded-md *:animate-pulse">
                <span className="size-4 bg-neutral-700 inline-block" />
                <span className="size-4 bg-neutral-700 inline-block" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Loading;
