import React,{useState} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TaskOperation = ({ text, formData, handleChange, handleSubmit, users }) => {
  const [value, setValue] = useState('');
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-3 justify-center items-center gap- px-10 py-5 bg-white rounded-md border-2 border-yellow-400 "
    >
      <div className="w-full flex justify-between items-center gap-10">
        <div className="w-[50%] h-full flex flex-col gap-1">
          <label htmlFor="category" className="text-lg pl-3 font-semibold">
            Task Category:
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-[100%] h-10 rounded-md text-black border-2 outline-none focus:ring-4 focus:border-sky-400 focus:border-none duration-200 px-2 text-lg"
          >
            <option value="">Choose Category</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="HR">HR</option>
            <option value="All">All Employees</option>
          </select>
        </div>
        <div className="w-[50%] h-full flex flex-col gap-1">
          <label htmlFor="assignedTo" className="text-lg pl-3 font-semibold">
            Assign To:
          </label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-[100%] h-10 rounded-md text-black border-2 outline-none focus:ring-4 focus:border-sky-400 focus:border-none duration-200 px-2 text-lg"
          >
            <option value="">Choose Employee</option>
            {(users.length > 0) ? (
              users.map((el) => <option value={el.name} key={el._id}>{el.name}</option>)
            ) :
              <option value="">No Employees Found</option>
            }
          </select>
        </div>
      </div>
      <div className="w-full flex justify-between gap-10">
        <div className="w-[50%] h-full flex flex-col gap-1">
          <label htmlFor="taskTitle" className="text-lg pl-3 font-semibold">
            Task Title:
          </label>
          <input
            type="text"
            name="taskTitle"
            placeholder="Enter Task Name"
            value={formData.taskTitle}
            onChange={handleChange}
            className="w-[100%] h-10 rounded-md text-black border-2 outline-none focus:ring-4 focus:border-sky-400 focus:border-none duration-200 px-2 text-lg"
          />
        </div>
        <div className="w-[50%] h-full flex flex-col gap-1">
          <label htmlFor="completedDate" className="text-lg pl-3 font-semibold">
            Deadline Date:
          </label>
          <input
            type="Date"
            name="completedDate"
            placeholder="Enter how much time give for this task"
            value={formData.completedDate}
            onChange={handleChange}
            className="w-[100%] h-10 rounded-md text-black border-2 outline-none focus:ring-4 focus:border-sky-400 focus:border-none duration-200 px-2 text-lg"
          />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="description" className="text-lg pl-3 font-semibold">
          Task Description:
        </label>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          className='h-40'
        />
      </div>
      <button
        type="submit"
        className="w-[20%] h-12 bg-sky-500 text-2xl font-semibold rounded-md text-white active:scale-90 focus:ring-2 focus:ring-yellow-400 mt-12"
      >
        Add Project
      </button>
    </form>
  );
};

export default TaskOperation;
