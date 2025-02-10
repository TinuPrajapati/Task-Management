import React from 'react'
import { ChevronRight } from "lucide-react"

const reportTypes = ['Progress', 'Summary', 'Performance'];
const ShowReport = ({ report }) => {
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
        <div
            key={report.id}
            className="overflow-hidden transition-shadow duration-200 bg-white rounded-lg shadow-sm hover:shadow-md"
        >
            <div className="p-6">
                <div className="flex items-start justify-between">
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
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="mt-4 text-sm text-gray-600">{report.content}</p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="p-4 rounded-lg bg-blue-50">
                        <div className="text-sm font-medium text-blue-900">
                            Tasks Completed
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-blue-700">
                            {report.metrics.tasksCompleted}
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-50">
                        <div className="text-sm font-medium text-purple-900">
                            In Progress
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-purple-700">
                            {report.metrics.tasksInProgress}
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50">
                        <div className="text-sm font-medium text-green-900">
                            Efficiency
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-green-700">
                            {report.metrics.efficiency}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowReport