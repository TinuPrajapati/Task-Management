import { Outlet, useLocation } from "react-router-dom";
import Loader from "./Components/Loader.jsx";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import Sidebar from "./Components/Sidebar.jsx";
import Header from "./Components/Header";
import useAuthStore from "./api/Store/useAuthStore.js";
import useProjectStore from "./api/Store/useProjectStore.js";
import Sidebar2 from "./Components/Sidebar2.jsx";
import { useTodoStore } from "./api/Store/useTodoStore.js";

function App() {
  const { pathname } = useLocation();
  const { checkAuth, authLoader, authUser } = useAuthStore();
  const { projectLoader } = useProjectStore();
  const {todoLoader} = useTodoStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="w-[100vw] h-[100vh] flex bg-gray-500 gap-2 relative">
      {(authLoader || projectLoader || todoLoader) && <Loader />}
      {pathname === "/login" || pathname === "/forget_password" ? (
        <Outlet />
      ) : (
        <>
          {authUser?.role === "Admin" || authUser?.role === "HR" || authUser?.role === "Manager" ? (
            <Sidebar />
          ) : (
            <Sidebar2 />
          )}
          <main className="w-[80%] overflow-y-scroll px-4 py-5 flex flex-col gap-4">
            <Header />
            <Outlet />
          </main>
        </>
      )}
      <Toaster />
    </div>
  );
}

export default App;
