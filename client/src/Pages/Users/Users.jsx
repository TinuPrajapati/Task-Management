import React, { use, useEffect, useState } from 'react';
import ShowUser from './ShowUser';
import useAuthStore from '../../Store/useAuthStore';

function App() {
    const [selectedUser, setSelectedUser] = useState(null);
    const {users,getUsers} = useAuthStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users?.map((user) => (
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
                                    src={user?.image}
                                    alt={user?.name}
                                    className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
                                    <p className="text-gray-600">{user?.role}</p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="bg-purple-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Tasks</p>
                                    <p className="text-xl font-semibold text-purple-600">{user.tasksCompleted?user.tasksCompleted:0}</p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Team</p>
                                    <p className="text-xl font-semibold text-purple-600">{user.teamSize?user.teamSize:0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedUser && (
                <ShowUser selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            )}
        </div>
    );
}

export default App;