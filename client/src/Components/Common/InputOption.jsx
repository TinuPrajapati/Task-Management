import React, { useState } from 'react';
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

const InputOption = ({ id, text, type, placeholder, value, handleChange, options,width=50 }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className={`w-[${width}%] h-full flex flex-col gap-1`}>
            <label htmlFor={id} className="text-lg pl-3 font-semibold">{text}</label>
            
            {options && options.length > 0 ? (
                // Render select tag if options are provided
                <select
                    id={id}
                    value={value}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md text-black border-2 outline-none focus:ring-4 focus:border-sky-400 focus:border-none duration-200 px-2 text-lg"
                >
                    <option value="">{placeholder}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : type === "password" ? (
                // Render password input with toggle button
                <div className='relative flex items-center'>
                    <input
                        type={showPassword ? "text" : "password"}
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        className="w-[100%] h-10 rounded-md text-black border-2 outline-none focus:ring-4 focus:border-sky-400 focus:border-none duration-200 px-2 text-lg"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 text-sky-400 font-semibold text-lg"
                    >
                        {showPassword ? <LuEye /> : <LuEyeClosed />}
                    </button>
                </div>
            ) : (
                // Render regular input for other types
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className="w-[100%] h-10 rounded-md text-black border-2 outline-none focus:ring-4 focus:border-sky-400 focus:border-none duration-200 px-2 text-lg"
                />
            )}
        </div>
    );
}

export default InputOption;