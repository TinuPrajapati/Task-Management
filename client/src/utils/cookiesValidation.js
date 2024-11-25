// cookiesValidation.js
import axios from "axios";
import Cookies from "js-cookie";

export const checkCookieValidity = async (username, navigate) => {
  const token = Cookies.get(import.meta.env.VITE_cookies_name);
  const backendUrl = import.meta.env.VITE_backend;

  try {
    if (!token) {
      navigate("/login");
      return false;
    }

    const response = await axios.get(`${backendUrl}/protected-route`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.username !== username) {
      navigate("/login");
      Cookies.remove(import.meta.env.VITE_cookies_name)
      return false;
    }

    return true; // Valid session
  } catch (error) {
    console.log(error);
    navigate("/login");
    return false;
  }
};
