import React, { useState } from 'react'
import { User, Star } from 'lucide-react'
import EmailDialog from './EmailDialog'
import useAuthStore from '../../api/Store/useAuthStore'

const Emails = ({ email }) => {
    const [star, setStar] = useState(false)
    const [selectedEmail, setSelectedEmail] = useState(null)
    const { authUser } = useAuthStore();
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
        <>
            <div
                key={email._id}
                className={`rounded-lg  cursor-pointer transition-colors bg-white hover:bg-purple-200 duration-500`}
                onClick={() => setSelectedEmail(email)}
            >
                <div className="px-4 py-2">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                            <img
                                src={email?.senderId?.image || '/default-avatar.png'}
                                alt={email?.senderId?.name || 'User Avatar'}
                                className="size-14 rounded-lg border-2 border-purple-200"
                            />
                            <div>
                                <div className='flex items-center gap-4'>
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                        {email?.senderId?.name}
                                    </h3>
                                    <p className="text-white bg-purple-400 px-2 py-0.5 rounded-md">{email?.role}</p>
                                </div>
                                <p className=" text-gray-900 font-medium"><span className='text-purple-600 font-semibold'>Subject :</span> {email.subject}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className='flex gap-4 items-center'>
                                <p className='bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-1 rounded-md text-white font-semibold'>{email?.senderId?._id === authUser?._id ? 'Send' : "Received"}</p>
                                <button
                                    onClick={() => setStar(!star)}
                                    className={`p-1 rounded-full hover:bg-gray-100 ${star ? 'text-yellow-400' : 'text-gray-400'}`}
                                >
                                    <Star className="w-5 h-5" />
                                </button>
                            </div>
                            <span className="text-xs text-gray-500">
                                {formatTimestamp(email?.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {
                selectedEmail && <EmailDialog selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail} />
            }
        </>
    )
}

export default Emails