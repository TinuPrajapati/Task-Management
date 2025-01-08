import React from 'react'
import Upcoming from './Upcoming'

const RightSide = () => {
  return (
    <div className='w-[40%]'>
        <div className='w-full p-4 bg-white border-2 border-yellow-400 rounded-md mb-4'>
            <h2 className='text-2xl font-semibold'>Task Percentage</h2>
            <div className='w-full bg-slate-300 rounded-md h-[40vh] mt-2'></div>
        </div>

        <Upcoming/>
    </div>
  )
}

export default RightSide