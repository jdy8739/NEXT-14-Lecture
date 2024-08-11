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
            <div
              key={name}
              className="p-2 flex items-center odd:bg-slate-200 even:bg-blue-100 rounded-lg border-b-2 border-gray-400 last:border-b-0"
            >
              <div className="size-8 bg-cyan-600 rounded-full" />
              <div className="ml-3">
                <span>{name}</span>
              </div>
              <div className="ml-3 bg-red-500 size-5 rounded-full flex justify-center items-center text-white">
                <span>{index}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
