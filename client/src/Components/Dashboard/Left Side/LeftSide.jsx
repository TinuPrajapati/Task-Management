import React from 'react'
import { task } from '../../../assets'

const LeftSide = () => {
    return (
        <div className='w-[60%]'>
            <div className="flex justify-between items-center bg-white rounded-md py-2 px-4 border-2 border-yellow-400 mb-4">
                <div className='w-[60%]'>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome To</h2>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Task Management Area</h3>
                </div>
                <img src={task} alt="Task Management Illustration" className=" h-44" />
            </div>

            <div className="flex gap-4 ">
                <div className='bg-white rounded-md p-4 border-2 border-yellow-400 w-full'>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Today Work Progress</h2>
                    <div className='text-xl flex justify-evenly mt-4'>
                        <div className='flex flex-col gap-6'>
                            <p>Pending Project : 00</p>
                            <p>Completed Project : 00</p>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <p>Accept Project : 00</p>
                            <p>Rejected Project : 00</p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSide