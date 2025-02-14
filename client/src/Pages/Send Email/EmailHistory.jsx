import React, { useState } from 'react';
import { Mail, User, Search, Star } from 'lucide-react';
import EmailDialog from './EmailDialog';
import Emails from './Emails';

function EmailHistory() {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
  

    const emails = [
        {
            id: 1,
            senderName: "John Smith",
            senderEmail: "john.smith@company.com",
            recipientName: "Sarah Johnson",
            recipientEmail: "sarah.johnson@company.com",
            subject: "Project Timeline Update - Website Redesign",
            message: "Hi Sarah,\n\nI've reviewed the latest mockups for the website redesign project. The new design direction looks great, but I think we might need to adjust the timeline to accommodate the additional features requested by the client.\n\nCan we schedule a quick meeting to discuss this?\n\nBest regards,\nJohn",
            timestamp: "2024-03-15 09:30 AM",
            isStarred: true,
            isRead: true
        },
        {
            id: 2,
            senderName: "Emma Davis",
            senderEmail: "emma.davis@company.com",
            recipientName: "Sarah Johnson",
            recipientEmail: "sarah.johnson@company.com",
            subject: "UI Component Library Documentation",
            message: "Hello Sarah,\n\nI've completed the documentation for our new UI component library. You can find all the updated files in the shared drive. Please review when you have a chance.\n\nThanks,\nEmma",
            timestamp: "2024-03-14 04:15 PM",
            isStarred: false,
            isRead: true
        },
        {
            id: 3,
            senderName: "Michael Chen",
            senderEmail: "michael.chen@company.com",
            recipientName: "Sarah Johnson",
            recipientEmail: "sarah.johnson@company.com",
            subject: "Urgent: Server Deployment Issue",
            message: "Sarah,\n\nWe're experiencing some issues with the latest deployment. The staging environment is showing some inconsistencies with the database connections. I've started investigating but might need your expertise on this.\n\nPlease let me know when you're available to look into this.\n\nRegards,\nMichael",
            timestamp: "2024-03-14 11:45 AM",
            isStarred: true,
            isRead: false
        }
    ];

    const filteredEmails = emails.filter(email =>
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    

    return (
        <div className="min-h-screen">

            {/* Header */}
            <div className="mb-6 relative">
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