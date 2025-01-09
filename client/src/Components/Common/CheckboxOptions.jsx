import React from 'react'

const CheckboxOptions = ({id,text,value,handleFilterChange}) => {
    return (
        <div className="flex items-center justify-start gap-2 mb-1">
            <input type="checkbox" name={id} id={id} value={value} onChange={handleFilterChange} />
            <label htmlFor={id}>{text}</label>
        </div>
    )
}

export default CheckboxOptions