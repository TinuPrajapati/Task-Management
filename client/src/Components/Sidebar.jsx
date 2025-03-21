import React, { useState } from 'react';
import {
  Home,
  ListTodo,
  Target,
  Users,
  FileBarChart,
  Bell,
  Users2,
  Send,
  MessageCircle,
  LayoutDashboard
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import MenuOption from './MenuOption';

const menuItems = [
  { title: 'Dashboard', icon: <LayoutDashboard size={17} />, link: '/' },
  {
    title: 'Todo', icon: <ListTodo size={17} />, subItems: [
      { name: 'Your Todos', link: '/todos/your' },
      { name: 'Assigned Todos', link: '/todos/assigned' }
    ]
  },
  {
    title: 'Projects', icon: <Target size={17} />, subItems: [
      { name: 'Yours Projects', link: '/projects/your' },
      { name: 'Assigned Projects', link: '/projects/assigned' },
      { name: 'Create Project', link: '/projects/create' }
    ]
  },
  {
    title: 'Users', icon: <Users size={17} />, subItems: [
      { name: 'All Users', link: '/users/all' },
      { name: 'Create User', link: '/users/create' }
    ]
  },
  // {
  //   title: 'Reports', icon: <FileBarChart size={17} />, subItems: [
  //     { name: 'Your Reports', link: '/reports/your' },
  //     { name: 'Submit Report', link: '/reports/submit' },
  //     { name: 'Create Report', link: '/reports/create' }
  //   ]
  // },
  // {
  //   title: 'Reminder', icon: <Bell size={17} />, subItems: [
  //     { name: 'Your Reminders', link: '/reminders/your' },
  //     { name: 'Assigned Reminders', link: '/reminders/assigned' }
  //   ]
  // },
  {
    title: 'Team Projects', icon: <Users2 size={17} />, subItems: [
      { name: 'Team Project', link: '/team-projects/tasks' },
      { name: 'Create Team', link: '/team-projects/create' }
    ]
  },
  {
    title: 'Send Email', icon: <Send size={17} />, subItems: [
      { name: 'Employees', link: '/emails/office' },
      { name: 'Other Person', link: '/emails/others' },
      { name: 'History', link: '/emails/history' }
    ]
  },
  {
    title: 'Chats',
    icon: <MessageCircle size={17} />,
    link: '/chats/direct'
  },
];

function Sidebar() {
  return (
    <div className="h-full w-[20%] bg-white">
      <div className="p-4 border-b h-[18%]">
        <h1 className="text-2xl font-bold text-purple-500">Task Management</h1>
        <p className="text-gray-600">Dashboard</p>
      </div>

      <nav className="p-4 h-[80%] overflow-y-scroll flex flex-col gap-2">
        {menuItems.map((item, index) =>
          item.subItems ? (
            <MenuOption
              key={index}
              icon={item.icon}
              menu={item.title}
              options={item.subItems}
            />
          ) : (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `w-full h-10 px-2 py-2 flex items-center gap-2 text-lg font-semibold rounded-lg ${isActive
                  ? 'text-white bg-purple-500 px-2'
                  : 'hover:text-white hover:bg-purple-400 duration-300'
                }`
              }
              to={item.link}
            >
              {item.icon} {item.title}
            </NavLink>
          )
        )}
      </nav>
    </div>
  );
}

export default Sidebar;