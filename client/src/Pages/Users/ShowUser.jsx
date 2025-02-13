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
import Hr from "../../assets/Hr.png"

const ShowUser = ({ employee }) => {
    return (
        <div key={employee.id} className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow hover:shadow-lg">
            <div className=' w-full h-28 relative flex items-center'>
                <img src={Hr} alt="" className='w-full h-full object-fit' />
                <img
                    className="object-cover w-16 h-16 rounded-full absolute right-2"
                    src={employee.avatar}
                    alt={employee.name}
                />
            </div>
            <div className="p-2">
                <div className="flex items-center">

                    <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-900">{employee.name}</h2>
                        <p className="text-sm text-gray-600">{employee.role}</p>
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

            </div>
        </div>
    )
}

export default ShowUser