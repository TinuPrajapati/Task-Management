import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Target,
  Filter,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

function App() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Complete overhaul of company website with modern UI/UX",
      startDate: "2025-02-01",
      endDate: "2025-04-30",
      priority: "high",
      progress: 75,
      status: "ongoing",
      team: [
        {
          id: 1,
          name: "Sarah Chen",
          role: "Lead Designer",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
        },
        {
          id: 2,
          name: "Michael Rodriguez",
          role: "Developer",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
        }
      ],
      milestones: [
        { title: "Design System", dueDate: "2025-02-15", completed: true },
        { title: "Frontend Development", dueDate: "2025-03-30", completed: false }
      ]
    },
    {
      id: 2,
      name: "Mobile App Launch",
      description: "Development and launch of company mobile application",
      startDate: "2025-03-01",
      endDate: "2025-06-30",
      priority: "medium",
      progress: 30,
      status: "ongoing",
      team: [
        {
          id: 3,
          name: "Emily Watson",
          role: "Product Manager",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
        }
      ],
      milestones: [
        { title: "MVP Development", dueDate: "2025-04-15", completed: false },
        { title: "Beta Testing", dueDate: "2025-05-30", completed: false }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
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

  const filteredProjects = projects.filter(project => {
    const statusMatch = filterStatus === 'all' || project.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || project.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="min-h-screen py-10 px-10">
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <Link className="text-3xl font-semibold">
          Projects Overview
        </Link>
        <div className="flex gap-4">
          <Link
            className="bg-sky-400 px-3 py-1 text-xl rounded-md text-white active:scale-90"
          >
            Create New Project
          </Link>
        </div>
      </div>
      <div className="mb-8 h-12 flex justify-center gap-4 items-center">
        <div className="relative h-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-[50vw] pl-10 pr-3 py-2 h-full border-2 border-sky-400 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search by Project name"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-4 h-full">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border-sky-400 border-2 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="rounded-md border-sky-400 border-2 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center text-sm">
                  <Target className={`h-4 w-4 mr-2 ${getPriorityColor(project.priority)}`} />
                  <span className={`capitalize ${getPriorityColor(project.priority)}`}>{project.priority} Priority</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.team.map((member) => (
                      <img
                        key={member.id}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        src={member.avatar}
                        alt={member.name}
                        title={member.name}
                      />
                    ))}
                    {project.team.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>

                  <button className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Milestones</h3>
              <div className="space-y-2">
                {project.milestones.slice(0, 2).map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      {milestone.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <Clock3 className="h-4 w-4 text-gray-400 mr-2" />
                      )}
                      <span className={milestone.completed ? 'text-gray-500 line-through' : 'text-gray-700'}>
                        {milestone.title}
                      </span>
                    </div>
                    <span className="text-gray-500">{new Date(milestone.dueDate).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;