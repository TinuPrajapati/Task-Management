import React, { useEffect, useState } from 'react';
import { Mail, User, Search, Star } from 'lucide-react';
import EmailDialog from './EmailDialog';
import Emails from './Emails';
import useEmailStore from '../../api/Store/useEmailStore';

function EmailHistory() {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const {getAllEmails,emails} = useEmailStore();

    const filteredEmails = emails.filter(email =>
        email?.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email?.senderId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email?.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        getAllEmails();
    },[])
    return (
        <div className="min-h-screen">

            {/* Header */}
            <div className="mb-4 relative">
                <input
                    type="text"
                    placeholder="Search name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full h-10 pl-10 pr-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 focus:border-none outline-none"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Email List */}
            <div className="  flex flex-col gap-2">
                {filteredEmails.map((email) => (
                   <Emails email={email}/>
                ))}
            </div>

            {/* Email Detail Modal */}
            {selectedEmail && (
                <EmailDialog selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail} />
            )}
        </div>
    );
}

export default EmailHistory;