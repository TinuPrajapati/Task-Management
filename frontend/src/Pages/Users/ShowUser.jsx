import React from 'react'
import {
    Mail,
    MapPin,
    Award,
    Briefcase,
    Users,
    CheckCircle2,
    PhoneCall,
    Cake
} from 'lucide-react';

const ShowUser = ({employee}) => {
  return (
    <div key={employee.id} className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow hover:shadow-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <img
                                    className="object-cover w-16 h-16 rounded-full"
                                    src={employee.avatar}
                                    alt={employee.name}
                                />
                                <div className="ml-4">
                                    <h2 className="text-xl font-semibold text-gray-900">{employee.name}</h2>
                                    <p className="text-sm text-gray-600">{employee.role}</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-5 h-5 text-purple-400" />
                                    <p className='font-bold text-purple-400'>Email : </p>
                                    <span>{employee.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 gap-">
                                    <Briefcase className="w-5 h-5 text-purple-400" />
                                    <p className='font-bold text-purple-400'>Position : </p>
                                    <span>{employee.department}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-5 h-5 text-purple-400" />
                                    <p className='font-bold text-purple-400'>Location : </p>
                                    <span>{employee.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <PhoneCall className="w-5 h-5 text-purple-400" />
                                    <p className='font-bold text-purple-400'>Phone No. : </p>
                                    <span>{employee.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Cake className="w-5 h-5 text-purple-400" />
                                    <p className='font-bold text-purple-400'>DOB : </p>
                                    <span>{employee.location}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-900">Performance</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-lg bg-indigo-50">
                                        <div className="flex items-center">
                                            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                                            <span className="ml-2 text-sm text-gray-600">Tasks</span>
                                        </div>
                                        <p className="mt-1 text-lg font-semibold text-indigo-600">
                                            {employee.performance.tasksCompleted}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-purple-50">
                                        <div className="flex items-center">
                                            <Users className="w-5 h-5 text-purple-600" />
                                            <span className="ml-2 text-sm text-gray-600">Team</span>
                                        </div>
                                        <p className="mt-1 text-lg font-semibold text-purple-600">
                                            {employee.performance.teamSize}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex flex-wrap gap-2">
                                    {employee.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                        >
                                            <Award className="w-3 h-3 mr-1" />
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default ShowUser