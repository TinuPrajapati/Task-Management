import React from 'react'
import "./CSS/Loader.css"

const Loader = () => {
    return (
        <div className='absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50'>
            <div class="bg-[#212121] p-4 rounded-md">
                <div class="loader">
                    <p className='mr-2 font-semibold text-white'>Loading ... </p>
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