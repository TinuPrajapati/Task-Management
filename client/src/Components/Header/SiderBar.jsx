import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import MenuOption from './MenuOption'
import Cookies from "js-cookie"
import { useSelector } from 'react-redux'
import { logo2 } from '../../assets'
import { RiDashboardFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUsersLine } from "react-icons/fa6";
import { PiMicrosoftTeamsLogoDuotone } from "react-icons/pi";
import { IoIosSend } from "react-icons/io";
import { MdDisplaySettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

const SiderBar = () => {
    const { name } = useParams()
    const navigate = useNavigate();
    const menu = useSelector(state => state.menu.menuState);

    const logout = () => {
        Cookies.remove(import.meta.env.VITE_cookies_name);
        navigate("/login")
    }
    return (
        <aside className={`${menu ? "w-[15%] flex p-2 " : "w-[5%] p-2"} h-full relative flex-col gap-4 items-center duration-500 bg-gradient-to-b from-sky-400 to-indigo-400 text-white border-y-4 border-r-4 border-yellow-400 `}>
            <div className='w-full h-[10%] flex flex-col justify-center items-center'>
                {menu ? <h2 className='text-[1.2rem] font-semibold'>Task Manager</h2> : <img src={logo2} className='w-10 h-10' />}
            </div>

            {/* Navlink Box */}
            <div className='w-full h-[80%] flex flex-col gap-2'>
                <MenuOption text="Dashboard" icon={<RiDashboardFill />} to={`/dashboard/${name}`} />
                <MenuOption text="All Project" icon={<FaTasks />} to={`${name}/all_projects`} />
                <MenuOption text="Task Report" icon={<TbReportAnalytics />} to={`${name}/report`} />
                <MenuOption text="All Users" icon={<FaUsersLine />} to={`${name}/all_users`} />
                <MenuOption text="Team Project" icon={<PiMicrosoftTeamsLogoDuotone />} to={`${name}/team_project`} />
                <MenuOption text="Send Email" icon={<IoIosSend />} to={`${name}/send_email`} />
                <MenuOption text="Setting" icon={<MdDisplaySettings />} to={`${name}/setting`} />
            </div>

            {/* Logout Button */}
            <div className='w-full h-[10%]'>
                <button onClick={logout} className={`${menu ? "text-start" : " text-center"} w-full h-full flex items-center gap-2 text-xl px-2 hover:bg-white hover:rounded-md hover:text-red-400 duration-200  active:scale-90`}>
                    <LuLogOut />
                    {menu && "Logout"}
                </button>
            </div>
        </aside>
    )
}

export default SiderBar