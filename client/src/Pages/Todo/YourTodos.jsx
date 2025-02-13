import React, { useState } from 'react';
import {
    PlusCircle,
    CheckCircle2,
    Circle,
    ListTodo,
    MoreVertical,
    Bell
} from 'lucide-react';

function YoruTodos() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [priority, setPriority] = useState('Medium');

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const addTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            setTodos([
                ...todos,
                {
                    id: Date.now(),
                    title: newTodo.trim(),
                    completed: false,
                    priority,
                },
            ]);
            setNewTodo('');
        }
    };

    const toggleTodo = (todoId) => {
        setTodos(
            todos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="min-h-[80vh]">
            <form onSubmit={addTodo} className="mb-4 bg-white h-[15%] p-2 rounded-xl shadow-sm flex gap-4 border-2 border-purple-400">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-40 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                </select>
                <button
                    type="submit"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
                >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add Todo
                </button>
            </form>

            <div className="space-y-3">
                {todos.length === 0 ? (
                    <div className=" bg-white/50 rounded-xl shadow-sm border-2 p-8 text-center border-dashed border-purple-400 flex justify-center items-center text-2xl font-semibold text-purple-400">
                        No todos yet. Add your first todo above!
                    </div>
                ) : (
                    todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="bg-white h-20 rounded-xl shadow-sm border-2 border-dashed border-purple-400 p-4 flex items-center justify-between group hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-center space-x-4 flex-1 h-full">
                                <span className={`px-3 h-full rounded-lg text-[1rem] font-medium flex justify-center items-center ${getPriorityColor(todo.priority)}`}>
                                    {todo.priority}
                                </span>
                                <p className={`text-xl flex items-center ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                    {todo.title}
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => toggleTodo(todo.id)}
                                    className={`p-2 rounded-lg transition-colors duration-200 ${todo.completed
                                        ? 'text-green-600 hover:bg-green-50'
                                        : 'text-gray-400 hover:bg-gray-50'
                                        }`}
                                >
                                    {todo.completed ? (
                                        <CheckCircle2 className="w-6 h-6" />
                                    ) : (
                                        <Circle className="w-6 h-6" />
                                    )}
                                </button>
                                <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg duration-200">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default YoruTodos;