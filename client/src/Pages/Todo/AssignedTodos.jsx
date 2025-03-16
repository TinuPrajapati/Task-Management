import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle, MoreVertical, Edit2, Trash2, Filter, Plus, Search } from 'lucide-react';
import CreateAssigned from '../../Components/CreateAssigned';
import { useTodoStore } from '../../api/Store/useTodoStore';
import useAuthStore from '../../api/Store/useAuthStore';

function AssignedTodos() {
    const { getAssignedTodosAll,getAssignedTodos, assingedTodo, deleteAssignedTodos, updateAssignedTodo } = useTodoStore();
    const [dialopBox, setDialogBox] = useState(false)
    const { authUser } = useAuthStore();

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    useEffect(() => {
        if (authUser?.role === "Admin" || authUser?.role === "HR" || authUser?.role === "Manager") {
            getAssignedTodosAll()
        }else{
            getAssignedTodos()
        }
    }, [authUser?.role]);

    return (
        <div className="min-h-[60vh]">
            {dialopBox && <CreateAssigned setDialogBox={setDialogBox} />}
            {/* <CreateAssigned /> */}
            <div className="mb-4 h-12 flex justify-between gap-4 items-center w-full">
                <div className="relative h-full w-[60%]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 h-full border-2 border-purple-400 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-none"
                        placeholder="Search "
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className='flex items-center gap-2 justify-center text-white bg-purple-400 text-xl px-4 h-full rounded-md font-semibold active:scale-90'><Filter className='size-5' /> Filter</button>
                {authUser?.role === "Admin" || authUser?.role === "HR" || authUser?.role === "Manager" ?
                    <button
                        onClick={() => setDialogBox(true)}
                        className='flex items-center gap-2 justify-center text-white bg-purple-400 text-xl px-4 h-full rounded-md font-semibold active:scale-90'>
                        <Plus />
                        Assigned Todo
                    </button>
                    : null
                }
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assingedTodo.length === 0 ? (
                    <div className="min-h-[37vh] col-span-full bg-white/50 rounded-xl shadow-sm border-2 p-8 text-center border-dashed border-purple-400 flex justify-center items-center text-2xl font-semibold text-purple-400">
                        No todos yet. Add your first todo above!
                    </div>
                ) : (
                    assingedTodo.map((task) => (
                        <div
                            key={task._id}
                            className="bg-white rounded-md shadow-sm p-3"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`px-3 py-1.5 rounded-md text-sm font-semibold ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                                <button
                                    onClick={() => deleteAssignedTodos(task._id)}
                                    className="text-red-600 hover:bg-red-100 p-1.5 rounded-md active:scale-90"
                                >
                                    <Trash2 className="size-5" />
                                </button>
                            </div>
                            <p className={`text-lg mb-2 ${task.complete ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                {task.todo}
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                    <h2 className=" font- bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center mr-1 ">Category : </h2>
                                    {task.category}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <h2 className=" font- bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center mr-1 ">Deadline : </h2>
                                    {new Date(task.deadline).toLocaleString("en-GB")}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <h2 className=" font- bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center mr-1 ">Assigned By : </h2>
                                    {task.assignedBy.name}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <h2 className=" font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center mr-1 ">Assigned User : </h2>
                                    {task.assignedTo}
                                </div>
                            </div>
                            {!task.complete && <button
                                onClick={() => updateAssignedTodo({ id: task._id, complete: !task.complete })}
                                className={`mt-4 w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${task.complete
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <div className="flex items-center justify-center">
                                    {task.complete ? (
                                        <CheckCircle2 className="w-5 h-5 mr-2" />
                                    ) : (
                                        <Circle className="w-5 h-5 mr-2" />
                                    )}
                                    {task.complete ? 'Completed' : 'Mark as Complete'}
                                </div>
                            </button>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default AssignedTodos;