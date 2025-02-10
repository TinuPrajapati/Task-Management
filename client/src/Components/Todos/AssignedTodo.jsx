import React, { useState } from 'react';
import {
    PlusCircle,
    CheckCircle2,
    Circle,
    Building2,
    MoreVertical,
    Edit2,
    Trash2,
    Bell,
    Calendar
} from 'lucide-react';

function App() {
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
        <div className="min-h-[70vh]">
            <form onSubmit={addTask} className="mb-8 bg-white p-6 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
                        className="col-span-1 md:col-span-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        {users.map((user) => (
                            <option key={user} value={user}>
                                {user}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="col-span-1 md:col-span-2 lg:col-span-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                    >
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Add Task
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.length === 0 ? (
                    <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                        No tasks yet. Add your first task above!
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === task.id ? null : task.id)}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                    >
                                        <MoreVertical className="w-5 h-5 text-gray-500" />
                                    </button>
                                    {openMenuId === task.id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                            <button
                                                onClick={() => startEditing(task.id)}
                                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            >
                                                <Edit2 className="w-4 h-4 mr-2" /> Edit
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {isEditing === task.id ? (
                                <input
                                    type="text"
                                    value={task.title}
                                    onChange={(e) => updateTask(task.id, e.target.value)}
                                    onBlur={() => setIsEditing(null)}
                                    autoFocus
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                                />
                            ) : (
                                <p className={`text-lg mb-4 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                    {task.title}
                                </p>
                            )}
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-medium mr-2">Category:</span>
                                    {task.category}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-medium mr-2">Assigned to:</span>
                                    {task.assignedTo}
                                </div>
                            </div>
                            <button
                                onClick={() => toggleTask(task.id)}
                                className={`mt-4 w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${task.completed
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <div className="flex items-center justify-center">
                                    {task.completed ? (
                                        <CheckCircle2 className="w-5 h-5 mr-2" />
                                    ) : (
                                        <Circle className="w-5 h-5 mr-2" />
                                    )}
                                    {task.completed ? 'Completed' : 'Mark as Complete'}
                                </div>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;