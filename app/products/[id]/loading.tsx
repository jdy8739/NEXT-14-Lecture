import { PhotoIcon } from '@heroicons/react/24/solid';

const Loading = () => {
  return (
    <div className="h-full">
      <div className="w-full h-3/6 p-4">
        <div className="h-full border-neutral-700 border-2 border-dashed rounded-md flex justify-center items-center text-neutral-700">
          <PhotoIcon className="size-16" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex gap-2">
          <div>
            <div className="size-10 bg-neutral-700 animate-pulse rounded-full" />
          </div>
          <div className="flex flex-col justify-around">
            <div className="w-32 h-4 bg-neutral-700 rounded-sm"></div>
            <div className="w-16 h-4 bg-neutral-700 rounded-sm"></div>
          </div>
        </div>
        <div className="mt-5">
          <div className="w-56 h-4 bg-neutral-700 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
