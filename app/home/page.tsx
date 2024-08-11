export default function Home() {
  return (
    <main
      className="
        w-screen
        h-screen
        flex
        justify-center
        items-center
        bg-red-200
        md:bg-green-200
        lg:bg-cyan-200"
    >
      <div
        className="
          w-4/12
          h-60
          p-4
          bg-white
          rounded-xl
          flex
          flex-col
          justify-between"
      >
        {['jack', 'kane', 'yonet', ''].map((name, index) => {
          return (
            <div key={name} className="p-2 flex items-center ">
              <div className="size-8 bg-cyan-600 rounded-full" />
              <div className="ml-3">
                <span className="text-lg font-medium empty:w-20 empty:h-3 empty:bg-gray-400 empty:rounded-md">
                  {name}
                </span>
              </div>
              <div className="ml-3 bg-red-500 size-5 rounded-full flex justify-center items-center text-white relative">
                <span className="absolute size-5 rounded-full bg-red-500 animate-ping"></span>
                <span>{index}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
