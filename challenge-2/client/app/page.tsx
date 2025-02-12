import { MdOutlineTaskAlt } from "react-icons/md";
import Todo from "./_todo";

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-base-200 flex flex-col justify-start items-center">
      <div className="w-full h-12 flex flex-row justify-center items-center bg-transparent my-8">
        <h1 className="text-center text-slate-400 font-semibold tracking-wide text-4xl mr-2 align-baseline">
          My Todo
        </h1>
        <MdOutlineTaskAlt size={36} className="text-accent"></MdOutlineTaskAlt>
      </div>
      <Todo></Todo>
    </main>
  );
}
