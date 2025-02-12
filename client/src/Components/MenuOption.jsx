import React, { useState } from 'react'
import { NavLink,Link, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'

const MenuOption = ({item  }) => {
    const {pathname} = useLocation();
    const [expandedItems, setExpandedItems] = useState(false);
    return (
        <div key={item.title} className="mb-2">
            <button

                onClick={() => setExpandedItems(!expandedItems)}
                className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 transition-all cursor-pointer ${(pathname === '/' && item.title === 'Home') ? 'bg-purple-100 text-purple-600' : 'text-gray-700'}`}
            >
                <Link
                to={item.title === 'Home' && '/' }
                 className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                </Link>
                {item.subItems && (
                    expandedItems ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                )}
            </button>

            {/* Sub Items */}
            {expandedItems && (
                <div className="ml-9 mt-1 space-y-2 transition-all flex flex-col">
                    {item.subItems.map((subItem) => (
                        <NavLink
                            key={subItem.name}
                            to={subItem.link} // Add an appropriate route here
                            className={({ isActive }) => `w-full h-10 text-left text-sm  px-3 py-2 rounded-lg transition-all duration-200 text-gray-700 ${isActive ? "border-2 bg-purple-100 text-purple-600" : "hover:bg-purple-500 hover:text-white"} flex items-center`}
                        >
                            {subItem.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MenuOption