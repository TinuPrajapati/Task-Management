import React from 'react'

const Select = ({text,id,icon,handleChange,value,options}) => {
    return (
        <div className="h-[12vh]">
            <label htmlFor={id} className="block mb-1 text-lg pl-3 font-bold text-gray-700">{text}</label>
            <div className="relative flex items-center h-[60%]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {icon}
                </div>
                <select
                    id={id}
                    value={value}
                    className="block w-full h-[100%] pl-10 pr-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 focus:border-none outline-none focus:duration-200"
                    onChange={handleChange}
                >
                    {options.map((option,index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Select