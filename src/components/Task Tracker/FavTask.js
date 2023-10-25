import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MyContext } from '../../Context';

function FavTask() {
  const [favItems, setFavItems] = useState([]);
  const [ taskItems, setTaskItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const getTaskItems = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
    const filterFavItems = getTaskItems.filter((item) => {return item.favTask === true})
    setFavItems(filterFavItems);
    setTaskItems(getTaskItems);
  },[])

  const handleRemoveFavItems = async (id) => {
    const filterTaskItems = await taskItems.map((item) => {
      if(item.id === id) {
        return { ...item, favTask: false};
      }
      return item;
    })
    console.log('filterTaskItems!',favItems, filterTaskItems)
    await localStorage.setItem("tasks", JSON.stringify(filterTaskItems));
    navigate('/task');
  }

  return (
    <div className=" items-center">
      <div className='text-white text-3xl text-left font-bold px-5 py-3'>Favorite Tasks</div>
      <table className='p-10 w-full border-2'>
        <tr className='border border-y-gray-500'>
          <th className='text-white p-2'>Task</th>
          <th className='text-white p-2'>Description</th>
          <th className='text-white p-2'>Status</th>
          <th className='text-white p-2'>DevelopedBy</th>
          <th className='text-white p-2'>UpdatedBy</th>
          <th className='text-white p-2'>Assignee</th>
          <th className='text-white p-2'>Action</th>
        </tr>
        <tbody>
        {favItems.length > 0 && favItems.map((item) => (
          // <div className="border border-y-gray-500 m-4 p-4" key={item.id}>
            <tr className="odd:bg-gray-500 px-10">
              <td className="text-white px-2">{item?.task}</td>
              <td className="text-white px-2">{item?.description}</td>
              <td className="text-white px-2">{item?.status}</td>
              <td className="text-white px-2">{item?.developedBy}</td>
              <td className="text-white px-2">{item?.updatedBy}</td>
              <td className="text-white px-2">{item?.assignee}</td>
              <FavoriteIcon className=" text-red-600 hover:text-white" onClick={() => handleRemoveFavItems(item?.id)} />
            </tr>
          // </div>
        ))}
        </tbody>
      </table>
          {favItems.length === 0 && <div className="text-gray-500 text-3xl font-bold p-5">Add Your Favourite Item</div>}
      </div>
  )
}

export default FavTask