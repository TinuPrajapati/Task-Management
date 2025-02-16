import { Outlet, useLocation } from "react-router-dom";
import { Header, Sidebar } from "./Components";
import { Login } from "./Pages";
import { useSelector } from "react-redux";
import Loader from "../src/Components/Loader";

function App() {
  const { pathname } = useLocation();
  const loader = useSelector((state) => state.loader.value);
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
          </main></>}
    </div>
  );
}

export default App;