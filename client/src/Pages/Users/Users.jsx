import React, {useEffect, useState } from 'react';
import ShowUser from './ShowUser';
import useAuthStore from '../../api/Store/useAuthStore.js';
import Admin from '../../assets/admin.jpg';
import HR from '../../assets/HR.png';
import Manager from '../../assets/manager.jpg';
import Web from '../../assets/Web.png';
import Ui from '../../assets/ui.jpg';
import Graphic from '../../assets/graphic.jpg';
import Andorid from '../../assets/android.jpg';

function App() {
    const [selectedUser, setSelectedUser] = useState(null);
    const { users, getUsers } = useAuthStore();
    const backgroundImages = {
        "Admin":Admin, 
        "HR":HR, 
        "Manager":Manager, 
        "Web Developer":Web, 
        "Android Developer":Andorid, 
        "IOS Developer":"", 
        "Graphic Designer":Graphic, 
        "UI/UX Designer":Ui
    };

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users?.map((user) => (
                    <div
                        key={user.id}
                        className="w-full bg-white rounded-md cursor-pointer h-[45vh]"
                        onClick={() => setSelectedUser(user)}
                    >
                        <img
                            src={backgroundImages[user.role] || "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                            alt="HR Banner"
                            className="w-full h-[40%] rounded-t-md"
                        />
                        <div className="px-3 py-2 h-[60%] flex flex-col gap-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={user?.image}
                                    alt={user?.name}
                                    className="size-14 rounded-md"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{user?.name}</h3>
                                    <p className="text-gray-600">{user?.role}</p>
                                </div>
                            </div>

                            <div className=" grid grid-cols-2 gap-4">
                                <div className="border-2 border-purple-600 py-2 px-4 rounded-md flex items-center justify-between">
                                    <p className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Tasks</p>
                                    <p className="text-xl font-semibold">{user.tasksCompleted ? user.tasksCompleted : 0}</p>
                                </div>
                                <div className="border-2 border-purple-600 py-2 px-4 rounded-md flex items-center justify-between">
                                    <p className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Team</p>
                                    <p className="text-xl font-semibold">{user.teamSize ? user.teamSize : 0}</p>
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