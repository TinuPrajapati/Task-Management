import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from "react-router-dom";
import ShowReport from './ShowReport';

function Reports() {
    const [reports, setReports] = useState([
        {
            id: '1',
            title: 'Q1 Development Progress',
            content: 'Team has completed 85% of planned features with minimal technical debt.',
            date: '2024-03-20',
            author: 'John Smith',
            type: 'Progress',
            metrics: {
                tasksCompleted: 45,
                tasksInProgress: 8,
                efficiency: 92,
            },
        },
        {
            id: '2',
            title: 'March Performance Review',
            content: 'Overall team velocity has increased by 20% compared to previous month.',
            date: '2024-03-21',
            author: 'Sarah Johnson',
            type: 'Performance',
            metrics: {
                tasksCompleted: 38,
                tasksInProgress: 5,
                efficiency: 88,
            },
        },
    ]);

    // Existing reminder state and functions
    const [reminders, setReminders] = useState([
        {
            id: '1',
            title: 'Weekly Team Meeting',
            description: 'Discuss project progress and upcoming milestones',
            date: '2024-03-20',
            time: '10:00',
            role: 'Manager',
            priority: 'High',
        },
        {
            id: '2',
            title: 'Code Review',
            description: 'Review pull requests for the new feature',
            date: '2024-03-21',
            time: '14:00',
            role: 'Developer',
            priority: 'Medium',
        },
    ]);

    const [filterRole, setFilterRole] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [newReminder, setNewReminder] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        role: '',
        priority: 'Medium',
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-800';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'Low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="">
            {/* Header */}
            <div className="flex items-center justify-between w-full h-16 ">
                <h2 className="text-3xl font-semibold">
                    Reports
                </h2>
                <Link
                    to="/create_report"
                    className="flex items-center justify-center gap-1 px-4 py-2 text-xl font-semibold text-white bg-purple-400 rounded-md active:scale-90"
                >
                    <Plus className="size-6" />
                    New Report
                </Link>

            </div>

            <div className="space-y-6">
                {reports.map((report) => (
                    <ShowReport report={report} />
                ))}
            </div>
        </div>
    );
}

export default Reports;