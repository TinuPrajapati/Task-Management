import { BellElectric, Home, ListTodo, MessageCircle, MessageCircleMore, Send, Target, Users } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import MenuOption from './MenuOption'

const Sidebar = () => {
  return (
    <div className='w-[20%] h-full bg-white flex flex-col gap-2.5'>
      <div className='border-b-2 border-yellow-400 h-[18%] flex flex-col justify-center items-center gap-1.5'>
        <h1 className='text-2xl font-bold text-purple-500'>Task Management</h1>
        <h2 className='text-xl font-semibold'>Dashboard</h2>
      </div>
      <div className='w-full min-h-[81%] pl-6 py-2'>
        <MenuOption icon={<i class="ri-home-2-line"></i>} text="Home" to="/"/>
        <MenuOption icon={<ListTodo/>} text="Todo" to="/todos"/>
        <MenuOption icon={<Target/>} text="Projects" to="/projects"/>
        <MenuOption icon={<Users/>} text="Users" to="/users"/>
        <MenuOption icon={<i class="ri-file-chart-line"></i>} text="Reports" to="/reports"/>
        <MenuOption icon={<BellElectric/>} text="Reminder" to="/reminder"/>
        <MenuOption icon={<ListTodo/>} text="Team Projects" to="/team_project"/>
        <MenuOption icon={<Send/>} text="Send Email" to="/send_email"/>
        <MenuOption icon={<MessageCircleMore/>} text="Chats" to="/chats"/>
      </div>
    </div>
  )
}

export default Sidebar