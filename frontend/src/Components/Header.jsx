import { Bell, LogOut, SquareUserRound } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import ThemeButton from './ThemeButton';
import Avatar from "../assets/avatar-11.jpg";

const Header = () => {
    const [isMenu, setIsMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        dispatch(changeSlider(!menu));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenu(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <header className='w-full h-[12%] bg-white/80 backdrop-blur-xl rounded-lg py-1.5 px-2 flex justify-between items-center'>
            <div></div>
            <div className='w-[40%] h-full flex items-center justify-end gap-4 px-1'>
                <button className='size-12 rounded-md bg-purple-300 flex justify-center items-center'><Bell /></button>
                <ThemeButton />
                <div className='h-full relative' ref={menuRef}>
                    <button onClick={()=>setIsMenu(true)}>
                        {Avatar ?
                            <img src={Avatar} alt="no image" className='size-12 rounded-full object-fit' />
                            :
                            <div className='size-12 rounded-full bg-purple-400 flex justify-center items-center text-xl text-white font-bold'>
                                <p>TP</p>
                            </div>
                        }
                    </button>
                    <div className={`absolute right-0 top-14 w-60 py-1 bg-white rounded-lg shadow-lg border-2 border-purple-400 ${isMenu ? "block" : "hidden"}`}>
                        <div className='w-full h-10 flex items-center justify-center border-b-2 border-purple-400 mb-1'>
                            <h2 className='text-xl font-bold'>👋 Tinu Prajapati</h2>
                        </div>
                        <div className='w-full px-2.5 flex flex-col gap-1'>
                            <div className='h-10 flex items-center gap-2 px-1 text-xl hover:text-purple-400 hover:justify-center duration-500'><SquareUserRound/> Profile</div>
                            <div className='h-10 flex items-center gap-2 px-1 text-xl hover:text-purple-400 hover:justify-center duration-500'><LogOut/>Logout</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;