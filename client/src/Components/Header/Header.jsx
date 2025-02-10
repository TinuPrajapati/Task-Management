import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeSlider } from "../../feature/menuSlice";
import { FaRegBell } from "react-icons/fa6";

const Header = () => {
    const [isMenu, setIsMenu] = useState(false);
    const menu = useSelector(state => state.menu.menuState);
    const dispatch = useDispatch();
    const menuRef = useRef(null);

    const toggleMenu = () => {
        dispatch(changeSlider(!menu));
    };

    // Close menu when clicking outside
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
        <header className='w-full h-[18%] bg-gradient-to-r from-sky-500 to-indigo-500 pl-4 pr-10 py-1 border-b-4 border-yellow-400'>
            <div className='w-full h-[60%] flex justify-between items-center'>
                <button
                    onClick={toggleMenu}
                    className="text-white text-xl font-semibold py-1 px-2 rounded-md active:scale-90"
                >
                    {menu ? <i className="ri-menu-unfold-2-line"></i> : <i className="ri-menu-fold-2-line"></i>}
                </button>

                <div className='flex font-semibold h-full gap-2 items-center'>
                    <div className='w-10 h-10 flex justify-center items-center rounded-full text-white'>
                        <FaRegBell className='size-6'/>
                    </div>

                    {/* Profile Menu */}
                    <div className='relative' ref={menuRef}>
                        <button 
                            onClick={() => setIsMenu(prev => !prev)}
                            className='size-10 bg-white rounded-full text-black'
                        >
                            Tinu
                        </button>
                        {isMenu && (
                            <div className="absolute top-[110%] right-0 z-20 w-28 bg-sky-400 px-2 py-3 rounded-lg">
                                <button className='bg-white w-full py-1 rounded-md text-lg text-black mb-2 active:scale-90'>Profile</button>
                                <button className='bg-white w-full py-1 rounded-md text-lg text-black font-semibold active:scale-90'>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

{/* <div className='w-full h-[10%] flex flex-col justify-center items-center'>
{menu ? <h2 className='text-[1.2rem] font-semibold'>Task Manager</h2> : <img src={logo2} className='w-10 h-10' />}
</div> */}