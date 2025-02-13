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
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import MenuOption from './MenuOption';

const menuItems = [
  { title: 'Home', icon: <Home size={20} /> },
  {
    title: 'Todo', icon: <ListTodo size={20} />, subItems: [
      { name: 'Your Todos', link: '/todos/your' },
      { name: 'Assigned Todos', link: '/todos/assigned' }
    ]
  },
  {
    title: 'Projects', icon: <Target size={20} />, subItems: [
      { name: 'Yours Projects', link: '/projects/your' },
      { name: 'Assigned Projects', link: '/projects/assigned' },
      { name: 'Create Project', link: '/projects/create' }
    ]
  },
  {
    title: 'Users', icon: <Users size={20} />, subItems: [
      { name: 'All Users', link: '/users/all' },
      { name: 'Create User', link: '/users/create' }
    ]
  },
  {
    title: 'Reports', icon: <FileBarChart size={20} />, subItems: [
      { name: 'Your Reports', link: '/reports/your' },
      { name: 'Submit Report', link: '/reports/submit' },
      { name: 'Create Report', link: '/reports/create' }
    ]
  },
  {
    title: 'Reminder', icon: <Bell size={20} />, subItems: [
      { name: 'Your Reminders', link: '/reminders/your' },
      { name: 'Assigned Reminders', link: '/reminders/assigned' }
    ]
  },
  {
    title: 'Team Projects', icon: <Users2 size={20} />, subItems: [
      { name: 'Active Teams', link: '/team-projects/active' },
      { name: 'Team Tasks', link: '/team-projects/tasks' },
      { name: 'Create Team', link: '/team-projects/create' }
    ]
  },
  {
    title: 'Send Email', icon: <Send size={20} />, subItems: [
      { name: 'Employees', link: '/emails/office' },
      { name: 'Other Users', link: '/emails/others' },
      { name: 'History', link: '/emails/history' }
    ]
  },
  {
    title: 'Chats', icon: <MessageCircle size={20} />, subItems: [
      { name: 'Direct Messages', link: '/chats/direct' },
      { name: 'Group Chats', link: '/chats/group' },
      { name: 'Channels', link: '/chats/channels' }
    ]
  },
];

function SideBar() {
  const [expandedItems, setExpandedItems] = useState({});
  const { pathname } = useLocation();

  const toggleItem = (title) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="h-full w-[20%] bg-white">
      <div className="p-4 border-b h-[18%]">
        <h1 className="text-2xl font-bold text-purple-500">Task Management</h1>
        <p className="text-gray-600">Dashboard</p>
      </div>

      <nav className="p-4 h-[80%] overflow-y-scroll">
        {menuItems.map((item) => (
          <MenuOption  item={item}/>
        ))}
      </nav>

    </div>
  );
}

export default SideBar;
