import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuOption = ({icon,text,to}) => {
    return (
        <NavLink to={to} className={({isActive})=>`w-full flex items-center gap-1.5 h-10 text-xl mb-2 ${isActive ? "bg-purple-300 justify-center text-white rounded-l-full":"hover:border-r-4 hover:border-purple-300 hover:pl-6"} duration-300`}>
        {icon} 
        <p className='font-semibold'>{text}</p>
        </NavLink>
    )
}

export default MenuOption