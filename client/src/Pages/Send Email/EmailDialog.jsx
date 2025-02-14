import React from 'react'
import { Clock, Trash2, X } from 'lucide-react';

const EmailDialog = ({ selectedEmail ,setSelectedEmail}) => {
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center w-[100vw] h-[100vh]">
            <div className="bg-purple-300 rounded-lg w-[80%] h-[90%] p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start bg-white px-4 py-1 rounded-lg h-[25%]">
                    <div>
                        <h2 className="text-2xl font-bold text-purple-400">{selectedEmail.subject}</h2>
                        <div className="mt-2 text-[1rem] text-gray-600">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-purple-400">From :</span>
                                <span>{selectedEmail.senderName} &lt;{selectedEmail.senderEmail}&gt;</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-purple-400">To :</span>
                                <span>{selectedEmail.recipientName} &lt;{selectedEmail.recipientEmail}&gt;</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                                <Clock className="w-4 h-4 text-purple-400" />
                                <span>: {selectedEmail.timestamp}</span>
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
                <div className="bg-white h-[75%] rounded-lg px-4 py-2">
                    <p className="whitespace-pre-wrap text-gray-700">{selectedEmail.message}</p>
                </div>
            </div>
        </div>
    )
}

export default EmailDialog