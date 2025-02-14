import { Pencil, Trash2, X } from 'lucide-react'
import React from 'react'

const GroupDetails = ({ details, setDetails }) => {
    return (
        <div className={`w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/40 flex justify-center items-center `}>
            <div className='w-[80%] h-[80%] bg-white rounded-lg p-4'>
                <div className=' w-full flex justify-between items-center mb-2'>
                    <h1 className='text-2xl font-semibold text-purple-400'>Team Name</h1>
                    <div className='flex gap-2'>
                        <button>
                            <Pencil className='size-5 text-gray-400 hover:text-purple-400 duration-200' />
                        </button>
                        <button>
                            <Trash2 className='size-5 text-gray-400 hover:text-red-400 duration-200' />
                        </button>
                        <button onClick={() => setDetails(false)}>
                            <X className='size-5 text-gray-400 hover:text-black hover:scale-110 duration-200' />
                        </button>
                    </div>
                </div>
                <div className='w-full mb-4 '>
                    <h2 className='text-lg font-semibold mb-1'>Description :</h2>
                    <p className='text-gray-500 text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi vero similique numquam iste earum iusto, ratione placeat perferendis dignissimos alias unde, doloribus cupiditate doloremque nesciunt recusandae saepe ipsam et libero nulla consectetur esse. Non fugit quasi quam deleniti eaque eos?</p>
                </div>

                <div>
                    <h2 className='text-xl font-semibold border-b-2 border-purple-400 text-purple-400 mb-2'>Users List</h2>
                    <div className='w-full grid grid-cols-4 bg-purple-300 p-2 rounded-lg'>
                        <div className='bg-white w-full h-20 rounded-lg flex items-center px-2 gap-4 '>
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                                alt={"employee.name"}
                                className="size-14 rounded-full object-fit"
                            />
                            <div>
                                <h2>Name</h2>
                                <p>Role</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupDetails