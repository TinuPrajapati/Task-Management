import React from 'react'

const CheckBox = ({id,text}) => {
    return (
        <div className="flex items-center gap-2">
            <input type="checkbox" className="size-4 rounded-full" id={id} />
            <label htmlFor={id} className="block text-xl font-semibold">{text}</label>
        </div>
    )
}

export default CheckBox