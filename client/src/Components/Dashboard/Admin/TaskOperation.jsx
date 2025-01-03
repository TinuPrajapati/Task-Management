import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskOperation = ({
  text,
  formData,
  handleChange,
  handleSubmit,
  users,
}) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4 bg-gray-900 px-8 py-5 text-white ">
      <h1 className="text-3xl font-serif border-b-2">{text}</h1>
      <form
        onSubmit={handleSubmit}
        className="w-[80%] h-[90%] flex flex-col justify-center items-center gap-2"
      >
        <div className="w-full h-[20%] flex justify-between items-center">
          <div className="w-[50%] h-full flex flex-col gap-2 items-center">
            <label htmlFor="category" className="text-lg pl-3 font-serif">
              Task Category:
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-[90%] h-[80%] rounded-md text-black border-none outline-none"
            >
              <option value="">Choose Category</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="HR">HR</option>
              <option value="All Employees">All Employees</option>
            </select>
          </div>
          <div className="w-[50%] h-full flex flex-col gap-2 items-center">
            <label htmlFor="assignedTo" className="text-lg pl-3 font-serif">
              Assign To:
            </label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-[90%] h-[80%] rounded-md text-black border-none outline-none"
            >
              <option value="">Choose Employee</option>
              {(users.length>0) ? (
                users.map((el) => <option value={el.name} key={el._id}>{el.name}</option>)
              ) : 
                <option value="">No Employees Found</option>
              }
            </select>
          </div>
        </div>
        <div className="w-full h-[20%] flex justify-between items-center">
          <div className="w-[50%] h-full flex flex-col gap-2 items-center">
            <label htmlFor="taskTitle" className="text-lg pl-3 font-serif">
              Task Title:
            </label>
            <input
              type="text"
              name="taskTitle"
              placeholder="Enter Task Name"
              value={formData.taskTitle}
              onChange={handleChange}
              className="w-[90%] h-[80%] rounded-md text-black border-none outline-none px-3"
            />
          </div>
          <div className="w-[50%] h-full flex flex-col gap-2 items-center">
            <label htmlFor="completedDate" className="text-lg pl-3 font-serif">
              Completed Date:
            </label>
            <input
              type="text"
              name="completedDate"
              placeholder="Enter how much time give for this task"
              value={formData.completedDate}
              onChange={handleChange}
              className="w-[90%] h-[80%] rounded-md text-black border-none outline-none px-3"
            />
          </div>
        </div>
        <div className="w-full h-[30%] flex flex-col items-center">
          <label htmlFor="description" className="text-lg pl-3 font-serif">
            Task Description:
          </label>
          <textarea
            name="description"
            placeholder="Enter task description"
            value={formData.description}
            onChange={handleChange}
            className="w-[95%] h-[80%] rounded-md text-black border-none outline-none px-3 py-1"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-[30%] h-[15%] bg-sky-500 text-2xl font-serif rounded-md"
        >
          {text}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default TaskOperation;
