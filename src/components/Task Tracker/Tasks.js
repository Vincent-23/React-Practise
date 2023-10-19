import React, { useState, useEffect, useMemo } from "react";
import { BsPlus } from "react-icons/bs";
import { BiEdit, BiTask } from "react-icons/bi";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import { format } from "date-fns";
import Table from './Table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

export default function Tasks() {
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [showPopUp, setShowPopUp] = useState(false);
  const [sortOrder, setSortOrder] = useState(false);
  const [sorting, setSorting] = React.useState([]);
  const [data, setData] = useState([]);



  const defaultValue = {
    checkStatus: false,
    // date: new Date(),
    task: "",
    description: "",
    status: "ON-GOING",
    developedBy: "Vincent",
    updatedBy: "Vincent",
    assignee: "MYSELF",
  };

  const columns = [
    // {
    //   accessorKey: "date",
    //   header: "Date",
    //   size: 225,
    //   cell: (props) => { console.log('props!', props); return (<p>{format(new Date(props.getValue().date), "dd-MMM-yyyy  hh:mm a")}</p>) },
    //   enableColumnFilter: true,
    //   filterFn: "includesString",
    // },
    {
      accessorKey: "task",
      header: "Task",
      cell: (props) => <p>{props.getValue() || '-'}</p>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (props) => <p>{props.getValue() || '-'}</p>
    },
    {

      accessorKey: 'status',

      header: "STATUS",

      cell: (props) => <p>{props.getValue() || '-'}</p>

    },

    {

      accessorKey: 'developedBy',

      header: "Developed By",

      cell: (props) => <p>{props.getValue() || '-'}</p>

    },

    {

      accessorKey: 'updatedBy',

      header: "Updated By",
      cell: (props) => <p>{props.getValue() || '-'}</p>

      // cell: (props) => <p>{format(new Date(props.getValue()), "dd-MMM-yyyy  hh:mm a")}</p>

    },

    {

      accessorKey: 'assignee',

      header: "Assignee",

      cell: (props) => <p>{props.getValue() || '-'}</p>

    },
  ];

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
          // date: new Date(),
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
    if (!sortOrder) {
      let taskAscOrder = await [...tasks].sort((a, b) => a.id - b.id);
      await setTasks(taskAscOrder);
    } else {
      let taskAscOrder = await [...tasks].sort((a, b) => b.id - a.id);
      await setTasks(taskAscOrder);
    }
  }

  const addTaskModelPopUp = () => {
    return (
      <div className="fixed inset-0 bg-black z-50 bg-opacity-75 flex justify-center items-center text-white">
        <form
          onSubmit={addTask}
          className="border-2 border-black flex flex-col bg-white rounded-md overflow-hidden w-[50vw] h-[80vh]"
        >
          <div className="flex items-center justify-between px-4 py-4 bg-white">
            <div className="flex items-center text-black">
              <h1 className="font-bold">Add new Task</h1>
            </div>
            <button>
              <AiFillCloseCircle
                onClick={() => {
                  setShowPopUp(false);
                }}
                className="text-2xl text-black"
              />
            </button>
          </div>
          <div className="flex flex-col text-black flex-1 w-80 p-3 text-sm px-5">
            <p className="self-start">Enter Task Name : </p>
            <input
              onChange={(e) => handleOnChange(e)}
              value={task.task}
              className=" rounded-md px-3 py-2 mt-2 text-black border-black"
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
              className="rounded-md px-3 py-2 mt-2 text-black"
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
              <button className="bg-black font-bold mt-3 rounded-full py-2 text-white px-3 text-xs rounder-black">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  const renderTableKeyValue = () => {
    let FinalData =
      tasks
        // .map((e, i) => ({ ...e, id: i + 1 }))
        // .sort((a, b) => b.id - a.id)
        ?.map((e, i) => (
          {
            id: e.id,
            description: e.description || "-",
            task: e.task,
            status: e.status === "ON-GOING" ? "On-going" : "Done",
            developedBy: e.developedBy,
            updatedBy: e.updatedBy,
            assignee: e.assignee,
            // date: format(new Date(e.date), "dd, MMM : hh:mm a")
          }
        ))
    return FinalData;
  }

  const datas = useMemo(() => renderTableKeyValue(), [])
  const table = useReactTable({
    data: datas,
    columns,
    // state: {
    //   columnFilters,
    // },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });

  console.log('custom!', renderTableKeyValue())

  return (
    <div className="container mx-auto px-4">
      {showPopUp && addTaskModelPopUp()}
      <div className="mt-5 flex items-center w-full justify-between">
        <div>
          <div className="flex items-center font-bold text-2xl text-white">
            <h1>Task Management</h1>
          </div>
        </div>
        {/* <button
          onClick={() => {
            setSortOrder(!sortOrder);
            handleSortTaskValue();
          }}
          className="bg-white text-black hover:bg-zinc-300 flex items-end px-4 w-32 py-1 rounded-full mt-5 font-bold text-md"
        >
          <p>{`Sort :${' '} ${sortOrder ? 'Asc' : 'Desc'}`}</p>
        </button> */}
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
        <Table table={table} />
      </div>
      <div>
      <p mb={2}>
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </p>
      <div>
      <button
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
      </div>
      </div>
    </div>
  );
}
