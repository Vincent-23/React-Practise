import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { BiEdit, BiTask } from "react-icons/bi";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { format } from "date-fns";
import Table from './Table';
import FavTask from './FavTask';

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
  const [ searchText, setSearchText ] = useState("");
  const navigate = useNavigate();

  const defaultValue = {
    checkStatus: false,
    date: new Date().toLocaleString(),
    task: "",
    description: "",
    status: "ON-GOING",
    developedBy: "Vincent",
    updatedBy: "Vincent",
    assignee: "MYSELF",
    favTask: false
  };
  const [task, setTask] = useState(defaultValue);

  console.log('test!', task)
  const [showPopUp, setShowPopUp] = useState(false);
  const [favs, setFavs] = useState(localStorage.getItem("favTasks")
    ? JSON.parse(localStorage.getItem("favTasks"))
    : []);
  const [data, setData] = useState([]);
  const [fav, setFav] = useState({});

  useEffect(() => {
    handleTaskItems();
    console.log('check!', tasks)
  }, [tasks]);

  useEffect(() => {
    handleFavItems();
    handleTaskItems();
  }, [favs]);

  const handleTaskItems = async () => {
    // if (task && tasks.length) {
    const removeTasksDup = await tasks.filter((taskItem, index) => tasks.findIndex((item) => item.id === taskItem.id) === index);
    await localStorage.setItem("tasks", JSON.stringify(removeTasksDup));
    // const taskDatas = await JSON.parse(localStorage.getItem("tasks"));
    // await setTasks(taskDatas);

    // }

  }

  const handleFavItems = async () => {
    // if (fav && favs.length) {
    const removeFavDup = await favs.filter((taskItem, index) => favs.findIndex((item) => item.id === taskItem.id) === index);
    await localStorage.setItem("favTasks", JSON.stringify(removeFavDup));
    const taskDatas = await JSON.parse(localStorage.getItem("tasks"));
    await setTasks(taskDatas);
    // } 
  }





  const columns = [
    {
      accessorKey: "id",
      header: "S.No",
      cell: (props) => <p>{props.getValue() || '-'}</p>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (props) => <p className="truncate w-[150px]">{props.getValue() || '-'}</p>,
    },
    {
      accessorKey: "task",
      header: "Task",
      cell: (props) => <p className="truncate w-[100px]">{props.getValue() || '-'}</p>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (props) => <p className="truncate w-[150px]">{props.getValue() || '-'}</p>
    },
    {

      accessorKey: 'status',
      header: "Status",
      cell: (props) => <p className="truncate w-[100px]">{props.getValue() || '-'}</p>

    },

    {
      accessorKey: 'developedBy',
      header: "Developed By",
      cell: (props) => <p className="truncate w-[130px]">{props.getValue() || '-'}</p>
    },

    {
      accessorKey: 'updatedBy',
      header: "Updated By",
      cell: (props) => <p className="truncate w-[130px]">{props.getValue() || '-'}</p>
      // cell: (props) => <p>{format(new Date(props.getValue()), "dd-MMM-yyyy  hh:mm a")}</p>
    },

    {
      accessorKey: 'assignee',
      header: "Assignee",
      cell: (props) => <p>{props.getValue() || '-'}</p>
    },

    {
      accessorKey: 'action',
      header: 'Action',
      cell: (info) => (
        <div className="text-xl flex items-center">
          <button
            className="mr-2 text-black hover:bg-gray-200"
            onClick={() => {
              if (tasks.find((e) => e.id === +info.row.original.id)) {
                setTask(tasks.find((e) => e.id === +info.row.original.id));
                setShowPopUp(true);
              }
            }}
          >
            <BiEdit />
          </button>
          <button
            className=" text-black hover:bg-gray-200 rounded-full p-1"
            onClick={() => {
              const id = tasks.find(
                (e) => e.id === +info.row.original.id
              )?.id;
              if (
                tasks.find((e) => e.id === +info.row.original.id) &&
                window.confirm("Are you sure you what to delete ? ")
              )
                setTasks(tasks.filter((each) => each.id !== id));
              if (favs.filter((item) => item.id !== id)) setFavs(favs.filter((item) => item.id !== id));
              window.location.reload();
            }}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'favourite',
      header: 'Favourite',
      cell: (info) => {
        console.log('hi!', info.row.original.favTask)
        return (
          <div className={`text-xl flex items-center text-black hover:text-red-600 ${info.row.original.favTask && 'text-red-600'}`}>
            <button
              className="mr-2"
              onClick={() => {
                console.log('info!', info.row.original.id)
                handleAddFav(+info.row.original.id)
              }}
            >
              {info.row.original.favTask ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
            </button>
          </div>
        )
      }
    }
  ];


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
          date: new Date().toLocaleString(),
          task: task.task,
          description: task.description,
          status: "ON-GOING",
          developedBy: task.developedBy,
          updatedBy: task.updatedBy,
          assignee: task.assignee,
          favTask: task.favTask
        },
      ]);
    setTask(defaultValue);
    setShowPopUp(false);
    window.location.reload();
  };

  const handleOnChange = (e) => {
    const { value, name } = e?.target;
    setTask({
      ...task,
      [name]: value,
    });
  }

  const handleAddFav = async (id) => {
    if (tasks.find((e) => e.id === id)) {
      const filterdTask = await tasks.find((e) => e.id === id);
      filterdTask.favTask = !filterdTask?.favTask;

      const removeDup = [...favs, filterdTask].filter((taskItem, index) => [...favs, filterdTask].findIndex((item) => item.id === taskItem.id) === index);
      await setTasks((taskItems) => [...taskItems, filterdTask]);
      await setFavs(removeDup);
      await setFav(filterdTask);
      window.location.reload();
    }
  }

  const addTaskModelPopUp = () => {
    return (
      <div className="fixed inset-0 bg-black z-50 bg-opacity-75 flex justify-center items-center text-white">
        <form
          onSubmit={addTask}
          className="border-2 border-black flex flex-col bg-white rounded-md overflow-hidden "
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
            <p className="self-start font-medium">Enter Task Name : </p>
            <input
              onChange={(e) => handleOnChange(e)}
              value={task.task}
              className=" rounded-md px-3 py-2 mt-2 text-black border border-black"
              placeholder="Task Name."
              type="text"
              name="task"
              id=""
              autoFocus
            />
            <p className="mt-4 self-start font-medium">Enter Description : </p>
            <textarea
              onChange={(e) => handleOnChange(e)}
              value={task.description}
              rows={5}
              className="rounded-md px-3 py-2 mt-2 text-black border border-black"
              placeholder="Description."
              type="text"
              name="description"
              id=""
            />
            <p className="mt-4 self-start font-medium">Developed by : </p>
            <input
              onChange={(e) => handleOnChange(e)}
              value={task.developedBy}
              className="rounded-md px-3 py-2 mt-2 text-black border border-black"
              placeholder="Task Name."
              type="text"
              name="developedBy"
              id=""
            />
            <p className="mt-4 self-start font-medium">Assignee : </p>
            <input
              onChange={(e) => handleOnChange(e)}
              value={task.assignee}
              className=" rounded-md px-3 py-2 mt-2 text-black border border-black"
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



  // const handleRemoveFavItems = async (id) => {
  //   const filterFavTask = await favs.filter((item) => item.id !== id);
  //   const filterTask = await tasks.filter((item) => item.id === id)[0];
  //   filterTask.favTask = false;
  //   await setFavs(filterFavTask);
  //   await setTasks((item) => [...item, filterTask]);
  //   // await setTask(filterTask);
  //   await setFav(filterFavTask);
  //   console.log('data!', filterTask, filterFavTask)
  //   await window.location.reload();
  // }

  const renderTableKeyValue = () => {
    console.log('tasks!', tasks)
    let FinalData =
      tasks
        // .map((e, i) => ({ ...e, id: i + 1 }))
        // .sort((a, b) => b.id - a.id)
        ?.map((e, i) => (
          {
            id: e.id,
            date: new Date().toLocaleString(),
            description: e.description || "-",
            task: e.task,
            status: e.status === "ON-GOING" ? "On-going" : "Done",
            developedBy: e.developedBy,
            updatedBy: e.updatedBy,
            assignee: e.assignee,
            favTask: e.favTask
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

  const hanldeSearchText = (e) => {
    const value = e?.target?.value;
    setSearchText(value);
    const filterSearchText = tasks.filter((item) => item.task.includes(searchText));
    console.log('task!', filterSearchText)

    setTasks(filterSearchText);
  }

  console.log('custom!', fav, fav.length > 0)
  console.log('task!', tasks)


  return (
    <div className="container mx-auto min-w-max">
      {showPopUp && addTaskModelPopUp()}
      <div className="mt-5 flex items-center w-full justify-between">
        <div>
          <div className="flex items-center font-bold text-2xl text-white">
            <h1>Task Management</h1>
          </div>
        </div>
        {/* <input type="text" value={searchText} onChange={(e) => hanldeSearchText(e)}/> */}
        <button className="bg-white text-black hover:bg-zinc-300 flex items-center px-3 py-1 rounded-full mt-5 font-bold text-xs" onClick={() => navigate("/favtasks")}>
          <FavoriteBorderIcon className="text-xs mx-2"/>
          <p className="align-center">Favorite</p>
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
      <div>
          <div className="bg-white grid-cols-none rounded-md overflow-hidden mt-5">
            <Table table={table} />
          </div>
          <div className="flex text-white items-end ">
            <p mb={2} className="p-3 text-lg">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </p>

            <button
              onClick={() => {
                if(table.getCanPreviousPage()) {
                  table.previousPage()}
                }
              }
              // isDisabled={!table.getCanPreviousPage()}
              className="p-3 text-2xl"
            >
              {"<"}
            </button>
            <button
              onClick={() => {
                if(table.getCanNextPage())
                  table.nextPage()
              }}
              // isDisabled={table.getCanNextPage()}
              className="p-3 text-2xl"
            >
              {">"}
            </button>
          </div>
        </div>


    </div>
  );
}