import React, { useState } from 'react'

const CreateReport = () => {
    const reportTypes = ['Progress', 'Summary', 'Performance'];
    const [newReport, setNewReport] = useState({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        author: '',
        type: '',
        tasksCompleted: 0,
        tasksInProgress: 0,
        efficiency: 0,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewReport((prev) => ({ ...prev, [id]: value }));
    }

    const handleReportSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="bg-white rounded-xl">
            <div className="flex items-center justify-between px-6 py-2 mb-2 border-2 border-purple-400 rounded-t-xl">
                <h2 className="text-2xl font-semibold">New Report</h2>
            </div>
            <form onSubmit={handleReportSubmit} className="">
                <div className="px-6 space-y-4">
                    <InputReport text="Title" type="text" value={newReport.title} id="title" handleChange={handleChange} />
                    <div>
                        <label
                            htmlFor="reportContent"
                            className="block pl-4 text-lg font-semibold text-purple-400"
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
                            className="block w-full p-2 mt-1 border-2 rounded-md outline-none border-black/20 focus:ring-2 focus:ring-purple-400 focus:border-none"
                        />
                    </div>
                    <InputReport text="Author" type="text" value={newReport.author} id="author" handleChange={handleChange} />
                    <div>
                        <label
                            htmlFor="type"
                            className="block pl-4 text-lg font-semibold text-purple-400"
                        >
                            Report Type
                        </label>
                        <select
                            id="type"
                            required
                            value={newReport.type}
                            onChange={handleChange}
                            className="block w-full h-10 px-2 mt-1 border-2 rounded-md outline-none border-black/20 focus:ring-2 focus:ring-purple-400 focus:border-none"
                        >
                            {reportTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <InputReport text="Tasks Completed" type="number" value={newReport.tasksCompleted} id="tasksCompleted" handleChange={handleChange} />
                        <InputReport text="Tasks In Progress" type="number" value={newReport.tasksInProgress} id="tasksInProgress" handleChange={handleChange} />
                        <InputReport text="Efficiency (%)" type="number" value={newReport.efficiency} id="efficiency" handleChange={handleChange} />
                    </div>
                </div>
                <div className="flex justify-end px-6 py-2 mt-4 space-x-3 border-2 border-purple-400 rounded-b-xl">
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Report
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateReport


// Input Function for Create Report
const InputReport = ({ text, handleChange, value, type, id, placeholder }) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block pl-4 text-lg font-semibold text-purple-400"
            >
                {text}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="block w-full h-10 px-2 mt-1 border-2 rounded-md outline-none border-black/20 focus:ring-2 focus:ring-purple-400 focus:border-none"
            />
        </div>
    )
}