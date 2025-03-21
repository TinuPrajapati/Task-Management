import React, { useState } from 'react';
import { X } from 'lucide-react';
import Input from '../../Components/Input';
import { Editor } from 'primereact/editor';
import Select from '../../Components/Select';
import Date from '../../Components/Calendar';
import useAuthStore from '../../api/Store/useAuthStore.js';
import MultipleFileUploader from '../../Components/MultipleFileUploader.jsx';
import useTeamStore from '../../api/Store/useTeamStore.js';
import { useNavigate } from 'react-router-dom';

function App() {
    const { getRoleByUsers, roleUser } = useAuthStore();
    const {addTeam} = useTeamStore();
    const navigate = useNavigate();
    const [teamMembers, setTeamMembers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        projectName: "",
        description: "",
        priority: "",
        startDate: "",
        endDate: "",
        members: [],
        role: "",
        file: []
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id == "role") getRoleByUsers(value);
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    const handleAddMember = (e) => {
        e.preventDefault();
        const name = e.target.value;
        const user = roleUser.find(user => user.name === name);
        setTeamMembers([...teamMembers, user]);

    };

    const handleRemoveMember = (email) => {
        setTeamMembers(teamMembers.filter(member => member.email !== email));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTeam({...formData, members: teamMembers},navigate);
        setFormData({
            name: "",
            projectName: "",
            description: "",
            priority: "",
            startDate: "",
            endDate: "",
            members: [],
            role: "",
            file: []
        })
    };

    return (
        <div className="bg-white rounded-md px-4 py-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Create New Project</h1>

            <form onSubmit={handleSubmit} className="space-y-2">
                {/* Project Name */}
                <div className='grid grid-cols-2 gap-4'>
                    {/* Priority */}
                    <Select text="Priority" id="priority" options={["Low", "Medium", "High"]} value={formData.priority} handleChange={handleChange} />
                    <Input text="Team Name" handleChange={handleChange} value={formData.name} type="text" id="name" placeholder="Enter Team Name" />
                </div>
                <Input text="Project Name" handleChange={handleChange} value={formData.projectName} type="text" id="projectName" placeholder="Enter Project Name" />

                {/* Description */}
                <div className="flex flex-col gap-1 h-[40vh] mb-4">
                    <label htmlFor="message" className="block mb-1 text-lg pl-3 font-bold text-gray-700">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <Editor id="description" className='h-[70%]' value={formData.description} onTextChange={(e) => setFormData({ ...formData, description: e.htmlValue })} />
                </div>



                {/* Dates */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* <Date /> */}
                    <Input text="Start Date" type="date" id="startDate" value={formData.startDate} handleChange={handleChange} />

                    <Input text="End Date" type="datetime-local" id="endDate" value={formData.endDate} handleChange={handleChange} />
                </div>

                {/* Team Members */}
                <div>
                    <label className="block mb-1 text-lg pl-3 font-bold text-gray-700">Team Members <span className="text-red-500">*</span></label>
                    <div className="flex gap-4 mb-4 h-11">
                        <select
                            id='role'
                            value={formData.role}
                            onChange={handleChange}
                            className="block w-[40%] h-[100%] px-4  border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 focus:border-none outline-none focus:duration-200"
                        >
                            <option>Choose role</option>
                            {["Admin", "HR", "Manager", "Web Developer", "Android Developer", "IOS Developer", "Graphic Designer", "UI/UX Designer"].map((value, index) => (
                                <option value={value}>{value}</option>
                            ))}
                        </select>
                        <select
                            onChange={handleAddMember}
                            className="block w-[60%] h-[100%] pl-10 pr-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 focus:border-none outline-none focus:duration-200"
                        >
                            {formData.role === "" ? (
                                <option>Choose role first</option>
                            ) : roleUser.length > 0 ? (
                                <>
                                    <option>Choose User</option>
                                    {roleUser.map((user) => (
                                        <option key={user._id} value={user.name}>
                                            {user.name}
                                        </option>
                                    ))}
                                </>
                            ) : (
                                <option>This role has no employee</option>
                            )}
                        </select>
                    </div>

                    {/* Team Members List */}
                    <div className="flex gap-4 items-center">
                        {teamMembers.map((member) => (
                            <div key={member._id} className=" relative flex items-center gap-2 bg-purple-200 py-2 px-4 rounded-md">
                                <img
                                    src={member?.image || '/default-avatar.png'}
                                    alt={member?.name || 'User Avatar'}
                                    className="size-10 rounded-md border-2 border-purple-200"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{member?.name || 'Unknown'}</h3>
                                    <p className="text-purple-600 font-medium text-sm">{member?.role || 'No Role'}</p>
                                </div>
                                <button
                                    onClick={(e) => handleRemoveFile(e, index)}
                                    className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} className="text-gray-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* File Upload */}
                <MultipleFileUploader setFormData={setFormData} />

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    );
}

export default App;