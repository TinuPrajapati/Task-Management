import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2} from 'lucide-react';
import { useTodoStore } from '../../api/Store/useTodoStore';

function YoruTodos() {
    const {addSelfTodo,getSelfTodos,todos,deleteSelfTodo} = useTodoStore();
    const [formData, setFormData] = useState({
        todo: "",
        priority: "Medium",
        deadline: ""
    })

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const addTodo = (e) => {
        e.preventDefault();
        addSelfTodo(formData);
    };

    useEffect(()=>{
        getSelfTodos();
    },[])

    return (
        <div className="min-h-[80vh]">
            <form onSubmit={addTodo} className="mb-4 bg-white h-[15%] p-2 rounded-xl shadow-sm flex gap-4 border-2 border-purple-400">
                <input
                    type="text"
                    name="todo"
                    value={formData.todo}
                    onChange={handleChange}
                    placeholder="Add a new todo..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                    type='datetime-local'
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <select
                    value={formData.priority}
                    name="priority"
                    onChange={handleChange}
                    className="w-40 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                </select>
                <button
                    type="submit"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 flex items-center active:scale-90"
                >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add Todo
                </button>
            </form>

            <div className="space-y-3">
                {todos?.length === 0 ? (
                    <div className=" bg-white/50 rounded-xl shadow-sm border-2 p-8 text-center border-dashed border-purple-400 flex justify-center items-center text-2xl font-semibold text-purple-400">
                        No todos yet. Add your first todo above!
                    </div>
                ) : (
                    todos?.map((todo) => (
                        <div
                            key={todo._id}
                            className={`p-4 rounded-lg shadow-md bg-white flex items-center justify-between`}
                        >
                            <div className="flex items-center space-x-4">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                                />
                                <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(todo.priority)}`}>
                                    {todo.priority}
                                </span>
                                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                                    {todo.todo}
                                </span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className={`text-sm`}>
                                    {new Date(todo.deadline).toLocaleString("en-GB")}
                                </p>
                                <button
                                    onClick={()=>deleteSelfTodo(todo._id)}
                                    className="text-red-500 hover:text-red-700 active:scale-90"
                                >
                                    <Trash2 className="w-5 h-5" />
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