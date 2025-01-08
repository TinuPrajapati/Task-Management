import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ShowUsers from "./ShowUsers.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeState } from "../../feature/loaderSlice.js";

const AllUsers = () => {
  const { name } = useParams();
  const [users, setUsers] = useState([]);
  const token = Cookies.get(import.meta.env.VITE_cookies_name)
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    dispatch(changeState(true))
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_backend}/admin/delete_user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      toast.success(response.data);
      getData();
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }finally{
      dispatch(changeState(false))
    }
  }
  const handlefavorite = async (id,favorite) => {
    dispatch(changeState(true))
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_backend}/admin/user_favorite`,{id,favorite}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      toast.success(response.data);
      getData();
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }finally{
      dispatch(changeState(false))
    }
  }

  const getData = async () => {
    dispatch(changeState(true))
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_backend}/admin/all_users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(changeState(false))
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full px-4 py-8 flex flex-col gap-6 bg-gray-200">
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <Link to={`/${name}/all_users`} className="text-3xl font-semibold">All User</Link>
        <div className="flex gap-4">
          <Link to={`/${name}/create_user`} className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90"> Create New User</Link>
          <button className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90">Filter</button>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-4 ">
        {users.map((el) => (
          <ShowUsers el={el} handleDelete={handleDelete} handlefavorite={handlefavorite} />
        ))}
      </div>
      <ToastContainer/>
    </div>  
  );
};

export default AllUsers;
