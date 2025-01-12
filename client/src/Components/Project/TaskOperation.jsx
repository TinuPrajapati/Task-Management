import React from "react";
import "react-quill/dist/quill.snow.css";
import InputOption from "../Common/InputOption";

const TaskOperation = ({
  formData,
  handleChange,
  handleSubmit,
  users,
  id
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-3 justify-center items-center px-10 py-5 bg-white rounded-md border-2 border-yellow-400"
    >
      <div className="w-full flex justify-between gap-10">
        <InputOption
          id="priority"
          type="text"
          text="Projct priority:"
          placeholder="Enter Task priority"
          value={formData.priority}
          handleChange={handleChange}
          options={["Low", "Medium", "High"]}
        />
        <InputOption
          id="category"
          type="text"
          text="Project Category:"
          placeholder="Choose Project Category"
          value={formData.category}
          handleChange={handleChange}
          options={["Admin", "HR", "Developer", "Designer", "Employee"]}
        />
      </div>
      <div className="w-full flex justify-between items-center gap-10">
        <InputOption
          id="ProjectTitle"
          type="text"
          text="Projct Title:"
          placeholder="Enter Task Title"
          value={formData.ProjectTitle}
          handleChange={handleChange}
        />
        <div className="w-[50%] flex flex-col gap-1">
          <label htmlFor="assignedTo" className="text-lg pl-3 font-semibold">
            Assign To:
          </label>
          <select
            id="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full h-10 rounded-md text-black border-2 outline-none focus:ring-4 focus:border-sky-400 duration-200 px-2 text-lg"
          >
            <option value="">Choose Employee</option>
            {users.length > 0 ? (
              users.map((el) => (
                <option value={el.name} key={el._id}>
                  {el.name}
                </option>
              ))
            ) : (
              <option value="">No Employees Found</option>
            )}
          </select>
        </div>

      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="description" className="text-lg pl-3 font-semibold">
          Task Description:
        </label>
        <textarea id="description" value={formData.description} onChange={handleChange} className="w-[100%] h-32 rounded-md text-black border-2 outline-none focus:ring-4 focus:border-sky-400 focus:border-none duration-200 px-2 text-lg"></textarea>
      </div>
      <div className="w-full flex justify-between gap-10">

        <InputOption
          id="date"
          type="datetime-local"
          text="Project Deadline:"
          value={formData.date}
          handleChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-[20%] h-12 bg-sky-500 text-2xl font-semibold rounded-md text-white active:scale-90 focus:ring-2 focus:ring-yellow-400 mt-2"
      >
        {id?"Edit Project":"Add Project"}
      </button>
    </form>
  );
};

export default TaskOperation;
