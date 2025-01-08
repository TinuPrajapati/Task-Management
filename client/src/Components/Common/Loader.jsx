import React from 'react'

const Loader = () => {
    return (
        <div className='w-full h-full flex justify-center items-center absolute top-0 left-0 bg-black/15'>
            <div class="bg-[#212121] p-4 rounded-md">
                <div class="loader">
                    <p className='text-white font-semibold mr-2'>Loading ... </p>
                    <div class="words">
                        <span class="word">Project</span>
                        <span class="word">Status</span>
                        <span class="word">Today work</span>
                        <span class="word">Reports</span>
                        <span class="word">Chats</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader