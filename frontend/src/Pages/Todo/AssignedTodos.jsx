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
import CreateAssigned from '../../Components/Todos/Assigned Todos/CreateAssigned';

function AssignedTodos() {
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
        <div className="min-h-[60vh]">
            <CreateAssigned />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.length === 0 ? (
                    <div className="min-h-[37vh] col-span-full bg-white/50 rounded-xl shadow-sm border-2 p-8 text-center border-dashed border-purple-400 flex justify-center items-center text-2xl font-semibold text-purple-400">
                        No todos yet. Add your first todo above!
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

export default AssignedTodos;