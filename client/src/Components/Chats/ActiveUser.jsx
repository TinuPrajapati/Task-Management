import React from 'react'

const ActiveUser = ({user, setChatUser}) => {
    const setUser = ()=>{
        setChatUser(user.name);
    }
    return (
        <div onClick={setUser}
        className={`hover:bg-black/20 w-full flex font-bold h-10 px-2 rounded-md items-center justify-between `}>
            <span>{user.name}</span>
            <span
                className={`w-3 h-3 rounded-full ${user.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                    }`}
            ></span>
        </div>
    )
}

export default ActiveUser