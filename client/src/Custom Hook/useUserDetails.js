import axios from "axios";
import Cookies from "js-cookie";

const useUserDetails = async (role) => {
       
  const token = Cookies.get(import.meta.env.VITE_cookies_name);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_backend}/admin/users/${role}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default useUserDetails;     
