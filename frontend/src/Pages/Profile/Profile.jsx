import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Clock,
  BarChart,
  Users,
  Flag,
  BarChart3,
  CheckCircle2,
  XCircle,
  User
} from 'lucide-react';

function Profile() {
  const employee = {
    name: 'Sarah Chen',
    role: 'Senior Marketing Manager',
    department: 'Marketing',
    email: 'sarah.chen@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'March 2022',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    skills: ['Digital Marketing', 'Project Management', 'Team Leadership', 'Content Strategy', 'Data Analytics'],
    performance: {
      tasksCompleted: 45,
      tasksInProgress: 8,
      projectsLed: 12,
      teamSize: 6
    },
    recentTasks: [
      {
        id: 1,
        title: 'Q1 Marketing Strategy Review',
        dueDate: '2025-03-15',
        status: 'in-progress',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Social Media Campaign Launch',
        dueDate: '2025-03-10',
        status: 'completed',
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Team Performance Reviews',
        dueDate: '2025-03-05',
        status: 'overdue',
        priority: 'high'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  return (
    <div className="min-h-screen py-2">
      {/* Profile Header */}

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center">
            <img
              className="object-cover w-24 h-24 rounded-full"
              src={employee.avatar}
              alt={employee.name}
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
              <p className="text-lg text-gray-600">{employee.role}</p>
              <div className="flex items-center mt-2 text-gray-500">
                <Briefcase className="w-5 h-5 mr-2" />
                {employee.department}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
            <div className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-2" />
              {employee.email}
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-2" />
              {employee.phone}
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              {employee.location}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-4 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-8 lg:col-span-2">
          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Performance Overview</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="p-4 rounded-lg bg-indigo-50">
                  <div className="flex items-center justify-center w-8 h-8 mb-2 bg-indigo-100 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">{employee.performance.tasksCompleted}</div>
                  <div className="text-sm text-gray-600">Tasks Completed</div>
                </div>
                <div className="p-4 rounded-lg bg-blue-50">
                  <div className="flex items-center justify-center w-8 h-8 mb-2 bg-blue-100 rounded-full">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{employee.performance.tasksInProgress}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="p-4 rounded-lg bg-purple-50">
                  <div className="flex items-center justify-center w-8 h-8 mb-2 bg-purple-100 rounded-full">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{employee.performance.projectsLed}</div>
                  <div className="text-sm text-gray-600">Projects Led</div>
                </div>
                <div className="p-4 rounded-lg bg-green-50">
                  <div className="flex items-center justify-center w-8 h-8 mb-2 bg-green-100 rounded-full">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">{employee.performance.teamSize}</div>
                  <div className="text-sm text-gray-600">Team Members</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Tasks</h2>
              <div className="space-y-4">
                {employee.recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status === 'completed' ? <CheckCircle2 className="w-4 h-4 mr-1" /> :
                            task.status === 'overdue' ? <XCircle className="w-4 h-4 mr-1" /> :
                              <Clock className="w-4 h-4 mr-1" />}
                          {task.status}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          <Flag className="w-4 h-4 mr-1" />
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {task.dueDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Skills */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    <Award className="w-4 h-4 mr-1" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Employment Info */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Employment Information</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Join Date</p>
                    <p className="text-sm">{employee.joinDate}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Department</p>
                    <p className="text-sm">{employee.department}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <BarChart className="w-5 h-5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Status</p>
                    <p className="text-sm">Full-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Profile;