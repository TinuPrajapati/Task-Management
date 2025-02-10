import React, { useState } from 'react';
import {
    PlusCircle,
    CheckCircle2,
} from 'lucide-react';

const CreateAssigned = () => {
    const [tasks, setTasks] = useState([]);
        const [newTask, setNewTask] = useState('');
        const [category, setCategory] = useState('Development');
        const [priority, setPriority] = useState('Medium');
        const [assignedTo, setAssignedTo] = useState('John Doe');
        const [openMenuId, setOpenMenuId] = useState(null);
        const [isEditing, setIsEditing] = useState(null);
    
        const categories = ['Development', 'Design', 'Marketing', 'HR', 'Finance'];
        const users = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'];
        const priorities = ['High', 'Medium', 'Low'];
    
        const getPriorityColor = (priority) => {
            switch (priority) {
                case 'High': return 'bg-red-100 text-red-700';
                case 'Medium': return 'bg-yellow-100 text-yellow-700';
                case 'Low': return 'bg-green-100 text-green-700';
                default: return 'bg-gray-100 text-gray-700';
            }
        };
    
        const addTask = (e) => {
            e.preventDefault();
            if (newTask.trim()) {
                setTasks([
                    ...tasks,
                    {
                        id: Date.now(),
                        title: newTask.trim(),
                        completed: false,
                        category,
                        priority,
                        assignedTo,
                    },
                ]);
                setNewTask('');
            }
        };
    
        const toggleTask = (taskId) => {
            setTasks(
                tasks.map((task) =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                )
            );
        };
    
        const deleteTask = (taskId) => {
            setTasks(tasks.filter((task) => task.id !== taskId));
            setOpenMenuId(null);
        };
    
        const startEditing = (taskId) => {
            setIsEditing(taskId);
            setOpenMenuId(null);
        };
    
        const updateTask = (taskId, updatedTitle) => {
            setTasks(
                tasks.map((task) =>
                    task.id === taskId ? { ...task, title: updatedTitle } : task
                )
            );
            setIsEditing(null);
        };
    return (
        <form onSubmit={addTask} className="mb-4 bg-white p-3 rounded-xl shadow-sm flex border-2 border-purple-400">
            <div className="w-[80%] flex flex-col gap-3">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="col-span-1 md:col-span-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className='w-full grid grid-cols-3 gap-4'>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                        {priorities.map((pri) => (
                            <option key={pri} value={pri}>
                                {pri} Priority
                            </option>
                        ))}
                    </select>
                    <select
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                        {users.map((user) => (
                            <option key={user} value={user}>
                                {user}
                            </option>
                        ))}
                    </select>

                </div>
            </div>
            <div className='w-[20%] flex justify-end items-center'>
                <button
                    type="submit"
                    className="w-[80%] h-[80%] rounded-lg text-white font-semibold text-2xl duration-300 bg-purple-400 flex flex-col items-center justify-center "
                >
                    <PlusCircle className="size-6 font-semibold" />
                    Add Todo
                </button>
            </div>
        </form>
    )
}

export default CreateAssigned