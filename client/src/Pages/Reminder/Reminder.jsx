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
    <div className="w-full">

      {h2Text == "Yours Reminders" ? <OwnReminder /> : <AssignedReminder />}
    </div>
  )
}

export default Reminder