import Dashboard from "./_dashboard";

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-base-100 flex flex-col justify-start items-center">
      <div className="w-full h-16 my-4 flex flex-row justify-center items-center">
        <h1 className="text-4xl text-slate-300 font-semibold tracking-wide align-baseline">
          Weather Dashboard
        </h1>
      </div>
      <Dashboard></Dashboard>
    </main>
  );
}
