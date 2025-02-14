import React, { useState } from 'react';
import {  Search } from 'lucide-react';
import ShowProject from './ShowProject';

function Project() {
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

   

    const filteredProjects = projects.filter(project => {
        const statusMatch = filterStatus === 'all' || project.status === filterStatus;
        const priorityMatch = filterPriority === 'all' || project.priority === filterPriority;
        return statusMatch && priorityMatch;
    });

    return (
        <div className="min-h-[60vh] py-3 w-full">

            <div className="mb-4 h-12 flex justify-center gap-4 items-center w-full">
                <div className="relative h-full w-[60%]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 h-full border-2 border-purple-400 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-none"
                        placeholder="Search by Project name"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex space-x-4 h-full w-[40%]">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className=" rounded-md bg-white border-purple-400 border-2 py-2 pl-2 pr-10 text-base focus:ring-2 outline-none focus:ring-purple-500 focus:border-none"
                    >
                        <option value="all">All Status</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="delayed">Delayed</option>
                    </select>
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className=" rounded-md bg-white border-purple-400 border-2 py-2 pl-2 pr-10 text-base focus:ring-2 outline-none focus:ring-purple-500 focus:border-none"
                    >
                        <option value="all">All Priorities</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>
                </div>
            </div>

           <ShowProject filteredProjects={filteredProjects} />
        </div>
    );
}

export default Project;