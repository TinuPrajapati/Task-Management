import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useTodoStore } from '../api/Store/useTodoStore';
import useAuthStore from '../api/Store/useAuthStore';

const CreateAssigned = ({ setDialogBox }) => {
    const { CreateAssignedTodo } = useTodoStore();
    const { getRoleByUsers, roleUser } = useAuthStore();
    const [formData, setFormData] = useState({
        todo: "",
        category: "",
        priority: "High",
        assignedTo: "",
        deadline: ""
    });
    const priorities = ['High', 'Medium', 'Low'];

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id == "category") getRoleByUsers(value);
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const addTask = (e) => {
        e.preventDefault();
        CreateAssignedTodo(formData);
        setDialogBox(false);
    };

    return (
        <div className='w-full h-full absolute top-0 left-0 bg-black/40 flex justify-center items-center'>
            <div className='w-[50%] bg-white p-4 rounded-lg'>
                <div className='relative flex items-center justify-center mb-3'>
                    <h2 className='text-center font-bold text-2xl'>Assigned Todo</h2>
                    <button
                        onClick={() => setDialogBox(false)}
                        className='absolute right-0 text-gray-300 hover:text-gray-500 duration-200'
                    >
                        <X className='size-5 hover:size-7 duration-200 font-bold' />
                    </button>
                </div>
                <form onSubmit={addTask} className="w-full bg-white p-3 rounded-md shadow-sm flex flex-col gap-2 border-2 border-purple-400">
                    <input
                        type="text"
                        id="todo"
                        value={formData.todo}
                        onChange={handleChange}
                        placeholder="Add a new task..."
                        className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <div className='w-full grid grid-cols-2 gap-4'>
                        <select
                            value={formData.priority}
                            id="priority"
                            onChange={handleChange}
                            className="p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        >
                            {priorities.map((pri) => (
                                <option key={pri} value={pri}>
                                    {pri} Priority
                                </option>
                            ))}
                        </select>

                        <input
                            value={formData.deadline}
                            onChange={handleChange}
                            id="deadline"
                            type="datetime-local"
                            className="p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        />

                        <select
                            value={formData.category}
                            onChange={handleChange}
                            id="category"
                            className="p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        >
                            <option>Choose role for new Employee</option>
                            {["Admin", "HR", "Manager", "Web Developer", "Android Developer", "IOS Developer", "Graphic Designer", "UI/UX Designer"].map((value, index) => (
                                <option value={value}>{value}</option>
                            ))}
                        </select>
                        <select
                            value={formData.assignedTo}
                            onChange={handleChange}
                            id="assignedTo"
                            className="p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        >
                            {
                                formData.category == "" ?
                                    <option>Choose role first</option>
                                    :
                                    roleUser.length > 0 ?
                                        <>
                                            <option>Choose User</option>
                                            {roleUser.map((user) =>
                                                <option key={user._id} value={user.name}>{user.name}</option>
                                            )}
                                        </>
                                        :
                                        <option>This role has no employee</option>
                            }
                        </select>
                    </div>

                    <div className='w-full flex justify-center items-center'>
                        <button
                            type="submit"
                            className="w-[50%] h-12 rounded-lg text-white font-semibold text-xl duration-300 bg-purple-600 flex items-center justify-center gap-2 active:scale-90"
                        >
                            <Plus className="size-5 font-semibold" />
                            Add Todo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAssigned;
