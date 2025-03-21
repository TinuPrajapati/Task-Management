import React from 'react'

const Dashboard = () => {
  return (
    <div className=''>
      <div className='grid grid-cols-4 gap-4'>
        <div className='bg-white flex items-center justify-between rounded-md h-14 pl-2 pr-6'>
          <h1 className='text-purple-600 font-bold text-lg'>Pending Task</h1>
          <p>0</p>
        </div>
        <div className='bg-white flex items-center justify-between rounded-md h-14 pl-2 pr-6'>
          <h1 className='text-purple-600 font-bold text-lg'>Accept Task</h1>
          <p>0</p>
        </div>
        <div className='bg-white flex items-center justify-between rounded-md h-14 pl-2 pr-6'>
          <h1 className='text-purple-600 font-bold text-lg'>Completed Task</h1>
          <p>0</p>
        </div>
        <div className='bg-white flex items-center justify-between rounded-md h-14 pl-2 pr-6'>
          <h1 className='text-purple-600 font-bold text-lg'>Rejected Task</h1>
          <p>0</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard