import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeSlider } from "../../feature/menuSlice";
import { FaRegBell } from "react-icons/fa6";

const Header1 = () => {
    const [currentDate, setCurrentDate] = useState({
        day: '',
        date: ''
    });
    const menu = useSelector(state => state.menu.menuState);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        dispatch(changeSlider(!menu));
    };

    useEffect(() => {
        const updateDate = () => {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const today = new Date();
            const day = days[today.getDay()];
            const date = today.toLocaleDateString();

            setCurrentDate({ day, date });
        };

        updateDate();
    }, []);

    return (
        <header className='w-full h-[18%] bg-gradient-to-r from-sky-500 to-indigo-500  pl-4 pr-10 py-1 border-b-4 border-yellow-400'>
            <div className='w-full h-[60%] flex justify-between items-center'>
                <button
                    onClick={toggleMenu}
                    className={`text-white text-xl font-semibold py-1 px-2 rounded-md active:scale-90`}
                >
                    {menu ? <i className="ri-menu-unfold-2-line"></i> : <i className="ri-menu-fold-2-line"></i>}
                </button>
                <div className='w-[30%] h-[80%] flex items-center relative'>
                    <input
                        id='search'
                        type="text"
                        className='w-full h-full rounded-md px-2 border-none outline-none focus:ring-2 focus:ring-red-400'
                        placeholder='Search your task here...'
                    />
                    <label
                        htmlFor="search"
                        className='absolute right-1 w-[10%] h-[85%] bg-red-400 rounded-md flex justify-center items-center text-white font-xl font-semibold active:scale-90'>
                        <i className="ri-search-line"></i>
                    </label>
                </div>
                <div className='flex text-red-400 font-semibold w-[12%] h-full gap-2 items-center'>
                    <div className='w-[30%] h-[80%] flex justify-center items-center bg-white rounded-md'>
                        <FaRegBell />
                    </div>
                    <button className=''></button>
                    <div className='w-[70%] h-full flex flex-col text-[1rem]'>
                        <p className='text-white'>{currentDate.day}</p>
                        <p className='text-blue-400 font-bold'>{currentDate.date}</p>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header1;
