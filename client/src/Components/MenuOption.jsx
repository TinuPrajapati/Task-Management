import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'

const MenuOption = ({ menu, options, icon }) => {
    const { pathname } = useLocation();
    const [expandedItems, setExpandedItems] = useState(false);
    return (
        <div>
            <button
                onClick={() => setExpandedItems(!expandedItems)}
                className='flex justify-between items-center w-full h-10 hover:border-x-4 hover:border-purple-400  duration-300 px-2 rounded-lg  '>
                <p className='flex items-center gap-2 text-xl font-semibold'>
                    {icon} {menu}
                </p>
                {
                    expandedItems ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                }
            </button>

            <div className={`${expandedItems ? "flex" : "hidden"} ml-9 flex-col space-y-1 transition-all}`}>
                {options.map((option,index) => (
                    <NavLink
                        key={index}
                        to={option.link}
                        className={({ isActive }) => `w-full h-10 px-2 flex items-center gap-2 text-lg  rounded-lg ${isActive ? 'text-white bg-purple-500 px-2 font-semibold ' : ' hover:text-white hover:bg-purple-400 hover:font-semibold  duration-300'}`} >
                        {option.name}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default MenuOption