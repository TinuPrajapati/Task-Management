import React, { useState } from 'react';
import {
    X,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
} from 'lucide-react';

const users = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Senior Marketing Manager",
        email: "sarah.chen@company.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        joinDate: "March 2021",
        department: "Marketing",
        tasksCompleted: 45,
        teamSize: 6,
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        bio: "Marketing professional with 8+ years of experience in digital marketing and team leadership.",
        skills: ["Digital Marketing", "Team Leadership", "Content Strategy", "Analytics"]
    },
    {
        id: 2,
        name: "Michael Rodriguez",
        role: "Lead Developer",
        email: "michael.r@company.com",
        phone: "+1 (555) 234-5678",
        location: "Austin, TX",
        joinDate: "January 2020",
        department: "Engineering",
        tasksCompleted: 67,
        teamSize: 4,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        bio: "Full-stack developer with a passion for building scalable applications and mentoring junior developers.",
        skills: ["React", "Node.js", "AWS", "System Architecture"]
    },
    {
        id: 3,
        name: "Emily Watson",
        role: "Product Designer",
        email: "emily.w@company.com",
        phone: "+1 (555) 345-6789",
        location: "Seattle, WA",
        joinDate: "June 2022",
        department: "Design",
        tasksCompleted: 34,
        teamSize: 3,
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        bio: "UX/UI designer focused on creating intuitive and accessible user experiences.",
        skills: ["UI Design", "User Research", "Prototyping", "Figma"]
    }
];

function App() {
    const [selectedUser, setSelectedUser] = useState(null);


    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="w-full bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => setSelectedUser(user)}
                    >
                        <div className="h-32 bg-purple-50">
                            <img
                                src="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="HR Banner"
                                className="w-full h-full object-cover opacity-50"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={user.imageUrl}
                                    alt={user.name}
                                    className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                                    <p className="text-gray-600">{user.role}</p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="bg-purple-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Tasks</p>
                                    <p className="text-xl font-semibold text-purple-600">{user.tasksCompleted}</p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Team</p>
                                    <p className="text-xl font-semibold text-purple-600">{user.teamSize}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedUser && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="relative">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <img
                                        src={selectedUser.imageUrl}
                                        alt={selectedUser.name}
                                        className="w-20 h-20 rounded-full border-2 border-purple-200"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h3>
                                        <p className="text-purple-600 font-medium">{selectedUser.role}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div className="flex items-center space-x-3">
                                        <Mail className="text-gray-400" size={20} />
                                        <span className="text-gray-600">{selectedUser.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Phone className="text-gray-400" size={20} />
                                        <span className="text-gray-600">{selectedUser.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="text-gray-400" size={20} />
                                        <span className="text-gray-600">{selectedUser.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="text-gray-400" size={20} />
                                        <span className="text-gray-600">Joined {selectedUser.joinDate}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Briefcase className="text-gray-400" size={20} />
                                        <span className="text-gray-600">{selectedUser.department}</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">About</h4>
                                    <p className="text-gray-600">{selectedUser.bio}</p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedUser.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Completed Tasks</p>
                                        <p className="text-2xl font-semibold text-purple-600">
                                            {selectedUser.tasksCompleted}
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Team Members</p>
                                        <p className="text-2xl font-semibold text-purple-600">
                                            {selectedUser.teamSize}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;