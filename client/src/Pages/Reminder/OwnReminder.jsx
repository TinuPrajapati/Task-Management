import React, { useState } from 'react';
import {
    PlusCircle,
    Trash2,
    Pin,
    Clock
} from 'lucide-react';
import useReminderStore from '../../api/Store/useReminderStore';

function OwnReminder() {
    const { reminders } = useReminderStore();
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        priority: 'Medium',
    })

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const addReminder = (e) => {
        e.preventDefault();
    };

    const togglePin = (reminderId) => {
    };

    const deleteReminder = (reminderId) => {
        setReminders(reminders.filter((reminder) => reminder.id !== reminderId));
    };

    return (
        <div className="min-h-[70vh] flex flex-col gap-4">
            <form onSubmit={addReminder} className="flex items-center gap-4">
                <input
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    name="title"
                    placeholder="Add a new reminder..."
                    className="px-4 py-3 w-[50%] border tex-lg border-gray-300 rounded-md bg-white outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={handleChange}
                    name='date'
                    className="px-4 py-3 border w-[20%] border-gray-300 rounded-md bg-white outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
                />
                <select
                    value={formData.priority}
                    onChange={handleChange}
                    name='priority'
                    className="px-4 py-3 border w-[15%] border-gray-300 rounded-md bg-white outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button
                    type="submit"
                    className="px-4 py-3 bg-purple-600 w-[10%] text-white rounded-md flex items-center gap-2 justify-center outline-none text-lg font-bold active:scale-90 "
                >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reminders.length === 0 ? (
                    <div className="col-span-full bg-white text-2xl font-bold rounded shadow-sm border border-gray-200 p-6 text-center text-gray-500">
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