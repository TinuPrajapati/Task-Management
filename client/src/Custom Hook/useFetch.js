import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

const useFetch = (name) => {
  const [next, setNext] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const response = useCallback(async () => {
    setLoading(true);
    try {
      const token = Cookies.get(import.meta.env.VITE_cookies_name);
      if (!token) {
        navigate("/login");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_backend}/protected-route`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.username === name) {
        setNext(true);
      } else {
        navigate("/login");
      }
    } catch (err) {
     
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [name]);
  useEffect(()=>{
    response();
  },[name])

  return {next,loading,error}
};

export default useFetch;
