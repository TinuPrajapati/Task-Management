import React, { useState } from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { Editor } from 'primereact/editor';
import Input from '../../Components/Input';
import Select from '../../Components/Select';
import useAuthStore from '../../api/Store/useAuthStore.js';
import useProjectStore from '../../api/Store/useProjectStore';
import { useNavigate } from 'react-router-dom';

function CreateProject() {
    const { roleUser, getRoleByUsers } = useAuthStore();
    const { createProject } = useProjectStore();
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        priority: "Medium",
        role: "",
        assignedTo: "",
        startDate: "",
        endDate: "",
        file: []
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "role") getRoleByUsers(value);
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        // Create an array of file objects with preview URLs for images
        const newFiles = selectedFiles.map(file => ({
            file,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
        }));
        // Update the state with the new files
        setUploadedFiles(prev => [...prev, ...newFiles]);
        // Also update formData (if needed elsewhere)
        setFormData(prev => ({ ...prev, file: [...prev.file, ...selectedFiles] }));
    };

    const handleRemoveFile = (e, index) => {
        e.preventDefault();
        const fileToRemove = uploadedFiles[index];
        if (fileToRemove.preview) {
            URL.revokeObjectURL(fileToRemove.preview);
        }
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        createProject(formData,navigate);
    };

    return (
        <div className="w-full bg-white rounded-lg px-4 pt-2 pb-3 ">
            {/* Basic Information */}
            <form className="space-y-3" onSubmit={handleSubmit}>
                <Input
                    text="Project Name"
                    type="text"
                    id="name"
                    value={formData.name}
                    handleChange={handleInputChange}
                    placeholder="Enter Project Name"
                />

                {/* Priority and Role */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <Select
                        text="Priority"
                        id="priority"
                        options={["Low", "Medium", "High", "Urgent"]}
                        value={formData.priority}
                        handleChange={handleInputChange}
                    />
                    <Select
                        text="Role"
                        id="role"
                        options={["Choose Role", "Admin", "HR", "Manager", "Web Developer", "Android Developer", "IOS Developer", "Ui/Ux Designer", "Graphic Designer", "EveryOne"]}
                        value={formData.role}
                        handleChange={handleInputChange}
                    />

                    <div className="h-[12vh]">
                        <label htmlFor="assignedTo" className="block mb-1 text-lg pl-3 font-bold text-gray-700">
                            User List
                        </label>
                        <div className="relative flex items-center h-[60%]">
                            <select
                                id="assignedTo"
                                value={formData.assignedTo}
                                className="block w-full h-full pl-10 pr-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 focus:border-none outline-none focus:duration-200"
                                onChange={handleInputChange}
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
                    </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Input
                        text="Start Date"
                        type="date"
                        id="startDate"
                        value={formData.startDate}
                        handleChange={handleInputChange}
                    />
                    <Input
                        text="End Date"
                        type="datetime-local"
                        id="endDate"
                        value={formData.endDate}
                        handleChange={handleInputChange}
                    />
                </div>

                <div className='h-[40vh]'>
                    <label htmlFor="description" className="block mb-1 text-lg pl-3 font-bold text-gray-700">
                        Description
                    </label>
                    <Editor
                        id="description"
                        className='h-[70%]'
                        value={formData.description}
                        onTextChange={(e) => setFormData({ ...formData, description: e.htmlValue })}
                    />
                </div>

                {/* File Upload */}
                <div className='w-full'>
                    <p className="block mb-1 text-lg pl-3 font-bold text-gray-700">Attachments</p>
                    <label
                        htmlFor="file-upload"
                        className="mt-1 flex flex-col justify-center items-center gap-2 px-6 py-4 border-2 border-gray-300 border-dashed rounded-lg"
                    >
                        <Upload className="size-8 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                            <p className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500">
                                <span>Upload files</span>
                            </p>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*,.pdf,.doc,.docx"
                    />

                    {uploadedFiles.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {uploadedFiles.map((item, index) => (
                                <div key={index} className="relative group">
                                    {item.file.type.startsWith('image/') ? (
                                        <img
                                            src={item.preview}
                                            alt={item.file.name}
                                            className="h-24 w-full object-fit rounded-md"
                                        />
                                    ) : (
                                        <div className="h-24 w-full flex items-center justify-center bg-gray-100 rounded-lg">
                                            <FileText className="h-8 w-8 text-gray-400" />
                                        </div>
                                    )}
                                    <button
                                        onClick={(e) => handleRemoveFile(e, index)}
                                        className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={16} className="text-gray-500" />
                                    </button>
                                    <p className="mt-1 text-xs text-gray-500 truncate">{item.file.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-1 flex justify-center w-full">
                    <button
                        type="submit"
                        className="w-[30%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 active:scale-90"
                    >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateProject;
