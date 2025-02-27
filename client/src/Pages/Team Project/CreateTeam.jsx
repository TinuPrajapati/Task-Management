import React, { useState } from 'react';
import { Calendar, Upload, Users, AlertCircle } from 'lucide-react';
import Input from '../../Components/Input';
import { Editor } from 'primereact/editor';
import Select from '../../Components/Select';

function App() {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const [newMemberRole, setNewMemberRole] = useState('member');
    const [formData, setFormData] = useState({
        name: "",
        projectName: "",
        description: "",
        priority: "",
        startDate: "",
        endDate: "",
        members: [],
        upload: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    const handleAddMember = (e) => {
        e.preventDefault();
        if (newMemberEmail) {
            setTeamMembers([...teamMembers, { email: newMemberEmail, role: newMemberRole }]);
            setNewMemberEmail('');
        }
    };

    const handleRemoveMember = (email) => {
        setTeamMembers(teamMembers.filter(member => member.email !== email));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission her
    };

    return (
        <div className="">
            <div className="bg-white shadow-lg rounded-lg px-8 py-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Project Name */}
                    <Input text="Team Name" handleChange={handleChange} value={formData.name} type="text" id="name" placeholder="Enter Team Name" />
                    <Input text="Project Name" handleChange={handleChange} value={formData.projectName} type="text" id="projectName" placeholder="Enter Project Name" />

                    {/* Description */}
                    <div className="flex flex-col gap-1 h-[40vh] mb-4">
                        <label htmlFor="message" className="block mb-1 text-lg pl-3 font-bold text-gray-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <Editor id="description" className='h-[70%]' value={formData.description} onTextChange={(e) => setFormData({ ...formData, description: e.htmlValue })} />
                    </div>

                    {/* Priority */}
                    <Select text="Priority" id="priority" options={["Low", "Medium", "High", "Urgent"]} value={formData.priority} handleChange={handleChange} />

                    {/* Dates */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                        <Input text="Start Date" type="date" id="startDate" value={formData.startDate} handleChange={handleChange} />

                        <Input text="End Date" type="datetime-local" id="endDate" value={formData.endDate} handleChange={handleChange} />
                    </div>

                    {/* Team Members */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Team Members
                        </label>
                        <div className="flex gap-4 mb-4 h-11">
                            <select
                                className="block w-[30%] h-[100%] px-3  border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 focus:border-none outline-none focus:duration-200"
                            >
                                <option value="admin">Admin</option>
                                <option value="member">Hr</option>
                                <option value="viewer">Manager</option>
                                <option value="viewer">Web Developer</option>
                                <option value="viewer">Android Developer</option>
                                <option value="viewer">Ui/Ux Developer</option>
                                <option value="viewer">Graphic Designer</option>
                            </select>
                            <select
                                className="block w-[60%] h-[100%] pl-10 pr-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 focus:border-none outline-none focus:duration-200"
                            >
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                                <option value="viewer">Viewer</option>
                            </select>
                            <button
                                type="button"
                                onClick={handleAddMember}
                                className="w-[10%] h-full bg-purple-600 text-white rounded-md focus:outline-none active:scale-90 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            >
                                Add
                            </button>
                        </div>

                        {/* Team Members List */}
                        <div className="space-y-2">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-gray-400" />
                                        <span className="text-sm text-gray-600">{member.email}</span>
                                        <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                                            {member.role}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveMember(member.email)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* File Upload */}
                    <div>
                        <p className="block mb-1 text-lg pl-3 font-bold text-gray-700">
                            Attachments
                        </p>
                        <label htmlFor="file-upload" className="mt-1 flex flex-col justify-center items-center gap-2 px-6 py-4 border-2 border-gray-300 border-dashed rounded-lg">
                            <Upload className="size-8 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <p htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500">
                                    <span>Upload files</span>

                                </p>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, PDF up to 10MB
                            </p>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            className="hidden"
                            // onChange={handleFileChange}
                            accept="image/*,.pdf,.doc,.docx"
                        />

                        {/* File Preview */}
                        {/* {files.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {files.map((file, index) => (
                                    <div key={index} className="relative group">
                                        {file.type.startsWith('image/') ? (
                                            <img
                                                src={previewUrls[index]}
                                                alt={file.name}
                                                className="h-24 w-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="h-24 w-full flex items-center justify-center bg-gray-100 rounded-lg">
                                                <FileText className="h-8 w-8 text-gray-400" />
                                            </div>
                                        )}
                                        <button
                                            // onClick={() => handleRemoveFile(index)}
                                            className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={16} className="text-gray-500" />
                                        </button>
                                        <p className="mt-1 text-xs text-gray-500 truncate">{file.name}</p>
                                    </div>
                                ))}
                            </div>
                        )} */}
                    </div>

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
        </div>
    );
}

export default App;