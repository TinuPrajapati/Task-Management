import React,{useState} from 'react'
import { User ,Star} from 'lucide-react'

const Emails = ({email}) => {
    const [star, setStar] = useState(false)
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(date);
    };
    return (
        <div
            key={email.id}
            className={`rounded-lg  cursor-pointer transition-colors bg-white hover:bg-purple-200 duration-500`}
            onClick={() => setSelectedEmail(email)}
        >
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <h3 className={`text-sm font-semibold ${!email.isRead && 'text-blue-600'}`}>
                                    {email.senderName}
                                </h3>
                                <span className="text-xs text-gray-500">
                                    {formatTimestamp(email.timestamp)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-900 font-medium mt-1">{email.subject}</p>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{email.message}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setStar(!star)}
                            className={`p-1 rounded-full hover:bg-gray-100 ${star ? 'text-yellow-400' : 'text-gray-400'}`}
                        >
                            <Star className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Emails