export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="inline-block p-4 w-full max-w-screen-sm h-44 rounded-2xl bg-white drop-shadow-xl">
        <div className="flex justify-between">
          <div>
            <p>In transit</p>
            <p className="font-bold text-3xl">Coolblue</p>
          </div>
          <div className="w-10 h-10 rounded-full self-center bg-orange-500" />
        </div>

        <div className="mt-2">
          <span className="px-3 py-1 mr-2 rounded-xl text-sm bg-green-300 text-white transition uppercase hover:bg-green-600 hover:scale-125">
            Today
          </span>
          <span>9:30-10:30u</span>
        </div>

        <div className="relative h-2 mt-4">
          <div className="absolute w-full h-full rounded-xl bg-slate-300"></div>
          <div className="absolute w-2/3 h-full rounded-xl bg-green-200"></div>
        </div>

        <div className="mt-2 text-sm flex justify-between">
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className="opacity-30">Delivered</span>
        </div>
      </div>
    </main>
  );
}
