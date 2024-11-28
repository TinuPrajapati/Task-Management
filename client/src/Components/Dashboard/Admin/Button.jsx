import React,{useState} from "react";

const Button = ({name,task,handleDelete,navigate}) => {
  const [show, setShow] = useState(false);
  const display = (e) => {
    setShow(!show);
  };
  return (
    <div className="relative">
      <button onClick={display}>
        <i class="ri-more-2-line text-2xl"></i>
      </button>
      <div
        className={`${
          show ? "block" : "hidden"
        } flex flex-col items-start gap-2 absolute right-2 bg-white text-black px-2 py-2 rounded-md`}
      >
        <button
          onClick={() => navigate(`/admin/${name}/edit_task/${task._id}`)}
          className="w-20 px-2 py-1 rounded-md active:scale-75 hover:bg-gradient-to-b from-pink-500 to-orange-400 hover:text-white hover:font-serif "
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="w-20 px-2 py-1 rounded-md active:scale-75 hover:bg-gradient-to-b from-pink-500 to-orange-400 hover:text-white hover:font-serif "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Button;
