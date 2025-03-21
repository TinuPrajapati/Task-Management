import React from 'react'
import { Clock, Trash2, X } from 'lucide-react';

const EmailDialog = ({ selectedEmail, setSelectedEmail }) => {
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-GB', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(date);
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-[100vw] h-[100vh]">
            <div className="bg-purple-300 rounded-md w-[80%] h-[90%] p-2 flex flex-col gap-2">
                <div className="flex justify-between items-start bg-white px-4 py-1 rounded-md h-[25%]">
                    <div>
                        <h2 className="text-2xl font-bold text-purple-400">{selectedEmail.subject}</h2>
                        <div className=" text-[1rem] text-gray-600">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-purple-400">From :</span>
                                <span>{selectedEmail?.senderId?.name} &lt;{selectedEmail?.senderId?.email}&gt;</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-purple-400">To :</span>
                                <span>{selectedEmail?.receiverId?.name} &lt;{selectedEmail?.receiverId?.email}&gt;</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                                <Clock className="w-4 h-4 text-purple-400" />
                                <span>: {formatTimestamp(selectedEmail?.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full"
                            onClick={() => setSelectedEmail(null)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="bg-white h-[75%] rounded-md px-4 py-2" dangerouslySetInnerHTML={{ __html: selectedEmail.message }}>
                </div>
            </div>
        </div>
    )
}

export default EmailDialog