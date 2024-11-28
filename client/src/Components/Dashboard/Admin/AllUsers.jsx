import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { checkCookieValidity } from "../../../utils/cookiesValidation.js";

const AllUsers = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_backend}/admin/all_users`
      );
      setUsers(response.data.filter((el) => el.role_type != "Admin"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      const isValid = await checkCookieValidity(name,navigate);
      if (isValid) {
        getData();
      }
    };

    initializeDashboard();
  }, [name]);

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-900 px-8 py-5 text-white flex flex-col gap-6">
      <div className="w-full h-full bg-gray-500  backdrop-blur-sm rounded-md flex flex-col">
        <div className="w-full border-b-2 h-[10%] border-white flex justify-between items-center px-10 text-2xl">
          <h1>All User</h1>
          <Link
            to={`/dashboard/admin/${name}`}
            className="w-[12%] h-[80%] bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center rounded-md active:scale-90 duration-200"
          >
            Dashboard
          </Link>
        </div>
        <div
          id="scrollbar"
          className={` ${
            users.length > 0 && "grid grid-cols-4 grid-rows-2 gap-4"
          } w-full h-[85%] px-5 overflow-y-auto mt-4`}
        >
          {users.length > 0 ? (
            users.map((el) => (
              <div className="w-full h-full bg-sky-500 flex justify-center gap-2 flex-col px-4 rounded-md text-xl">
                <p>Name : {el.name}</p>
                <p>Email : {el.email}</p>
                <p>Role : {el.role_type}</p>
                <p>Create : {new Date(el.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center text-3xl flex-col opacity-50 gap-4">
              <i class="ri-information-line text-9xl"></i>
              <h1 className="font-serif">No User Found </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
