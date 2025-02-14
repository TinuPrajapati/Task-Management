import { EllipsisVertical, MessageCircle, Pencil, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import ChatOption from '../Direct Chat/ChatOption'
import GroupDetails from './GroupDetails'

const GroupChat = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [details,setDetails] = useState(false)
    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='w-full h-14 p-2 flex gap-6 bg-white'>
                <div className='relative flex items-center w-[80%] h-full '>
                    <input type='text' placeholder='Search by Team Name' className="block w-full h-[100%] pl-10 pr-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-none outline-none" />
                    <label htmlFor="search" className='absolute left-2'><Search className='size-5 text-gray-400' /></label>
                </div>
                <select className="block w-[20%] h-[100%] px-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-none outline-none" >
                    <option>Choose Team Name</option>
                    <option>Hack Thinking</option>
                    <option>Choose Team Name</option>
                    <option>Choose Team Name</option>
                </select>
            </div>

            <div className='w-full grid grid-cols-3 gap-4'>
                <div className='bg-white rounded-lg'>
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                        alt={"employee.name"}
                        className="w-full h-28 rounded-t-lg object-fit"
                    />
                    <div className='p-3'>
                        <h2 className='text-xl mb-1'>Team Name</h2>
                        <p className='text-sm text-gray-400 mb-2'>No of Member</p>
                        <div className='w-full h-10 flex justify-center items-center gap-10'>
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className='w-[30%] h-[80%] text-white rounded-md  text-lg font-semibold bg-purple-400 active:scale-90 duration-200'>Chat</button>
                            <button
                            onClick={()=>setDetails(true)}
                             className='w-[30%] h-[80%] text-white rounded-md  text-lg font-semibold bg-purple-400 active:scale-90 duration-200'>Details</button>
                        </div>
                    </div>
                </div>
            </div>
            {isDialogOpen && (
                <ChatOption setIsDialogOpen={setIsDialogOpen} />
            )}

            {details && <GroupDetails setDetails={setDetails}/>}
        </div>
    )
}

export default GroupChat