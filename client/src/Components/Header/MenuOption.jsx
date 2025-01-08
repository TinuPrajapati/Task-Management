import React from 'react'
import { NavLink } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import { useSelector } from 'react-redux'

const MenuOption = ({ text, icon,to }) => {
    const menu = useSelector(state => state.menu.menuState);
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `${isActive ? "bg-white text-sky-400" : " hover:bg-white/50"} rounded-sm h-10 flex ${menu?"justify-start":"justify-center"} items-center gap-2 font-semibold px-2 text-lg`}
            end
        >
            {icon} {menu && text}
        </NavLink>
    )
}

export default MenuOption