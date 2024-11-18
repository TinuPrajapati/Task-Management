import React, { useState,useEffect } from "react";

const Task = ({ task, color,count }) => {
  return (
    <div
      className={`w-[25%] h-full flex flex-col justify-center items-center rounded-md hover:scale-y-125 hover:scale-x-105 active:scale-90 duration-500 text-3xl ${color} `}
    >
      <p>{count}</p>
      <h3 className=" font-serif">{task}</h3>
    </div>
  );
};

export default Task;
