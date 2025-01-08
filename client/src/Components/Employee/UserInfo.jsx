import React from 'react'
import { useSelector } from 'react-redux';

const UserInfo = () => {
    const menu = useSelector(state => state.menu.menuState);
    return (
        <div className="w-full h-full bg-white border-2 border-red-400 rounded-md px-6 py-2 overflow-y-visible">
            <div className='w-full mb-4'>
                <h2 className={`${menu ? "p-0" : "pl-6"} text-[1.8rem] font-semibold`}>Account Information</h2>
                <div className={`h-[0.2rem] bg-red-400 rounded-md ${menu ? "w-[30%]" : "w-[25%]"}`}></div>
            </div>

            <div className='w-full flex gap-2 items-center mb-4'>
                <div className='w-24 h-24 bg-sky-400 rounded-lg'></div>
                <div>
                    <h3 className='text-xl font-semibold'>Tinu Parjapati</h3>
                    <p className='text-lg opacity-50'>tinu.parjapati@gmail.com</p>
                </div>
            </div>

            <div className='w-full flex justify-between gap-2'>
                <div className='w-[40%] border-2 py-2 px-4 rounded-md border-red-400'>
                    <div className='w-[100%] h-10 flex items-center text-lg'>
                        <p className='w-[55%]'>Phone Number :</p>
                        <p>XXXXX-XXXXX</p>
                    </div>
                    <div className='w-[100%] h-10 flex items-center text-lg'>
                        <p className='w-[55%]'>Role :</p>
                        <p>Developer</p>
                    </div>
                    <div className='w-[100%] h-10 flex items-center text-lg'>
                        <p className='w-[55%]'>Total All Task :</p>
                        <p>00</p>
                    </div>
                    <div className='w-[100%] h-10 flex items-center text-lg'>
                        <p className='w-[55%]'>Total Complete Task :</p>
                        <p>00</p>
                    </div>
                </div>
                <div className='w-[40%] flex flex-col items-end gap-2 text-white text-lg font-semibold'>
                    <button className='h-10 bg-red-400 w-[50%] rounded-md active:scale-90 duration-200'>Change Details</button>
                    <button className='h-10 bg-red-400 w-[50%] rounded-md active:scale-90 duration-200'>Change Password</button>
                </div>
            </div>
        </div>
    )
}

export default UserInfo