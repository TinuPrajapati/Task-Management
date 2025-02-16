import React, { useState } from 'react';
import { Calendar, Upload, Users, X, Clock, AlertCircle, FileText, Tag } from 'lucide-react';

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

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Team Projects</h1>
          
          {/* Projects List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="px-6 py-4 space-y-6">
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedProject.priority)}`}>
                        {selectedProject.priority} priority
                      </span>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedProject.description}</p>
                  </div>

                  {/* Project Timeline */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Timeline</h4>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                      <span>{formatDate(selectedProject.startDate)} - {formatDate(selectedProject.endDate)}</span>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Team Members</h4>
                    <div className="space-y-2">
                      {selectedProject.teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                              <span className="text-sm text-white font-medium">
                                {member.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{member.email}</p>
                              <p className="text-xs text-gray-500 capitalize">{member.role}</p>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                            {member.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attached Files */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Attached Files</h4>
                    <div className="space-y-2">
                      {selectedProject.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <span className="text-sm text-gray-600">{file}</span>
                          </div>
                          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;