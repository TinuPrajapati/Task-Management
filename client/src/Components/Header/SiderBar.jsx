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
import { LuClipboardList } from "react-icons/lu";
import { LuBellElectric } from "react-icons/lu";
import { IoIosChatboxes } from "react-icons/io";

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
           

            {/* Navlink Box */}
            <div className='w-full h-[80%] flex flex-col gap-2 overflow-y-scroll'>
                <MenuOption text="Dashboard" icon={<RiDashboardFill />} to={`/dashboard/${name}`} />
                <MenuOption text="Todos" icon={<LuClipboardList />} to={`/${name}/todos`} />
                <MenuOption text="All Reminder" icon={<LuBellElectric />} to={`/${name}/reminder`} />
                <MenuOption text="All Project" icon={<FaTasks />} to={`${name}/all_projects`} />
                <MenuOption text="Task Report" icon={<TbReportAnalytics />} to={`${name}/report`} />
                <MenuOption text="All Users" icon={<FaUsersLine />} to={`${name}/all_users`} />
                <MenuOption text="Team Project" icon={<PiMicrosoftTeamsLogoDuotone />} to={`${name}/team_project`} />
                <MenuOption text="Send Email" icon={<IoIosSend />} to={`${name}/send_email`} />
                <MenuOption text="Chats" icon={<IoIosChatboxes />} to={`${name}/chats`} />
                <MenuOption text="Setting" icon={<MdDisplaySettings />} to={`${name}/setting`} />
            </div>
        </aside>
    )
}

export default SiderBar