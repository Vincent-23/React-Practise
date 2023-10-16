import React, { useState, useEffect} from "react";
import { BsPlus } from "react-icons/bs";
import { BiEdit, BiTask } from "react-icons/bi";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import { format } from "date-fns";

export default function Tasks() {
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );

  const [showPopUp, setShowPopUp] = useState(false);
  const [sortOrder, setSortOrder] = useState(false);

  const defaultValue = {
    checkStatus: false,
    date: new Date(),
    task: "",
    description: "",
    status: "ON-GOING",
    developedBy: "Vincent",
    updatedBy: "Vincent",
    assignee: "MYSELF",
  };

  const [task, setTask] = useState(defaultValue);

  const addTask = async (e) => {
    e?.preventDefault();
    if (!task.task) return alert("Task name is required");
    if (task.id) {
      setTasks((tasks) =>
        tasks.map((t) =>
          t.id === task.id
            ? {
                ...task,
              }
            : t
        )
      );
    } else
      setTasks((tasks) => [
        ...tasks,
        {
          id: tasks[tasks.length - 1] ? tasks[tasks.length - 1]?.id + 1 : 1,
          checkStatus: false,
          date: new Date(),
          task: task.task,
          description: task.description,
          status: "ON-GOING",
          developedBy: task.developedBy,
          updatedBy: task.updatedBy,
          assignee: task.assignee,
        },
      ]);
    setTask(defaultValue);
    setShowPopUp(false);
  };

  const handleOnChange = (e) => {
    const { value, name } = e?.target;
    setTask({
      ...task,
      [name]: value,
    });
  }

  useEffect(() => {
    if (tasks) localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSortTaskValue = async () => {
    if(!sortOrder){
      let taskAscOrder = await [...tasks].sort((a, b) => a.id - b.id);
      await setTasks(taskAscOrder);
    }else{
      let taskAscOrder = await [...tasks].sort((a, b) => b.id - a.id);
      await setTasks(taskAscOrder);
    }
  }

  const addTaskModelPopUp = () => { 
    return (
      <div className="fixed inset-0 bg-black z-50 bg-opacity-75 flex justify-center items-center text-white">
        <form
            onSubmit={addTask}
            className="border-2 border-zinc-800 flex flex-col bg-zinc-800 rounded-md overflow-hidden w-[50vw] h-[80vh]"
          >
            <div className="flex items-center justify-between px-4 py-4 bg-zinc-900">
              <div className="flex items-center">
                <h1 className="font-bold">Add new Task</h1>
              </div>
              <button>
                <AiFillCloseCircle
                  onClick={() => {
                    setShowPopUp(false);
                  }}
                  className="text-2xl"
                />
              </button>
            </div>
            <div className="flex flex-col flex-1 w-80 p-3 text-sm px-5">
              <p className="self-start">Enter Task Name : </p>
              <input
                onChange={(e) => handleOnChange(e)}
                value={task.task}
                className="bg-zinc-900 rounded-md px-3 py-2 mt-2 text-black" 
                placeholder="Task Name."
                type="text"
                name="task"
                id=""
                autoFocus
              />
              <p className="mt-4 self-start">Enter Description : </p>
              <textarea
                onChange={(e) => handleOnChange(e)}
                value={task.description}
                rows={5}
                className="bg-zinc-900 rounded-md px-3 py-2 mt-2 text-black"
                placeholder="Description."
                type="text"
                name="description"
                id=""
              />
              <p className="mt-4 self-start">Developed by : </p>
              <input
                onChange={(e) => handleOnChange(e)}
                value={task.developedBy}
                className="bg-zinc-900 rounded-md px-3 py-2 mt-2 text-black"
                placeholder="Task Name."
                type="text"
                name="developedBy"
                id=""
              />
              <p className="mt-4 self-start">Assignee : </p>
              <input
                onChange={(e) => handleOnChange(e)}
                value={task.assignee}
                className="bg-zinc-900 rounded-md px-3 py-2 mt-2 text-black"
                placeholder="Task Name."
                type="text"
                name="assignee"
                id=""
              />
              <div className="flex justify-end items-center">
                <button className="bg-white font-bold mt-3 rounded-full py-2 text-black px-3 text-xs">
                  Add
                </button>
              </div>
            </div>
          </form>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      { showPopUp && addTaskModelPopUp()}
    <div className="mt-5 flex items-center w-full justify-between">
        <div>
          <div className="flex items-center font-bold text-2xl text-white">
            <h1>Task Management</h1>
          </div>
        </div>
        <button
          onClick={() => {
            setSortOrder(!sortOrder);
            handleSortTaskValue();
          }}
          className="bg-white text-black hover:bg-zinc-300 flex items-end px-4 w-32 py-1 rounded-full mt-5 font-bold text-md"
        >
          <p>{`Sort :${' '} ${sortOrder ? 'Asc' : 'Desc'}`}</p>
        </button>
        <button
          onClick={() => {
            setShowPopUp(!showPopUp);
          }}
          className="bg-white text-black hover:bg-zinc-300 flex items-center px-2 py-1 rounded-full mt-5 font-bold text-xs"
        >
          <BsPlus className="text-2xl" />
          <p>Add Task</p>
        </button>
      </div>
      <div className="bg-white grid-cols-none rounded-md overflow-hidden mt-5">
        <table cellPadding={10} className="w-full ">
          <thead class="bg-white">
            <tr>
              {/* <th></th> */}
              <th>No</th>
              <th>Date</th>
              <th>Task name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Developed By</th>
              <th>Updated By</th>
              <th>Assignee</th>
              <th>Action</th>
            </tr>
          </thead>
          {tasks
            // .map((e, i) => ({ ...e, id: i + 1 }))
            // .sort((a, b) => b.id - a.id)
            ?.map((e, i) => (
              <tr
                onClick={() => {
                  setTasks((tasks) =>
                    tasks.map((each) =>
                      e.id === each.id
                        ? { ...each, checkStatus: !each.checkStatus }
                        : each
                    )
                  );
                }}
                className="hover:bg-zinc-800 border-b-2 border-black cursor-pointer"
              >
                <td>{e.id}</td>
                <td>{format(new Date(e.date), "dd, MMM : hh:mm a")}</td>
                <td>{e.task || "-"}</td>
                <td>
                  <p title={e.description} className="max-w-[120px] truncate">
                    {e.description || "-"}
                  </p>
                </td>
                <td>{e.status === "ON-GOING" ? "On-going" : "Done"}</td>
                <td>{e.developedBy}</td>
                <td>{e.updatedBy}</td>
                <td>{e.assignee}</td>
                <td>
                  <div className="text-xl flex items-center">
                    <button
                      className="mr-2"
                      onClick={() => {
                        setTask(e);
                        setShowPopUp(true);
                      }}
                    >
                      <BiEdit />
                    </button>
                    <button
                      className="bg-red-700 rounded-full p-1"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete ? "))
                          setTasks(tasks.filter((each) => each.id !== e.id));
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}
