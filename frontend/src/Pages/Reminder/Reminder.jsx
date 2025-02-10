import React, { useState } from 'react'
import OwnReminder from './OwnReminder.jsx';
import AssignedReminder from './AssignedReminder.jsx';
import { Bell } from 'lucide-react';

const Reminder = () => {
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
    <div className="w-full px-4 py-2">
      {/* {showCreateTodos && <CreateTodos setShowCreateTodos={setShowCreateTodos} />} */}
      <div className="flex items-center justify-between w-full h-16">
        <div className='relative flex items-center gap-2'>
          <Bell className="w-6 h-6 text-indigo-600" />
          <h2 className="relative flex items-center gap-2 text-3xl font-semibold">{h2Text}</h2>
          <div className={`${display ? "block" : "hidden"} absolute z-10 w-[100%] bg-white border-2 p-2 rounded-md border-yellow-400 `}>
            <button className="w-full px-3 py-1 text-xl duration-200 rounded-md active:scale-90 hover:bg-sky-400/40 hover:text-white hover:font-bold"
              onClick={changeText}>
              {h2Text != "Assigned Reminders" ? "Assigned Reminders" : "Yours Reminders"}
            </button>
          </div>
        </div>
      </div>

      {h2Text == "Yours Reminders" ? <OwnReminder /> : <AssignedReminder />}
    </div>
  )
}

export default Reminder