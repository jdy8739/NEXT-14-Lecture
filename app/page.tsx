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
        p-4
        md:p-2
        w-full
        h-36
        md:h-16
        max-w-screen-sm
        rounded-2xl
        bg-white
        drop-shadow-xl
        flex
        flex-col
        md:flex-row  
        justify-between"
      >
        <input
          placeholder="Search here"
          type="email"
          className="
            w-full
            md:w-10/12
            h-12
            px-5
      
            rounded-full
            outline-none
            ring
            ring-transparent
            ring-offset-2
            valid:ring-green-400
            invalid:ring-red-400
            transition-shadow
            placeholder:drop-shadow
            peer"
        />
        <div className="hidden text-red-400 peer-invalid:block">
          Email is required
        </div>
        <button
          className="
            w-full
            md:w-2/12 md:ml-2
            h-10
            md:h-12
            rounded-full
            bg-slate-700
            text-white
            uppercase
            transition-transform
            peer-valid:bg-gradient-to-tl
            from-cyan-200
            via-green-200
            to-purple-300
            active:scale-90
            focus:bg-opacity-30
            focus:scale-90
            peer-invalid:bg-slate-200
            peer-invalid:cursor-not-allowed
            font-medium"
        >
          log in
        </button>
      </div>
    </main>
  );
}
