export default function Home() {
  return (
    <>
      <nav className=" bg-red-700 flex flex-row items-center justify-center w-full h-24">
        <div className=" relative top-4  ">
          <h1 className="text-lg text-white font-bold text-center">Pomodoro</h1>
        </div>
      </nav>
      <main
        className={`flex min-h-screen flex-col items-center justify-center  `}
      ></main>
    </>
  );
}
