import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";

const ShowUsers = ({el,handleDelete,handlefavorite}) => {
  const [favorite, setFavorite] = useState(el.favorite)
  const [display, setDisplay] = useState(false)

  console.log(el)
  const toggleFavorite = () => {
    const value = !favorite
    setFavorite(value);
    handlefavorite(el._id,value)
  }

  const handleDisplay = () => {
    setDisplay(!display)
  }
  
  return (
    <div key={el._id} className="bg-white rounded-md px-3 py-2 shadow-md relative border-2 border-yellow-400" onMouseLeave={() => setDisplay(false)}>
      {/* Priority,edit,duplicate, edit, delete */}
      <div className="w-full h-10 flex items-center justify-between mb-2">
        <p className="bg-red-500 text-white px-2 py-1 rounded-lg">Role : {el.role_type}</p>
        <div className=" h-full flex items-center gap-4 text-xl">
          <button onClick={toggleFavorite}>
            {favorite ? <FaStar className="text-yellow-400" /> : <CiStar />}
          </button>
          <button onClick={handleDisplay}>
            <CiMenuKebab />
          </button>
          <div className={` w-[30%] absolute border-2 border-yellow-400 bg-white font-semibold top-10 right-4 ${display ? "flex" : "hidden"} flex-col items-end px-3 py-1 rounded-md text-[1.1rem] duration-200`}>
            <button className=" w-full py-1 text-end hover:bg-sky-400/50 hover:text-center hover:text-white duration-200 rounded-md active:scale-95 hover:font-bold">Edit</button>
            <button className=" w-full py-1 text-end hover:bg-sky-400/50 hover:text-center hover:text-white duration-200 rounded-md active:scale-95 hover:font-bold">Duplicate</button>
            <button className=" w-full py-1 text-end hover:bg-sky-400/50 hover:text-center hover:text-white duration-200 rounded-md active:scale-95 hover:font-bold" 
            onClick={() => handleDelete(el._id)}>Delete</button>
          </div>
        </div>
      </div>

      {/* This value is change by employee */}
      <div className="w-full flex items-center justify-evenly mb-2">
        <p className="flex items-center gap-1"><MdOutlineDateRange /> Create User At: <span className="text-green-400 ml-2">{new Date(el.createdAt).toLocaleDateString()}</span></p>
      </div>

      {/* User Details */}
      <div className="w-full flex flex-col gap-1">
        <h3 className="text-xl font-semibold">User Name: {el.name}</h3>
        <p className=" text-lg">Email: {el.email}</p>
        <p>Phone Number:{el.number}</p>
        <p>Total Project:</p>
        <p>Complete Project:</p>
        <p>Reject Project:</p>
        <p>Pending Project:</p>
      </div>
    </div>
  );
};

export default ShowUsers;
