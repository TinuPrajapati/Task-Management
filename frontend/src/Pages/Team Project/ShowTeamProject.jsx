import React, { useState } from 'react';
import { Star, Calendar, MoreVertical } from 'lucide-react';


function App({ project }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      key={project.id}
      className="p-6 transition-shadow duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center mb-2 space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(project.priority)}`}>
              {project.priority}
            </span>
            <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
          </div>
          <p className="mb-4 text-gray-600">{project.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 rounded-lg hover:bg-gray-50">
            <Star className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 rounded-lg hover:bg-gray-50">
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
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-8 h-8 text-xs font-medium bg-gray-200 border-2 border-white rounded-full"
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
  );
}

export default App;