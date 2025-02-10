import React, { useState } from 'react';
import {
    Bell,
    Calendar,
    Clock,
    Filter,
    Plus,
    User,
    X,
    FileText,
    BarChart,
    Layout,
    ChevronRight,
} from 'lucide-react';

const roles = ['Developer', 'Designer', 'Manager', 'Marketing', 'Sales'];
const priorities = ['Low', 'Medium', 'High'];
const reportTypes = ['Progress', 'Summary', 'Performance'];

function App() {
    const [activeTab, setActiveTab] = useState('reminders');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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

    const [newReport, setNewReport] = useState({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        author: '',
        type: 'Progress',
        metrics: {
            tasksCompleted: 0,
            tasksInProgress: 0,
            efficiency: 0,
        },
    });

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

    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleReportSubmit = (e) => {
        e.preventDefault();
        const id = Math.random().toString(36).substr(2, 9);
        setReports([...reports, { ...newReport, id }]);
        setIsReportModalOpen(false);
        setNewReport({
            title: '',
            content: '',
            date: new Date().toISOString().split('T')[0],
            author: '',
            type: 'Progress',
            metrics: {
                tasksCompleted: 0,
                tasksInProgress: 0,
                efficiency: 0,
            },
        });
    };

    const filteredReminders = reminders.filter((reminder) => {
        const matchesRole = filterRole ? reminder.role === filterRole : true;
        const matchesDate = filterDate ? reminder.date === filterDate : true;
        return matchesRole && matchesDate;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = Math.random().toString(36).substr(2, 9);
        setReminders([...reminders, { ...newReminder, id }]);
        setIsModalOpen(false);
        setNewReminder({
            title: '',
            description: '',
            date: '',
            time: '',
            role: '',
            priority: 'Medium',
        });
    };

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

    const getReportTypeColor = (type) => {
        switch (type) {
            case 'Progress':
                return 'bg-blue-100 text-blue-800';
            case 'Summary':
                return 'bg-purple-100 text-purple-800';
            case 'Performance':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };



    return (
        <div className="min-h-[70vh] py-10 px-5">
            {/* Header */}
            <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
                <h2 className="text-3xl font-semibold">
                    Reports
                </h2>
                <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New Report
                </button>
            </div>

            <div className="space-y-6">
                {reports.map((report) => (
                    <div
                        key={report.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {report.title}
                                        </h3>
                                        <span
                                            className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getReportTypeColor(
                                                report.type
                                            )}`}
                                        >
                                            {report.type}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-sm text-gray-500">
                                        By {report.author} • {report.date}
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                            <p className="mt-4 text-sm text-gray-600">{report.content}</p>
                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="text-blue-900 text-sm font-medium">
                                        Tasks Completed
                                    </div>
                                    <div className="mt-2 text-2xl font-semibold text-blue-700">
                                        {report.metrics.tasksCompleted}
                                    </div>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4">
                                    <div className="text-purple-900 text-sm font-medium">
                                        In Progress
                                    </div>
                                    <div className="mt-2 text-2xl font-semibold text-purple-700">
                                        {report.metrics.tasksInProgress}
                                    </div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <div className="text-green-900 text-sm font-medium">
                                        Efficiency
                                    </div>
                                    <div className="mt-2 text-2xl font-semibold text-green-700">
                                        {report.metrics.efficiency}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            

            {/* Report Modal */}
            {isReportModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold">New Report</h2>
                            <button
                                onClick={() => setIsReportModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleReportSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="reportTitle"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="reportTitle"
                                        required
                                        value={newReport.title}
                                        onChange={(e) =>
                                            setNewReport({ ...newReport, title: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="reportContent"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Content
                                    </label>
                                    <textarea
                                        id="reportContent"
                                        required
                                        value={newReport.content}
                                        onChange={(e) =>
                                            setNewReport({ ...newReport, content: e.target.value })
                                        }
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="reportAuthor"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        id="reportAuthor"
                                        required
                                        value={newReport.author}
                                        onChange={(e) =>
                                            setNewReport({ ...newReport, author: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="reportType"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Report Type
                                    </label>
                                    <select
                                        id="reportType"
                                        required
                                        value={newReport.type}
                                        onChange={(e) =>
                                            setNewReport({
                                                ...newReport,
                                                type: e.target.value,
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        {reportTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label
                                            htmlFor="tasksCompleted"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Tasks Completed
                                        </label>
                                        <input
                                            type="number"
                                            id="tasksCompleted"
                                            required
                                            min="0"
                                            value={newReport.metrics.tasksCompleted}
                                            onChange={(e) =>
                                                setNewReport({
                                                    ...newReport,
                                                    metrics: {
                                                        ...newReport.metrics,
                                                        tasksCompleted: parseInt(e.target.value),
                                                    },
                                                })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="tasksInProgress"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Tasks In Progress
                                        </label>
                                        <input
                                            type="number"
                                            id="tasksInProgress"
                                            required
                                            min="0"
                                            value={newReport.metrics.tasksInProgress}
                                            onChange={(e) =>
                                                setNewReport({
                                                    ...newReport,
                                                    metrics: {
                                                        ...newReport.metrics,
                                                        tasksInProgress: parseInt(e.target.value),
                                                    },
                                                })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="efficiency"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Efficiency (%)
                                        </label>
                                        <input
                                            type="number"
                                            id="efficiency"
                                            required
                                            min="0"
                                            max="100"
                                            value={newReport.metrics.efficiency}
                                            onChange={(e) =>
                                                setNewReport({
                                                    ...newReport,
                                                    metrics: {
                                                        ...newReport.metrics,
                                                        efficiency: parseInt(e.target.value),
                                                    },
                                                })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsReportModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Create Report
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;