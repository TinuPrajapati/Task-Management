import React from 'react';
import ActiveUser from './ActiveUser';

const Chats = () => {
    const [chatUser, setChatUser] = React.useState("");
    const onlineUsers = [
        { id: 1, name: 'John Doe', status: 'online' },
        { id: 2, name: 'Jane Smith', status: 'online' },
        { id: 3, name: 'Emily Davis', status: 'offline' },
    ];

    const chats = [
        { id: 1, sender: 'John Doe', message: 'Hello, are you free to discuss the project?', time: '10:00 AM' },
        { id: 2, sender: 'Me', message: 'Yes, let me know the details.', time: '10:05 AM' },
    ];

    return (
        <div className="w-full min-h-[80vh] flex">

            {/* Left Sidebar - Online Users */}
            <div className="w-[20%] border-b-4 border-r-4 border-yellow-400 bg-white flex flex-col px-1 py-10">
                <h2 className="mb-3 text-3xl font-bold">Online Users</h2>
                <div className="flex flex-col w-full gap-2">
                    {onlineUsers.map((user, index) => (
                        <ActiveUser user={user} key={index} setChatUser={setChatUser} />
                    ))}
                </div>
            </div>

            {/* Right Chat Area */}
            <div className="flex flex-col flex-1">
                {/* Chat Messages */}
                <div className="flex-1 p-4 pt-8 overflow-y-auto bg-white">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`flex mb-4 ${chat.sender === 'Me' ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            <div
                                className={`p-3 rounded-lg max-w-sm border-2 border-yellow-400 ${chat.sender === 'Me'
                                        ? 'bg-gray-300 text-black'
                                        : 'bg-blue-500 text-white'
                                    }`}
                            >
                                <p>{chat.message}</p>
                                <span className="block mt-2 text-xs">
                                    {chat.time} {chat.sender === 'Me' ? '(You)' : ''}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Box */}
                <div className="p-4 border-t-4 border-yellow-400 bg-sky-400">
                    <div className="flex items-center border-4 border-yellow-400 rounded-lg">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 rounded-md focus:outline-none"
                        />
                        <button className="px-6 py-2 text-white bg-blue-500 rounded-r-md active:scale-90">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chats;
