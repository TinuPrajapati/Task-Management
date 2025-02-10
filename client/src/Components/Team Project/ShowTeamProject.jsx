import React, { useState } from 'react';
import { 
  PlusCircle, 
  Users, 
  Star,
  Calendar,
  Bell,
  MoreVertical,
  Filter,
  Search
} from 'lucide-react';


function App() {
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    priority: 'Medium',
    status: 'Pending',
    teamMembers: [],
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (newProject.name && newProject.description) {
      const project = {
        id: Date.now(),
        name: newProject.name,
        description: newProject.description,
        priority: newProject.priority || 'Medium',
        startDate: newProject.startDate || new Date().toISOString().split('T')[0],
        endDate: newProject.endDate || new Date().toISOString().split('T')[0],
        status: newProject.status || 'Pending',
        teamMembers: newProject.teamMembers || [],
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
      };
      setProjects([...projects, project]);
      setShowCreateModal(false);
      setNewProject({
        priority: 'Medium',
        status: 'Pending',
        teamMembers: [],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8 pt-8">
          <div className="flex items-center">
            <Users className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Team Projects</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-500" />
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Project
            </button>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button className="ml-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              No projects yet. Create your first project to get started!
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                      <Star className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Start: {project.startDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>End: {project.endDate}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {project.teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium"
                      >
                        {member.charAt(0)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    Created by {project.createdBy}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={newProject.name || ''}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newProject.description || ''}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter project description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newProject.startDate || ''}
                      onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newProject.endDate || ''}
                      onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;