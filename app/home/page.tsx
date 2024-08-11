export default function Home() {
  return (
    <main
      className="
        w-screen
        h-screen
        flex
        justify-center
        items-center
        bg-rainbow"
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
          group
          ml-a-lot
          text-lavendar"
      >
        <input className="my-input" />
        <div className="group-focus-within:block hidden">
          Make sure it is a valid email.
        </div>
        <button className="my-font">submit</button>
      </div>
    </main>
  );
}
