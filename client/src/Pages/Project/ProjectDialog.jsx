import { Pencil, Trash2, X, Target, Calendar } from 'lucide-react';
import React from 'react';
import useProjectStore from '../../api/Store/useProjectStore';

const ProjectDialog = ({ display, getPriorityColor, setDisplay }) => {
    const {deleteProject} = useProjectStore();
    return (
        <div
            className={`absolute w-[100vw] h-[100vh] top-0 left-0 bg-black/20 ${display.show ? 'flex' : 'hidden'
                } justify-center items-center`}
        >
            <div className='w-[80%] min-h-[80vh] bg-white rounded-lg p-4 relative'>
                <div className='w-full h-[5vh] flex justify-end items-center gap-5 mb-2'>
                    <button>
                        <Pencil className='size-5 text-gray-400 hover:text-purple-400 duration-200' />
                    </button>
                    <button onClick={() => deleteProject(display.data?._id,setDisplay)}>
                        <Trash2 className='size-5 text-gray-400 hover:text-red-400 duration-200' />
                    </button>
                    <button onClick={() => setDisplay((prev) => ({ ...prev, show: false }))}>
                        <X className='size-5 text-gray-400 hover:text-black hover:scale-110 duration-200' />
                    </button>
                </div>
                <div className='w-full h-[7vh] border-b-2 border-purple-400 py-2 flex items-center justify-between mb-4'>
                    <div className='flex items-center text-lg'>
                        <Target className={`h-4 w-4 mr-2 ${getPriorityColor(display.data?.priority)}`} />
                        <span className={`capitalize ${getPriorityColor(display.data?.priority)}`}>
                            {display.data?.priority} Priority
                        </span>
                    </div>

                    <div className='flex items-center text-lg gap-2'>
                        <h3 className='text-purple-400 font-semibold'>Status :</h3>
                        <p>{display.data?.status}</p>
                    </div>
                    <div className='flex items-center text-lg gap-2'>
                        <h3 className='text-purple-400 font-semibold'>Role :</h3>
                        <p>{display.data?.category}</p>
                    </div>
                    <div className='flex items-center text-lg gap-2'>
                        <h3 className='text-purple-400 font-semibold'>Assigned To :</h3>
                        <p>{display.data?.assignedTo}</p>
                    </div>
                </div>

                <h1 className='pl-4 text-3xl font-bold mb-2'>{display.data?.name}</h1>
                <p className='pl-2 text-xl mb-4' dangerouslySetInnerHTML={{ __html: display.data?.description }} ></p>

                {/* Files Section */}
                <div className="files-section mt-4 flex flex-wrap gap-4">
                    {display.data?.file &&
                        display.data?.file.map((file, index) => {
                            // Get the file extension to determine the file type.
                            const extension = file.split('.').pop().toLowerCase();
                            if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
                                return (
                                    <div key={index} className="file-item">
                                        <img src={file} alt={`Uploaded file ${index}`} className="w-32 h-32 object-cover rounded" />
                                    </div>
                                );
                            } else if (extension === "pdf") {
                                return (
                                    <div key={index} className="file-item">
                                        <a
                                            href={file}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            Download PDF
                                        </a>
                                    </div>
                                );
                            } else {
                                // For any other file types, you can provide a generic download option.
                                return (
                                    <div key={index} className="file-item">
                                        <a
                                            href={file}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            Download File
                                        </a>
                                    </div>
                                );
                            }
                        })}
                </div>

                <div className='w-[96%] absolute bottom-4 text-lg flex gap-2 justify-between items-center'>
                    <div className='flex items-center text-xl gap-2 text-gray-500'>
                        <Calendar className='h-5 w-5 text-purple-400' />
                        <h3 className='text-purple-400 font-semibold'>Project Complete Deadline :</h3>
                        <span className='text-lg font-semibold'>
                            {new Date(display.data?.startDate).toLocaleDateString('en-GB')} -{' '}
                            {new Date(display.data?.endDate).toLocaleDateString('en-GB')}
                        </span>
                    </div>
                    <div className='flex items-center text-lg gap-2'>
                        <h3 className='text-purple-400 font-bold'>Assigned By :</h3>
                        <p className='font-semibold'>
                            {display.data?.assignedBy?.name}{' '}
                            <span>({display.data?.assignedBy?.role})</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDialog;
