import React, { useEffect, useState } from 'react';
import {  Search } from 'lucide-react';
import ShowProject from './ShowAssignedProject';
import useProjectStore from '../../api/Store/useProjectStore';

function AssignedProject() {
    const {allProjects,getProjects} = useProjectStore();
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

    const filteredProjects = allProjects.filter(project => {
        const statusMatch = filterStatus === 'all' || project.status === filterStatus;
        const priorityMatch = filterPriority === 'all' || project.priority === filterPriority;
        return statusMatch && priorityMatch;
    });

    useEffect(() => {    
        getProjects();
    }, []);

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

export default AssignedProject;