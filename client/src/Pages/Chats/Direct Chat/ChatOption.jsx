import React, { useState } from 'react';
import {
    User, Users, Search, Send, Phone, Video, MoreVertical,
    Image as ImageIcon, Paperclip, Smile, Plus,
    X
} from 'lucide-react';

function ChatOption({setIsDialogOpen}) {
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const chats = [
        {
            id: 1,
            name: "Website Redesign Team",
            lastMessage: "Great progress everyone! Let's review the latest mockups tomorrow.",
            timestamp: "10:30 AM",
            unread: 3,
            isGroup: true,
            participants: ["Sarah Johnson", "Michael Chen", "Emma Davis", "John Smith"],
        },
        {
            id: 2,
            name: "Emma Davis",
            lastMessage: "I've updated the component documentation",
            timestamp: "Yesterday",
            unread: 0,
            isGroup: false,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        },
        {
            id: 3,
            name: "Backend Team",
            lastMessage: "The new API endpoints are ready for testing",
            timestamp: "Yesterday",
            unread: 5,
            isGroup: true,
            participants: ["Michael Chen", "David Wilson", "Lisa Anderson"],
        },
    ];

    const messages = [
        {
            id: 1,
            content: "Hi team! I've just pushed the latest updates to the staging environment. Please review when you have a chance.",
            sender: "Michael Chen",
            timestamp: "10:30 AM",
            isOwn: false,
        },
        {
            id: 2,
            content: "I'll take a look at it right away. Are there any specific areas you want us to focus on?",
            sender: "You",
            timestamp: "10:32 AM",
            isOwn: true,
        },
        {
            id: 3,
            content: "The new navigation component and the dashboard layout would be great to review first.",
            sender: "Michael Chen",
            timestamp: "10:35 AM",
            isOwn: false,
        },
    ];

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = () => {
        if (message.trim()) {
            // Here you would typically send the message to your backend
            setMessage('');
        }
    };

    return (
        <div className="absolute top-0 left-0 bg-black/40 flex items-center justify-center w-[100vw] h-[100vh] overflow-y-auto">

            <div className="w-[90%] h-[95%]">
                {/* Chat Header */}
                <div className="px-6 h-[14%] bg-purple-300 rounded-t-xl border-b flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {chats[0].avatar ? (
                            <img
                                src={chats[0].avatar}
                                alt={chats[0].name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                {chats[0].isGroup ? (
                                    <Users className="w-5 h-5 text-blue-600" />
                                ) : (
                                    <User className="w-5 h-5 text-blue-600" />
                                )}
                            </div>
                        )}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">{chats[0].name}</h2>
                            {chats[0].isGroup && (
                                <p className="text-sm text-gray-500">
                                    {chats[0].participants?.length} participants
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                            <Phone className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                            <Video className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full" onClick={()=>setIsDialogOpen(false)}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 bg-white h-[71%]">
                    <div className="space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] ${msg.isOwn
                                        ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg'
                                        : 'bg-white text-gray-900 rounded-r-lg rounded-bl-lg'
                                        } p-4 shadow-sm`}
                                >
                                    {!msg.isOwn && (
                                        <p className="text-sm font-medium text-gray-900 mb-1">
                                            {msg.sender}
                                        </p>
                                    )}
                                    <p className="text-sm">{msg.content}</p>
                                    <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                                        {msg.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Input */}
                <div className="p-2 bg-purple-300 border-t h-[15%] w-full flex items-center gap-4 rounded-b-xl">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 w-[94%] h-[90%]">
                        <button className=" text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                        <button className=" text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <button className=" text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                            <Smile className="w-5 h-5" />
                        </button>
                        <input
                        type='text'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full bg-transparent border-0 focus:ring-0 p-0 resize-none outline-none"
                            rows={1}
                        />
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ChatOption;