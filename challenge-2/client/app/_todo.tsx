"use client";

import { TaskInputInterface, TaskInterface } from "@/interfaces/_task";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

export default function Todo() {
  const [taskInput, setTaskInput] = useState<TaskInputInterface>({
    title: "",
    content: "",
  });

  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [taskIsLoading, setTaskIsLoading] = useState<boolean>(false);

  console.log("Tasks: ", tasks);

  const handleAdd = () => {
    const modal = document.getElementById("task_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    } else {
      console.log("No dialog exist!");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setTaskInput({
      ...taskInput,
      [field]: e.target.value,
    });
  };

  const postTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTaskIsLoading(true);
    fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskInput),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks([...tasks, data]);
        setTaskIsLoading(false);
      })
      .catch((error) => console.log(error));
    const modal = document.getElementById("task_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };

  useEffect(() => {
    fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/tasks`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="w-full h-full px-16">
      <div className="w-full h-10 flex flex-row justify-center items-center">
        <button
          className="w-64 h-full border-[1px] border-slate-400 rounded-lg"
          onClick={handleAdd}
        >
          Add
        </button>
        <dialog id="task_modal" className="modal">
          <div className="modal-box">
            <form className="w-full h-full flex flex-col justify-start items-end">
              <input
                type="text"
                placeholder="Enter title"
                className="w-full h-8 border-b-[1px] border-slate-400"
                value={taskInput.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, "title")
                }
              ></input>
              <input
                type="text"
                placeholder="Enter content"
                className="w-full border-[1px] border-slate-400"
                value={taskInput.content}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, "content")
                }
              ></input>
              <div className="w-full h-10 flex flex-row justify-end items-center px-2">
                <button
                  onClick={postTask}
                  className="w-36 h-full rounded-md bg-base-300 text-white"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <div
        className={`w-full flex flex-col ${
          tasks.length == 0 ? "justify-center" : "justify-start"
        } items-center`}
      >
        {tasks.length == 0 ? (
          <div className="w-72 h-96 rounded-lg bg-base-200 flex flex-col justify-start items-center">
            <div className="w-full h-2/3 relative">
              <Image src={"create.svg"} alt="Create" fill></Image>
            </div>
            <div className=" w-full h-full flex flex-row justify-center items-center">
              <button
                className="w-64 h-8 border-[1px] border-slate-400 rounded-lg"
                onClick={handleAdd}
              >
                Create a Task
              </button>
            </div>
          </div>
        ) : taskIsLoading ? (
          <div>Creating...</div>
        ) : (
          tasks.map((task) => {
            return (
              <div
                className="w-full h-40 flex flex-col rounded-md my-2 bg-base-100"
                key={task.id}
              >
                <div className="w-full h-10 flex flex-row px-2 justify-start items-center">
                  <h2 className="text-white text-xl text-semibold">
                    {task.title}
                  </h2>
                </div>
                <div className="w-full h-full">
                  <p className="w-full h-full text-base text-white">
                    {task.content}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
