import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function Date({ text="Date" }) {
    const [date, setDate] = useState(null);

    return (
        <div className=" h-20 py-1">
            <p  className="block mb-1 text-lg pl-3 font-bold text-gray-700">{text} <span className="text-red-500">*</span></p> 
            <Calendar value={date} onChange={(e) => setDate(e.value)} className=" block w-full py-2 px-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 focus:border-none outline-none focus:duration-200 p-calendar" dateFormat="dd/mm/yy"
            />
        </div>
    )
}
        