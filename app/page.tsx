export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center ">
      <div className="p-4 w-full max-w-screen-sm h-36 rounded-2xl bg-white drop-shadow-xl flex flex-col justify-between">
        <div>
          <input
            placeholder="Search here"
            className="
            w-full
            h-12
            px-5
            bg-slate-100
            rounded-full
            outline-none
            ring
            ring-transparent
            ring-offset-2
            focus:ring-orange-400
            transition-shadow
            placeholder:drop-shadow"
          />
        </div>
        <div>
          <button
            className="
            w-full
            h-10
            rounded-full
            bg-slate-700
            text-white
            uppercase
            transition-transform
            active:scale-90
            focus:bg-opacity-30
            focus:scale-90
            font-medium"
          >
            search
          </button>
        </div>
      </div>
    </main>
  );
}
