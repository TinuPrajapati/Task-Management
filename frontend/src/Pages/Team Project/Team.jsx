import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ShowTeamProject from './ShowTeamProject';
import { Bell, Filter, PlusCircle, Search, Users } from 'lucide-react';

const Team = () => {
    const [projects, setProjects] = useState([]);
    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-between w-full h-16">
                <div className="flex items-center">
                    <Users className="w-10 h-10 mr-3 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800">Team Projects</h1>
                </div>
                <Link
                    to="/create_team_project"
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
                >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Create Project
                </Link>
            </div>

            <div className="flex items-center justify-between w-full p-3 mb-2 bg-white rounded-md">
                <div className="relative w-[70%]">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full py-2 pl-10 pr-4 border-2 rounded-lg border-black/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    />
                    <Search className="w-5 h-5 text-purple-400 absolute left-3 top-2.5 font-semibold" />
                </div>
                <button className="w-[15%] border-2 py-1.5 rounded-lg border-black/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent flex items-center justify-center text-lg">
                    <Filter className="w-5 h-5 mr-2" />
                    Filter
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {projects.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 bg-white border border-gray-200 shadow-sm rounded-xl">
                        No projects yet. Create your first project to get started!
                    </div>
                ) : (
                    projects.map((project) => (
                        <ShowTeamProject key={project.id} project={project} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Team