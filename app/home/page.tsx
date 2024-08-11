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
          h-28
          p-4
          bg-white
          rounded-xl
          flex
          flex-col
          justify-between
          group"
      >
        <input className="outline-none ring ring-transparent ring-gray-200" />
        <div className="group-focus-within:block hidden">
          Make sure it is a valid email.
        </div>
        <button>submit</button>
      </div>
    </main>
  );
}
