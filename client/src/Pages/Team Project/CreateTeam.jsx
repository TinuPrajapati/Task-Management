import React,{useState} from 'react'

const CreateTeam = () => {
    const [newProject, setNewProject] = useState({
        priority: 'Medium',
        status: 'Pending',
        teamMembers: [],
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewProject((prev) => ({ ...prev, [id]: value }));
    };

    const handleCreateProject = (e) => {
        e.preventDefault();
    };
    return (
        <div className="flex items-center justify-center w-full py-2">
            <div className="w-full p-6 bg-white rounded-xl">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Create New Project</h2>
                <form onSubmit={handleCreateProject}>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Project Name
                            </label>
                            <input
                                type="text"
                                value={newProject.name || ''}
                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter project name"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={newProject.description || ''}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                placeholder="Enter project description"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={newProject.startDate || ''}
                                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={newProject.endDate || ''}
                                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Priority
                            </label>
                            <select
                                value={newProject.priority}
                                onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6 space-x-3">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTeam