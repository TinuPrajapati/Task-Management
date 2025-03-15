import React, { useState } from 'react'
import {
    Calendar,
    ChevronRight,
    Target,
    User
} from 'lucide-react';
import ProjectDialog from './ProjectDialog';

const ShowProject = ({ filteredProjects }) => {
    const [display, setDisplay] = useState({
        show: false,
        data: {}
    })
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'delayed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-blue-400 text-white';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'text-red-600';
            case 'medium':
                return 'text-yellow-600';
            default:
                return 'text-green-600';
        }
    };


    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-4">

                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm ${getStatusColor(project.status)}`}>
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </span>
                        </div>

                        {/* <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p> */}

                        <div className="space-y-3">
                            <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{new Date(project.startDate).toLocaleDateString("en-GB")} - {new Date(project.endDate).toLocaleDateString("en-GB")}</span>
                            </div>

                            <div className="flex items-center text-sm">
                                <Target className={`h-4 w-4 mr-2 ${getPriorityColor(project.priority)}`} />
                                <span className={`capitalize ${getPriorityColor(project.priority)}`}>{project.priority} Priority</span>
                            </div>



                            <div className="flex items-center gap-2">
                                <User className='size-4' />
                                <p className='text-purple-400 font-semibold'>Assigned To : </p>
                                <p>{project.assignedTo}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setDisplay({ show: true, data: project })}
                            className="w-full flex items-center justify-end text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                ))}
            </div>
            <ProjectDialog display={display} getPriorityColor={getPriorityColor} setDisplay={setDisplay}/>
        </>
    )
}

export default ShowProject