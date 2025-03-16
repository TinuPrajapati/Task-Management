import React from 'react';
import {
    Home,
    ListTodo,
    Target,
    FileBarChart,
    Bell,
    Users2,
    Send,
    MessageCircle,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import MenuOption from './MenuOption';

const menuItems = [
    { title: 'Home', icon: <Home size={20} />, link: '/' },
    {
        title: 'Todo', icon: <ListTodo size={20} />, subItems: [
            { name: 'Your Todos', link: '/todos/your' },
            { name: 'Assigned Todos', link: '/todos/assigned' }
        ]
    },
    { title: 'Projects', icon: <Target size={20} />, link: '/projects/your' },
    {
        title: 'Reports',
        icon: <FileBarChart size={20} />,
        subItems: [
            { name: 'Your Reports', link: '/reports/your' },
            { name: 'Submit Report', link: '/reports/submit' },
        ],
    },
    {
        title: 'Reminder',
        icon: <Bell size={20} />,
        subItems: [
            { name: 'Your Reminders', link: '/reminders/your' },
            { name: 'Assigned Reminders', link: '/reminders/assigned' },
        ],
    },
    { title: 'Team Projects', icon: <Users2 size={20} />, link: '/team-projects/tasks' },
    {
        title: 'Send Email',
        icon: <Send size={20} />,
        subItems: [
            { name: 'Employees', link: '/emails/office' },
            { name: 'History', link: '/emails/history' },
        ],
    },
    {
        title: 'Chats',
        icon: <MessageCircle size={20} />,
        link: '/chats/direct'
    },
];

const Sidebar2 = () => {
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
                                `w-full h-10 px-2 py-2 flex items-center gap-2 text-xl font-semibold rounded-lg ${isActive
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
};

export default Sidebar2;
