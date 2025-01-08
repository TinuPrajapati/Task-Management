import React,{useState} from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";

const ShowTeamProject = () => {
    const [favorite, setFavorite] = useState(false)
    const [display, setDisplay] = useState(false)
    const toggleFavorite = () => {
        setFavorite(!favorite)
    }

    const handleDisplay = () => {
        setDisplay(!display)
    }
    return (
        <div className="bg-white rounded-md px-3 py-2 shadow-md relative" onMouseLeave={() => setDisplay(false)}>
            {/* Priority,edit,duplicate, edit, delete */}
            <div className="w-full h-10 flex items-center justify-between mb-2">
                <p className="bg-red-500 text-white px-2 py-1 rounded-lg">High Priority</p>
                <div className=" h-full flex items-center gap-4 text-xl">
                    <button onClick={toggleFavorite}>
                        {favorite ? <FaStar className="text-yellow-400" /> : <CiStar />}
                    </button>
                    <button onClick={handleDisplay}>
                        <CiMenuKebab />
                    </button>
                    <div className={`absolute bg-sky-400 text-white font-semibold top-10 right-4 ${display ? "flex" : "hidden"} flex-col items-end px-2 py-1 rounded-md text-[1rem] duration-200`}>
                        <button className="">Edit</button>
                        <button className="">Duplicate</button>
                        <button className="">Delete</button>
                    </div>
                </div>
            </div>

            {/* This value is change by employee */}
            <div className="w-full flex items-center justify-evenly mb-2">
                <p className="flex items-center gap-1"><MdOutlineDateRange /> Start Date: <span className="text-green-400">01/01/2000</span></p>
                <p className="flex items-center gap-1"><MdOutlineDateRange /> End Date: <span className="text-red-400">01/01/2000</span></p>
            </div>

            {/* Task Name and description */}
            <div className="w-full flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Team Name</h3>
                <p className=" text-lg">Team Description</p>
            </div>

            <div className="w-full mt-4">
                <p>Team Project Status: Pending</p>
                <p>User list:</p>
            </div>
            <div className="w-full flex justify-between px-5 mt-4">
                <p><span className="font-semibold">Created By</span>: Adam</p>
                <p><span className="font-semibold">Create Team At</span>: 01/01/2200</p>
            </div>
        </div>
    )
}

export default ShowTeamProject