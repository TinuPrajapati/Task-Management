import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const Header = ({greet,name}) => {
 
  return (
    <div className="w-full h-[20%] flex justify-between items-center px-2">
      <div className="text-2xl font-serif">
        <h2>{greet}</h2>
        <h1 className="text-6xl ">{name} 👋</h1>
      </div>
      <button className="bg-red-700 text-2xl font-medium font-serif w-[12%] h-[50%] rounded-md active:scale-90 duration-500 hover:scale-110 flex justify-center items-center" 
      onClick={logout}
      >LogOut</button>
    </div>
  );
};

export default Header;
