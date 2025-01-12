import React, { useState,useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { CiStar, CiMenuKebab } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const ShowProject = ({ el, handleDelete, handleFavorite }) => {
  const {name} = useParams()
  const navigate = useNavigate()
  const [favorite, setFavorite] = useState(el.favorite);
  const [display, setDisplay] = useState(false);

  // Mapping status to border color
  const statusColors = {
    accept: "border-yellow-400",
    complete: "border-green-400",
    rejected: "border-red-400",
    pending: "border-sky-400",
  };
  const priorityColors = {
    Low: "bg-yellow-400",
    High: "bg-red-400",
    Medium: "bg-sky-400",
  };

  const move = () => {
    navigate(`/${name}/project_edit/${el._id}`)
  }

  const toggleFavorite = () => {
    const value = !favorite;
    setFavorite(value);
    handleFavorite(el._id, value);
  };

  const handleDisplay = () => {
    setDisplay(!display);
  };

  

  return (
    <div
      key={el._id}
      className={`bg-white rounded-md px-3 py-2 border-4 shadow-md relative ${statusColors[el.status]}`}
      onMouseLeave={() => setDisplay(false)}
    >
      {/* Priority, edit, duplicate, delete */}
      <div className="w-full h-10 flex items-center justify-between mb-2">
        <p className={`${priorityColors[el.priority]} text-white px-2 py-1 rounded-lg`}>Priority: {el.priority}</p>
        <div className="h-full flex items-center gap-4 text-xl">
          <button onClick={toggleFavorite}>
            {favorite ? <FaStar className="text-yellow-400" /> : <CiStar />}
          </button>
          <button onClick={handleDisplay}>
            <CiMenuKebab />
          </button>
          <div
            className={`w-[20%] absolute border-2 border-yellow-400 bg-white font-semibold top-10 right-4 ${
              display ? "flex" : "hidden"
            } flex-col items-end p-2 rounded-md text-[1.1rem] duration-200`}
          >
            <button className="w-full py-1 text-end hover:bg-sky-400/50 hover:pr-2 hover:text-white duration-200 rounded-md active:scale-95 hover:font-bold" onClick={move}>
              Edit
            </button>
            <button
              className="w-full py-1 text-end hover:bg-sky-400/50 hover:pr-2 hover:text-white duration-200 rounded-md active:scale-95 hover:font-bold"
              onClick={() => handleDelete(el._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Start and end dates */}
      <div className="w-full flex items-center justify-evenly mb-2">
        <p className="flex items-center gap-1">
          <MdOutlineDateRange /> Start Date:{" "}
          <span className="text-green-400">
            {el.startDate == null ? "--/--/----" : new Date(el.startDate).toLocaleString()}
          </span>
        </p>
        <p className="flex items-center gap-1">
          <MdOutlineDateRange /> End Date:{" "}
          <span className="text-red-400">{new Date(el.endDate).toLocaleString()}</span>
        </p>
      </div>

      {/* Task Name and Description */}
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{el.ProjectTitle}</h3>
        <p className="text-lg">{el.description}</p>
      </div>

      <div className="w-full flex justify-between px-5 mt-4">
        <p>Assign User: {el.assignedTo}</p>
        <p>Task Status: {el.status}</p>
      </div>
      <div className="w-full flex justify-between px-5 mt-4">
        <p>
          <span className="font-semibold">Assign By</span>: {el.assignedBy}
        </p>
        <p>
          <span className="font-semibold">Create Task</span>: {new Date(el.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ShowProject;
