import React, { useEffect, useRef, useState } from 'react';
import {
    User, Users, Search, Send, Phone, Video, MoreVertical,
    Image as ImageIcon, Paperclip, Smile, Plus,
    X
} from 'lucide-react';
import useChatStore from '../../../api/Store/useChatStore';

function ChatOption({ setIsDialogOpen, selectedUser}) {
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { sendMessage,subscribeToChat,unSubscribeToChat,message:chats,getMessages } = useChatStore();
    const messageEndRef = useRef(null);

    // const filteredChats = chats.filter(chat =>
    //     chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const handleSendMessage = () => {
        sendMessage(selectedUser._id, message);
        setMessage('');
    };

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToChat();

        return () => {
            unSubscribeToChat();
        }
    },[subscribeToChat,unSubscribeToChat,handleSendMessage]);

    useEffect(() => {
        if (messageEndRef.current && chats) {
          messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [chats]);

    return (
        <div className="absolute top-0 left-0 bg-black/40 flex items-center justify-center w-[100vw] h-[100vh] overflow-y-auto">

            <div className="w-[90%] h-[95%]">
                {/* Chat Header */}
                <div className="px-6 h-[14%] bg-purple-300 rounded-t-xl border-b flex items-center justify-between"

                >
                    <div className="flex items-center space-x-4">
                        {selectedUser.image ? (
                            <img
                                src={selectedUser.image}
                                alt={selectedUser.name}
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
                            <h2 className="text-xl font-semibold text-white">{selectedUser.name}</h2>
                            {selectedUser.isGroup && (
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
                        <button className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full" onClick={() => setIsDialogOpen(false)}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-200 h-[71%]" >
                    <div className="space-y-3">
                        {chats.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.senderId === selectedUser._id ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`max-w-[70%] ${msg.senderId === selectedUser._id
                                        ? 'bg-white text-gray-900 rounded-r-lg rounded-bl-lg'
                                        : 'bg-blue-600 text-white rounded-l-lg rounded-br-lg'
                                        } p-4 shadow-sm`}
                                >
                                    {!msg.senderId === selectedUser._id && (
                                        <p className="text-sm font-medium text-gray-900 mb-1">
                                            {msg.message}
                                        </p>
                                    )}
                                    <p className="text-sm">{msg.message}</p>
                                    <p className={`text-xs mt-1 ${msg.senderId === selectedUser._id ? 'text-gary-400' : 'text-blue-100'}`}>
                                        {new Date(msg.createdAt).toLocaleString("en-GB")}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={messageEndRef}></div>
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