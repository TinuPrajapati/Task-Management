import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  User,
  Search,
  Filter
} from 'lucide-react';

function AllUsers() {
  const employees = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Marketing Manager',
      department: 'Marketing',
      email: 'sarah.chen@company.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      joinDate: 'March 2022',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
      skills: ['Digital Marketing', 'Project Management', 'Team Leadership'],
      performance: {
        tasksCompleted: 45,
        tasksInProgress: 8,
        projectsLed: 12,
        teamSize: 6
      }
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Lead Developer',
      department: 'Engineering',
      email: 'michael.r@company.com',
      phone: '+1 (555) 234-5678',
      location: 'Austin, TX',
      joinDate: 'June 2021',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
      skills: ['Full Stack', 'Cloud Architecture', 'Agile'],
      performance: {
        tasksCompleted: 67,
        tasksInProgress: 5,
        projectsLed: 8,
        teamSize: 4
      }
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Product Designer',
      department: 'Design',
      email: 'emily.w@company.com',
      phone: '+1 (555) 345-6789',
      location: 'New York, NY',
      joinDate: 'January 2023',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
      skills: ['UI/UX', 'Design Systems', 'User Research'],
      performance: {
        tasksCompleted: 34,
        tasksInProgress: 6,
        projectsLed: 5,
        teamSize: 3
      }
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = ['All', ...new Set(employees.map(emp => emp.department))];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen py-10 px-8">
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <Link className="text-3xl font-semibold">
          All Users
        </Link>
        <div className="flex gap-4">
          <Link
            // to={/${name}/create_user}
            className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90"
          >
            Create New User
          </Link>
        </div>
      </div>


      {/* Filters */}
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={employee.avatar}
                  alt={employee.name}
                />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">{employee.name}</h2>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-5 w-5 mr-2" />
                  <span>{employee.department}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{employee.location}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Performance</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                      <span className="ml-2 text-sm text-gray-600">Tasks</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold text-indigo-600">
                      {employee.performance.tasksCompleted}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span className="ml-2 text-sm text-gray-600">Team</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold text-purple-600">
                      {employee.performance.teamSize}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUsers;