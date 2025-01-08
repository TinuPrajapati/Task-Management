import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { checkCookieValidity } from "../../utils/cookiesValidation.js";
import ShowProject from "./ShowProject.jsx";


const AllProject = () => {
  const { name } = useParams();
  const [favorite, setFavorite] = useState(false)
  const [display, setDisplay] = useState(false)
  console.log(name)
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const getData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_backend}/admin/${operation}`
  //     );
  //     if (operation === "all_users") {
  //       return setData(response.data.filter((el) => el.role_type != "Admin"));
  //     } else if (operation === "all_tasks") {
  //       return setData(response.data);
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const toggleFavorite = () => {
    setFavorite(!favorite)
  }

  const handleDisplay=()=>{
    setDisplay(!display)
  }

  const initializeDashboard = async () => {
    const isValid = await checkCookieValidity(name, navigate);
    if (isValid) {
      // getData();
    }
  };
  useEffect(() => {
    initializeDashboard();
  }, [name]);

  return (
    <div className="w-full">
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] z-50 rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <Link to={`/${name}/all_projects`} className="text-3xl font-semibold">All Projects</Link>
        <div className="flex gap-4 relative">
          <Link to={`/${name}/create_project`} className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90"> Create New Task</Link>
          <button className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90" onClick={handleDisplay}>Filter</button>
          <div className={`${display?"block":"hidden"} absolute top-[118%] right-0 bg-white rounded-md px-4 py-2 border-2 border-yellow-400 duration-200`}>
            <div className="flex items-center justify-start gap-2 mb-1">
              <input type="checkbox" name="all" id="all" />
              <label htmlFor="all">All Projects</label>
            </div>
            <div className="flex items-center justify-start gap-2 mb-1">
              <input type="checkbox" name="favorite" id="favorite" />
              <label htmlFor="favorite">Favorite Projects</label>
            </div>
            <div className="flex items-center justify-start gap-2 mb-1">
              <input type="checkbox" name="today" id="today" />
              <label htmlFor="today">Today Project</label>
            </div>
            <div className="flex items-center justify-start gap-2 mb-1">
              <input type="checkbox" name="yesterday" id="yesterday" />
              <label htmlFor="yesterday">Yesterday Project</label>
            </div>
            <div className="flex items-center justify-start gap-2 mb-1">
              <input type="checkbox" name="pending" id="pending" />
              <label htmlFor="pending">Pending Project</label>
            </div>
            <div className="flex items-center justify-start gap-2 mb-1">
              <input type="checkbox" name="complete" id="complete" />
              <label htmlFor="complete">Complete Project</label>
            </div>
            <div className="flex items-center justify-start gap-2 mb-1">
              <input type="checkbox" name="accept" id="accept" />
              <label htmlFor="accept">Accept Project</label>
            </div>
            <div className="flex items-center justify-start gap-2 mb-1">
              <input type="checkbox" name="rejected" id="rejected" />
              <label htmlFor="rejected">Rejected Project</label>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 px-4 py-10">
        <ShowProject/>
      </div>
    </div>
  );
};

export default AllProject;