import React, { useState } from 'react';
import {
    Bell,
    Calendar,
    Clock,
    Filter,
    Plus,
    Tags,
    User,
    X,
} from 'lucide-react';

const roles = ['Developer', 'Designer', 'Manager', 'Marketing', 'Sales'];
const priorities = ['Low', 'Medium', 'High'];

function AssignedReminder() {
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

    return (
        <div className="min-h-[70vh]">

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="">All Roles</option>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New Reminder
                </button>
            </div>

            {/* Reminders Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredReminders.map((reminder) => (
                    <div
                        key={reminder.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {reminder.title}
                                </h3>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                                        reminder.priority
                                    )}`}
                                >
                                    {reminder.priority}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                                {reminder.description}
                            </p>
                            <div className="mt-4 flex items-center space-x-4">
                                <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {reminder.date}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {reminder.time}
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-gray-500">
                                <User className="h-4 w-4 mr-1" />
                                {reminder.role}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold">New Reminder</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        required
                                        value={newReminder.title}
                                        onChange={(e) =>
                                            setNewReminder({ ...newReminder, title: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        required
                                        value={newReminder.description}
                                        onChange={(e) =>
                                            setNewReminder({
                                                ...newReminder,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="date"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            required
                                            value={newReminder.date}
                                            onChange={(e) =>
                                                setNewReminder({ ...newReminder, date: e.target.value })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="time"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            id="time"
                                            required
                                            value={newReminder.time}
                                            onChange={(e) =>
                                                setNewReminder({ ...newReminder, time: e.target.value })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        required
                                        value={newReminder.role}
                                        onChange={(e) =>
                                            setNewReminder({ ...newReminder, role: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Select a role</option>
                                        {roles.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="priority"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Priority
                                    </label>
                                    <select
                                        id="priority"
                                        required
                                        value={newReminder.priority}
                                        onChange={(e) =>
                                            setNewReminder({
                                                ...newReminder,
                                                priority: e.target.value,
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        {priorities.map((priority) => (
                                            <option key={priority} value={priority}>
                                                {priority}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Create Reminder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssignedReminder;