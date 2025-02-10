import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import ShowUser from './ShowUser';

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
        <div className="min-h-screen py-2">
            {/* Filters */}
            <div className="p-6 mb-4 bg-white rounded-lg shadow">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Search by name or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Filter className="w-5 h-5 text-gray-400" />
                        </div>
                        <select
                            className="block w-full py-2 pl-10 pr-3 leading-5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

            <div className="w-[100%] rounded-md flex items-center justify-between mb-4">
                <h2 className="text-3xl font-semibold">
                    All Users
                </h2>
                <div className="flex gap-4">
                    <Link
                        to="/create_user"
                        className="px-3 py-2 text-xl text-white bg-purple-400 rounded-md active:scale-90"
                    >
                        Create New User
                    </Link>
                </div>
            </div>
            {/* Employee Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredEmployees.map((employee) => (
                    <ShowUser employee={employee} />
                ))}
            </div>
        </div>
    );
}

export default AllUsers;