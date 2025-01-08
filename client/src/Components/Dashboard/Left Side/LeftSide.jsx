import React from 'react'

const LeftSide = () => {
    return (
        <div className='w-[60%]'>
            <div className="flex justify-between items-center bg-white rounded-md p-4 border-2 border-yellow-400 mb-4">
                <div className='w-[60%]'>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome To</h2>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Task Management Area</h3>
                    <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur. Bibendum risus urna tortor posuent.</p>
                    <button className="bg-purple-500 text-white rounded-full px-6 py-2 font-medium">
                        Learn More
                    </button>
                </div>
                <img src="/placeholder.svg?height=200&width=300" alt="Task Management Illustration" className="w-1/3" />
            </div>

            <div className="flex gap-4 ">
                <div className='bg-white rounded-md p-4 border-2 border-yellow-400 w-1/2'>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Today Work Progress</h2>
                    <div className='text-xl flex flex-col gap-4 mt-4'>
                        <p>Pending Project : 00</p>
                        <p>Completed Project : 00</p>
                        <p>Accept Project : 00</p>
                        <p>Rejected Project : 00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSide