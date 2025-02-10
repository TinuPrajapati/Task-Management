import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react'

const Input = ({ text, icon, handleChange, value, type, id, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <label htmlFor={id} className="block mb-1 text-lg pl-3 font-bold text-gray-700">{text}</label>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
        {
          type === "password" ? (
            // Render password input with toggle button
            <>
              <input
                type={showPassword ? "text" : "password"}
                id={id}
                value={value}
                className="block w-full py-2 pl-10 pr-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-sky-400 focus:border-none outline-none"
                placeholder={placeholder}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 text-sky-400 font-semibold text-lg"
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </>
          ) : (
            // Render regular input for other types
            <input
              type={type}
              id={id}
              name="phone"
              value={value}
              className="block w-full py-2 pl-10 pr-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-sky-400 focus:border-none outline-none"
              placeholder={placeholder}
              onChange={handleChange}
            />
          )
        }
      </div>
    </div>
  )
}

export default Input

