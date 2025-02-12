import { Outlet, useLocation } from "react-router-dom";
import { Header, Sidebar } from "./Components";
import { Login } from "./Pages";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="w-[100vw] h-[100vh] flex bg-[#f6e9ff]">
      {pathname == "/login" || pathname == "/forget_password" ? <Outlet /> 
      :
        <>
          <Sidebar />
          <main className="w-[80%] overflow-y-scroll px-4 py-5 flex flex-col gap-2">
            <Header />
            <Outlet />
          </main></>}
    </div>
  );
}

export default App;