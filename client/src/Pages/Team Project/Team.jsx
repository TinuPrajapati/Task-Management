import React, { useState } from 'react';
import { Calendar, Upload, Users, X, Clock, AlertCircle, FileText, Tag, ArrowDownToLine } from 'lucide-react';

function App() {
  // Mock data for demonstration
  const [projects] = useState([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design principles and improved user experience. Including new features such as dark mode, responsive design, and improved accessibility.',
      priority: 'high',
      startDate: '2024-03-01',
      endDate: '2024-04-15',
      teamMembers: [
        { email: 'sarah@example.com', role: 'admin' },
        { email: 'john@example.com', role: 'member' },
        { email: 'mike@example.com', role: 'viewer' }
      ],
      files: ['design-specs.pdf', 'wireframes.fig']
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Develop a new mobile application for both iOS and Android platforms using React Native. Focus on performance and offline capabilities.',
      priority: 'medium',
      startDate: '2024-03-15',
      endDate: '2024-05-30',
      teamMembers: [
        { email: 'alex@example.com', role: 'admin' },
        { email: 'emma@example.com', role: 'member' }
      ],
      files: ['app-requirements.pdf']
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
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

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-white rounded-lg duration-200 cursor-pointer"
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4 relative">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <p className={`py-1 px-2 rounded-md text-sm font-medium absolute top-0 right-0 ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.teamMembers.slice(0, 3).map((member, index) => (
                    <div
                      key={index}
                      className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center border-2 border-white"
                    >
                      <span className="text-xs text-white font-medium">
                        {member.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ))}
                  {project.teamMembers.length > 3 && (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                      <span className="text-xs text-gray-600 font-medium">
                        +{project.teamMembers.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center text-gray-500">
                  <FileText className="h-4 w-4 mr-1" />
                  <span className="text-sm">{project.files.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Dialog */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
              <p className='font-semibold'><span className='text-purple-400 underline'>Assigned By</span>: HR</p>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
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
              <div>
                <h4 className="text-lg font-bold text-purple-400">Description :</h4>
                <p className="text-gray-500 text-[1rem]">{selectedProject.description}</p>
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
                <div className="grid grid-cols-2 gap-2 bg-gray-300 p-2 rounded-lg">
                  {selectedProject.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-indigo-500 flex items-center justify-center">
                          <span className="text-sm text-white font-medium">
                            {member.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-[1rem] capitalize">Name</p>
                          <p className="text-xs text-gray-500 capitalize">{member.email}</p>
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
                  {selectedProject.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-purple-400" />
                        <span className="text-sm text-gray-600">{file}</span>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                       <ArrowDownToLine/>
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