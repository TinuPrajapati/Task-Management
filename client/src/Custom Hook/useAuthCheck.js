import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const useAuthCheck = (username) => {
  const navigate = useNavigate();
  const token = Cookies.get(import.meta.env.VITE_cookies_name);
  const backendUrl = import.meta.env.VITE_backend;

  const checkAuth = async () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        const response = await axios.get(`${backendUrl}/protected-route`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.username !== username) {
          navigate("/login");
          Cookies.remove(import.meta.env.VITE_cookies_name);
          return false;
        }

        return true;
      } catch (error) {
        console.log(error);
        navigate("/login");
        return false;
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, [username, token]);
};

export default useAuthCheck;
