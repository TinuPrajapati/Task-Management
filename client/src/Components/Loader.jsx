import React from 'react'
import "./CSS/Loader.css"

const Loader = () => {
    return (
        <div className='absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50'>
            <div className="bg-[#212121] p-4 rounded-md">
                <div className="loader">
                    <p className='mr-2 font-semibold text-white'>Loading ... </p>
                    <div className="words">
                        <span className="word">Project</span>
                        <span className="word">Status</span>
                        <span className="word">Today work</span>
                        <span className="word">Reports</span>
                        <span className="word">Chats</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader