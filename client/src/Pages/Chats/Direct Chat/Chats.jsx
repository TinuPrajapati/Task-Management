import React, { useState } from 'react';
import { Search, User, X, Send, MessageCircle } from 'lucide-react';
import ChatOption from './ChatOption';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../api/axiosInstance';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');

    const { data, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers
    })

    const roles = [...new Set(data?.map(emp => emp.role))];

    const filteredEmployees = data?.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRole === 'all' || emp.role === selectedRole)
    );

    const handleOpenChat = (employee) => {
        setSelectedUser(employee);
        setIsDialogOpen(true);
    };

    return (
        <div className="min-h-screen">
            <div className="flex gap-4 mb-6 bg-white p-2 rounded-lg h-14">
                <div className="flex-1 relative w-[70%]">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full h-[100%] pl-10 pr-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-none outline-none"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="block h-[100%] px-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-none outline-none"
                >
                    <option value="all">All Roles</option>
                    {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredEmployees?.map((employee) => (
                    <div
                        key={employee.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white/70 hover:bg-white"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <img
                                    src={employee.image}
                                    alt={employee.name}
                                    className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${employee.online ? 'bg-green-500' : 'bg-gray-400'
                                    }`} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                                <p className="text-sm text-gray-500">{employee.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleOpenChat(employee)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Chat Dialog */}
            {isDialogOpen && (
                <ChatOption setIsDialogOpen={setIsDialogOpen} selectedUser={selectedUser} />
            )}
        </div>
    );
}

export default App;