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
        {['jack', 'kane', 'yonet', 'linn'].map((name, index) => {
          return (
            <div key={name} className="p-2 flex items-center *:animate-pulse">
              <div className="size-8 bg-cyan-600 rounded-full" />
              <div className="ml-3">
                <span className="inline-block w-28 h-3 rounded-md bg-gray-400"></span>
              </div>
              <div className="ml-3">
                <span className="inline-block w-10 h-3 rounded-md bg-gray-400"></span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
