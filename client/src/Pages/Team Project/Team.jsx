import React, { useState, useEffect } from 'react';
import { Calendar, Upload, Users, X, Clock, AlertCircle, FileText, Tag, ArrowDownToLine, Trash2 } from 'lucide-react';
import useTeamStore from '../../api/Store/useTeamStore';

function App() {
  const { getAllTeams, teams,deleteTeam } = useTeamStore();
  const [selectedProject, setSelectedProject] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    getAllTeams();
  }, [])

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams?.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-white rounded-md duration-200 cursor-pointer"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4 relative">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <p className={`py-1 px-2 rounded-md text-sm font-medium absolute top-0 right-0 ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: project.description }}></p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.members.slice(0, 3).map((member, index) => (
                    <div
                      key={index}
                      className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center border-2 border-white"
                    >
                      <span className="text-xs text-white font-medium">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ))}
                  {project.members.length > 3 && (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                      <span className="text-xs text-gray-600 font-medium">
                        +{project.members.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center text-gray-500">
                  <FileText className="h-4 w-4 mr-1" />
                  <span className="text-sm">{project.file.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Dialog */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md w-[90vw] h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b-2 border-gray-400 px-6 pt-2  flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
              <p className='font-semibold'><span className='text-purple-400'>Assigned By :</span> {selectedProject.assignedBy.name}</p>
              <div className='flex gap-4 items-center'>
                <button
                  onClick={() => {deleteTeam(selectedProject._id); setSelectedProject(null);}}
                  className="text-gray-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button><button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4 space-y-2">
              {/* Project Header */}
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-bold text-purple-400">{selectedProject.name}</h3>
                <p className={`px-3 py-1 rounded-md text-sm font-medium ${getPriorityColor(selectedProject.priority)}`}>
                  {selectedProject.priority} priority
                </p>
              </div>

              {/* Project Description */}
              <div className='text-lg' dangerouslySetInnerHTML={{ __html: selectedProject.description }}>
              </div>

              {/* Project Timeline */}
              <div className='flex items-center gap-2'>
                <h4 className="text-lg font-bold text-purple-400 flex items-center"><Calendar className="h-5 w-5 mr-1" />Timeline :</h4>
                <div className="flex items-center text-gray-600">

                  <span>{formatDate(selectedProject.startDate)} - {formatDate(selectedProject.endDate)}</span>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h4 className="text-lg font-bold text-purple-400 flex items-center underline mb-2 underline-offset-4">Team Members</h4>
                <div className="grid grid-cols-3 gap-2 bg-gray-300 p-2 rounded-lg">
                  {selectedProject.members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                      <div className="flex items-center gap-3">
                        <img src={member?.image} alt={member.name} className="h-8 w-8 rounded-md" />
                        <div>
                          <p className="text-[1rem] capitalize">{member?.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{member?.email}</p>
                        </div>
                      </div>
                      <span className="text-sm px-2 py-1 rounded-md bg-gray-200 text-gray-700">
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attached Files */}
              <div>
                <h4 className="text-lg font-bold text-purple-400 flex items-center underline mb-2 underline-offset-4">Attached Files</h4>
                <div className="space-y-2 bg-gray-300 p-2 rounded-lg">
                  {selectedProject.file.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-purple-400" />
                        <span className="text-sm text-gray-600">{file}</span>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        <ArrowDownToLine />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}</>

  );
}

export default App;