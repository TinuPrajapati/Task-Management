import { Outlet, useLocation } from "react-router-dom";
import { Header, Sidebar } from "./Components";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../src/Components/Loader";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { changeUser } from "./Features/userSlice";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader.value);
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user) dispatch(changeUser(user));
  },[])
  
  return (
    <div className="w-[100vw] h-[100vh] flex bg-[#f6e9ff] gap-2 relative">
      {loader && <Loader />}
      {pathname == "/login" || pathname == "/forget_password" ? <Outlet />
        :
        <>
          <Sidebar />
          <main className="w-[80%] overflow-y-scroll px-4 py-5 flex flex-col gap-4">
            <Header />
            <Outlet />
          </main>
        </>
      }
      <Toaster />
    </div>
  );
}

export default App;