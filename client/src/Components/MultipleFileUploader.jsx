import React,{useState} from 'react'
import { X,Upload,FileText } from 'lucide-react';

const MultipleFileUploader = ({  setFormData }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
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
    return (
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
                                    className="h-24 w-full object-fit rounded-t-md"
                                />
                            ) : (
                                <div className="h-24 w-full flex items-center justify-center bg-gray-100 rounded-t-md">
                                    <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                            )}
                            <button
                                onClick={(e) => handleRemoveFile(e, index)}
                                className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} className="text-gray-500" />
                            </button>
                            <p className="py-1 text-sm text-center font-bold bg-purple-400 text-white rounded-b-md">{item.file.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MultipleFileUploader