import React, { useState, useEffect } from "react";

const Task = ({ task, color, count, img }) => {
  return (
    <div
      className={`w-full flex items-center rounded-md text-[1.2rem] gap-4 p-2 text-white ${color} `}
    >
      <img src={img} className="w-14 h-14" />
      <div>
        <h3 className="font-semibold">{task}</h3>
        <p className="text-[1.5rem]">{count}</p>
      </div>
    </div>
  );
};

export default Task;
