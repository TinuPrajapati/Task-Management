import React, { useState } from 'react';
import { Plus, PlusCircle, X } from 'lucide-react';
import toast  from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { allUsers, createAssignedTasks } from '../../../api/axiosInstance';

const CreateAssigned = ({setDialogBox}) => {
    const [formData, setFormData] = useState({
        todo: "",
        category: "Devlopment",
        priority: "",
        assignedTo: ""
    });

    const categories = ['Development', 'Design', 'Marketing', 'HR', 'Finance'];
    const users = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'];
    const priorities = ['High', 'Medium', 'Low'];

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const {data} = useQuery({
        queryKey: ['users',categories],
        queryFn:()=>allUsers(formData.category)
    })
    console.log(data);

    const mutation = useMutation({
        mutationFn: createAssignedTasks,
        onSuccess: (data) => {
            toast.success(data.message);
            setDialogBox(false);
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })

    const addTask = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };
    return (
        <div className='w-full h-full absolute top-0 left-0 bg-black/40 flex justify-center items-center'>
            <div className='w-[50%] bg-white p-4 rounded-lg '>
                <div className='relative flex items-center justify-center mb-3'>
                    <h2 className='text-center font-bold text-2xl'>Assigned Todo </h2>
                    <button 
                    onClick={()=>setDialogBox(false)}
                    className='absolute right-0 text-gray-300 hover:text-gray-500 duration-200'><X className='size-5 hover:size-7 duration-200 font-bold' /></button>
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

                        <input type='dateTime-local' className="p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white" />
                        <select
                            value={formData.category}
                            onChange={handleChange}
                            id="category"
                            className="p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <select
                            value={formData.assignedTo}
                            onChange={handleChange}
                            id="assignedTo"
                            className="p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        >
                            {users.map((user) => (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className='w-full flex justify-center items-center'>
                        <button
                            type="submit"
                            className="w-[50%] h-12 rounded-lg text-white font-semibold text-xl duration-300 bg-purple-600 flex items-center justify-center gap-2 active:scale-90 "
                        >
                            <Plus className="size-5 font-semibold" />
                            Add Todo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAssigned