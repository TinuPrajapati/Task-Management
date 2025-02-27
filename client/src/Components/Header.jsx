import { Bell, LogOut, SquareUserRound } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import ThemeButton from './ThemeButton';
import Avatar from "../assets/avatar-11.jpg";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import useAuthStore from '../Store/useAuthStore';

const Header = () => {
    const user = useSelector(state=>state.user.value);
    const {logout} = useAuthStore();
    const [isMenu, setIsMenu] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();


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
        <header className='w-full h-[10%] bg-white/80 backdrop-blur-xl rounded-lg py-1.5 px-2 flex justify-between items-center'>
            <div></div>
            <div className='w-[40%] h-full flex items-center justify-end gap-4 px-1'>
                <button className='flex items-center justify-center bg-purple-300 rounded-md size-8'><Bell className='size-4' /></button>
                <ThemeButton />
                <div className='relative h-full' ref={menuRef}>
                    <button onClick={() => setIsMenu(true)}>
                        {Avatar ?
                            <img src={Avatar} alt="no image" className='rounded-full size-10 object-fit' />
                            :
                            <div className='flex items-center justify-center text-xl font-bold text-white bg-purple-400 rounded-full size-12'>
                                <p>TP</p>
                            </div>
                        }
                    </button>
                    <div className={`absolute right-0 top-12 w-48 py-1 bg-white rounded-lg shadow-lg border-2 border-purple-400 ${isMenu ? "block" : "hidden"}`}>
                        <div className='flex items-center justify-center w-full h-10 mb-1 border-b-2 border-purple-400'>
                            <h2 className='text-xl font-bold'>👋 {user?.username}</h2>
                        </div>
                        <div className='w-full px-2.5 flex flex-col gap-1'>
                            <Link
                                to="/profile" className='flex items-center h-8 gap-2 px-1 text-[1rem] duration-500 hover:text-purple-400'>
                                <SquareUserRound className='size-5' /> Profile
                            </Link>
                            <button 
                            onClick={()=>logout(navigate)}
                            className='flex items-center h-8 gap-2 px-1 text-[1rem] duration-500 hover:text-purple-400'>
                                <LogOut className='size-5' />Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;