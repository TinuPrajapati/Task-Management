import React, { useState } from 'react';
import {
    PlusCircle,
    Trash2,
    Pin,
    Clock
} from 'lucide-react';

function OwnReminder() {
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState('');
    const [reminderDate, setReminderDate] = useState('');
    const [reminderType, setReminderType] = useState('meeting');
    const [priority, setPriority] = useState('Medium');
    const [openMenuId, setOpenMenuId] = useState(null);
    const [isEditing, setIsEditing] = useState(null);
    const priorities = ['High', 'Medium', 'Low'];
    const reminderTypes = ['meeting', 'deadline', 'announcement'];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getReminderTypeColor = (type) => {
        switch (type) {
            case 'meeting': return 'bg-purple-100 text-purple-700';
            case 'deadline': return 'bg-red-100 text-red-700';
            case 'announcement': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    const addReminder = (e) => {
        e.preventDefault();
        if (newReminder.trim() && reminderDate) {
            setReminders([
                ...reminders,
                {
                    id: Date.now(),
                    title: newReminder.trim(),
                    date: reminderDate,
                    isPinned: false,
                    type: reminderType,
                },
            ]);
            setNewReminder('');
            setReminderDate('');
        }
    };

    const togglePin = (reminderId) => {
        setReminders(
            reminders.map((reminder) =>
                reminder.id === reminderId
                    ? { ...reminder, isPinned: !reminder.isPinned }
                    : reminder
            )
        );
    };

    const deleteReminder = (reminderId) => {
        setReminders(reminders.filter((reminder) => reminder.id !== reminderId));
    };

    return (
        <div className="min-h-[70vh]">
            <form onSubmit={addReminder} className="mb-6 bg-white p-6 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                        type="text"
                        value={newReminder}
                        onChange={(e) => setNewReminder(e.target.value)}
                        placeholder="Add a new reminder..."
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="datetime-local"
                        value={reminderDate}
                        onChange={(e) => setReminderDate(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                        value={reminderType}
                        onChange={(e) => setReminderType(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        {reminderTypes.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                    >
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Add Reminder
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reminders.length === 0 ? (
                    <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                        No reminders yet. Add your first reminder above!
                    </div>
                ) : (
                    reminders
                        .sort((a, b) => (b.isPinned ? 1 : -1))
                        .map((reminder) => (
                            <div
                                key={reminder.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getReminderTypeColor(reminder.type)}`}>
                                        {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => togglePin(reminder.id)}
                                            className={`p-1 rounded-full transition-colors duration-200 ${reminder.isPinned ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                        >
                                            <Pin className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => deleteReminder(reminder.id)}
                                            className="p-1 text-gray-400 hover:text-red-600 rounded-full transition-colors duration-200"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-lg mb-4 text-gray-800">{reminder.title}</p>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {new Date(reminder.date).toLocaleString()}
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}

export default OwnReminder;