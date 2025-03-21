import React from 'react';
import {
    X,
    Mail,
    Phone,
    MapPin,
    Calendar,
} from 'lucide-react';

const ShowUser = ({ selectedUser, setSelectedUser }) => {
    if (!selectedUser) return null;

    return (
        <div className="absolute top-0 left-0 z-50 w-[100vw] h-[100vh] bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-[70%] h-[90%] overflow-y-auto relative p-4">
                <button
                    onClick={() => setSelectedUser(null)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                <div className="flex items-center space-x-4 mb-4">
                    <img
                        src={selectedUser?.image || '/default-avatar.png'}
                        alt={selectedUser?.name || 'User Avatar'}
                        className="w-20 h-20 rounded-lg border-2 border-purple-200"
                    />
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{selectedUser?.name || 'Unknown'}</h3>
                        <p className="text-purple-600 font-medium">{selectedUser?.role || 'No Role'}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 bg-purple-200 p-2 rounded-lg">
                    <div className="flex items-center space-x-3 bg-white p-2 rounded-lg">
                        <Mail className="text-purple-600" size={20} />
                        <span className="text-gray-600">{selectedUser?.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white p-2 rounded-lg">
                        <Phone className="text-purple-600" size={20} />
                        <span className="text-gray-600">{selectedUser?.number || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white p-2 rounded-lg">
                        <MapPin className="text-purple-600" size={20} />
                        <span className="text-gray-600">{selectedUser?.address || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white p-2 rounded-lg">
                        <Calendar className="text-purple-600" size={20} />
                        <span className="text-gray-600">
                            <span className="font-semibold text-purple-600">Joined At :</span> {selectedUser?.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString("en-GB") : 'N/A'}
                        </span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white p-2 rounded-lg">
                        <Calendar className="text-purple-600" size={20} />
                        <span className="text-gray-600">
                            <span className="font-semibold text-purple-600">Date Of Birth :</span> {selectedUser?.dob ? new Date(selectedUser.dob).toLocaleDateString("en-GB") : 'N/A'}</span>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 my-4">
                    <div className="bg-purple-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Pending Tasks</p>
                        <p className="text-2xl font-semibold text-purple-600">
                            {selectedUser?.tasksCompleted ?? 0}
                        </p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Progress Members</p>
                        <p className="text-2xl font-semibold text-purple-600">
                            {selectedUser?.teamSize ?? 0}
                        </p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Complete Members</p>
                        <p className="text-2xl font-semibold text-purple-600">
                            {selectedUser?.teamSize ?? 0}
                        </p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Team Members</p>
                        <p className="text-2xl font-semibold text-purple-600">
                            {selectedUser?.teamSize ?? 0}
                        </p>
                    </div>
                </div>

                <div className='w-full'>
                    <h2 className='text-xl font-semibold mb-2 underline-2 underline-offset-2'>Task History</h2>
                </div>
            </div>
        </div>
    );
};

export default ShowUser;
