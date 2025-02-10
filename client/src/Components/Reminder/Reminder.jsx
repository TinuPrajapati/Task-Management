import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { changeState } from '../../feature/loaderSlice.js';
import OwnReminder from './OwnReminder.jsx';
import AssignedReminder from './AssignedReminder.jsx';
import { Bell } from 'lucide-react';

const Reminder = () => {
  const { name } = useParams()
  const dispatch = useDispatch()
  const token = Cookies.get(import.meta.env.VITE_cookies_name);
  const [display, setDisplay] = useState(false)
  const [h2Text, setH2Text] = useState("Yours Reminders")

  const changeText = () => {
    if (h2Text === "Yours Reminders") {
      setH2Text("Assigned Reminders");
    } else {
      setH2Text("Yours Reminders");
    }
    setDisplay(false)
  }
  return (
    <div className="w-full px-4 py-8">
      {/* {showCreateTodos && <CreateTodos setShowCreateTodos={setShowCreateTodos} />} */}
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <div className='relative flex items-center gap-2'>
          <Bell className="h-6 w-6 text-indigo-600" />
          <h2 className="text-3xl font-semibold flex items-center gap-2 relative">{h2Text} <span onClick={() => setDisplay(!display)}>{display ? <TiArrowSortedUp /> : <TiArrowSortedDown />}</span></h2>
          <div className={`${display ? "block" : "hidden"} absolute z-10 w-[100%] bg-white border-2 p-2 rounded-md border-yellow-400 `}>
            <button className="w-full px-3 py-1 text-xl  rounded-md active:scale-90 hover:bg-sky-400/40 hover:text-white hover:font-bold duration-200"
              onClick={changeText}>
              {h2Text != "Assigned Reminders" ? "Assigned Reminders" : "Yours Reminders"}
            </button>
          </div>
        </div>
      </div>

      {h2Text == "Yours Reminders" ? <OwnReminder /> : <AssignedReminder />}

      <ToastContainer />
    </div>
  )
}

export default Reminder