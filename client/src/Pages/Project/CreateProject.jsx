import React, { useState } from 'react';
import {
    Users,
    FileText,
    Upload,
    X,
} from 'lucide-react';
import { Editor } from 'primereact/editor';
import Input from '../../Components/Input';
import Select from '../../Components/Select';

const users = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Senior Developer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
        id: 2,
        name: "Michael Rodriguez",
        role: "Project Manager",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
        id: 3,
        name: "Emily Watson",
        role: "UI Designer",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    }
];

function CreateProject() {

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [files, setFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        priority: "Medium",
        role: "",
        assignedTo: "",
        startDate: "",
        endDate: "",
        file: ""
    })

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    const handleUserToggle = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles(prev => [...prev, ...selectedFiles]);

        // Create preview URLs for images
        selectedFiles.forEach(file => {
            if (file.type.startsWith('image/')) {
                const url = URL.createObjectURL(file);
                setPreviewUrls(prev => [...prev, url]);
            }
        });
    };

    const handleRemoveFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        if (previewUrls[index]) {
            URL.revokeObjectURL(previewUrls[index]);
            setPreviewUrls(prev => prev.filter((_, i) => i !== index));
        }
    };

    return (
        <div className=" bg-white rounded-lg p-3 ">
            {/* Basic Information */}
            <form className="space-y-4">
                <Input text="Project Name" type="text" id="name" value={formData.name} handleChange={handleInputChange} placeholder={"Enter Project Name"} />

                {/* Priority and Role */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Select text="Priority" id="priority" options={["Low", "Medium", "High", "Urgent"]} value={formData.priority} handleChange={handleInputChange} />
                    <Select text="Role" id="role" options={["Choose Role", "Admin", "HR", "Manager", "Web Developer", "Android Developer", "IOS Developer", "Ui/Ux Designer", "Graphic Designer", "EveryOne"]} value={formData.role} handleChange={handleInputChange} />

                </div>

                {/* Team Members */}
                <div className=''>
                    <label className="block mb-1 text-lg pl-3 font-bold text-gray-700">
                        User List
                    </label>

                    {formData.role == "" ?
                        <div className="w-full flex items-center justify-center p-3 rounded-lg border-2 border-purple-500 transition-colors">
                            <Users className="w-10 h-10 text-gray-400" />
                            <div className="ml-3 text-left">
                                <p className="text-xl font-semibold ">Users Show according to selected role</p>
                            </div>
                        </div>
                        :
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {users.map(user => (
                                <button
                                    key={user.id}
                                    onClick={() => handleUserToggle(user.id)}
                                    className={`flex items-center p-3 rounded-lg border ${selectedUsers.includes(user.id)
                                        ? 'border-purple-500 bg-purple-50'
                                        : 'border-gray-200 hover:border-purple-500'
                                        } transition-colors`}
                                >
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="ml-3 text-left">
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.role}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    }
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                    <Input text="Start Date" type="date" id="startDate" value={formData.startDate} handleChange={handleInputChange} />

                    <Input text="End Date" type="datetime-local" id="endDate" value={formData.endDate} handleChange={handleInputChange} />
                </div>

                <div className='h-[40vh]'>
                    <label htmlFor="description" className="block mb-1 text-lg pl-3 font-bold text-gray-700">
                        Description
                    </label>
                    <Editor id="description"  className='h-[70%]' value={formData.description} onTextChange={(e) => setFormData({ ...formData, description: e.htmlValue })}/>
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
                        className="sr-only"
                        onChange={handleFileChange}
                        accept="image/*,.pdf,.doc,.docx"
                    />

                    {/* File Preview */}
                    {files.length > 0 && (
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
                                        onClick={() => handleRemoveFile(index)}
                                        className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={16} className="text-gray-500" />
                                    </button>
                                    <p className="mt-1 text-xs text-gray-500 truncate">{file.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateProject;