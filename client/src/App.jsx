import { Outlet, useLocation,useParams } from "react-router-dom";
import Header1 from "./Components/Header/Header";
import SiderBar from "./Components/Header/SiderBar";
import { useSelector } from "react-redux";
import Loader from "./Components/Common/Loader";
import 'remixicon/fonts/remixicon.css';
import useAuthCheck from "./Custom Hook/useAuthCheck";

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const loader = useSelector(state => state.loader.loaderState);
  const menu = useSelector(state => state.menu.menuState);

  return (
    <div
      className={`w-[100vw] h-[100vh] flex font-Nuntio bg-gray-200`}
    >
      {loader && <Loader />}

      {pathname === "/login" ? (
        <Outlet />
      ) : (
        <>
          <SiderBar />
          <main className={`h-full relative ${menu ? "w-[85%]" : "w-[95%]"} overflow-y-scroll relative`}>
            <Header1 />
            <div className="w-full">
              <Outlet />
            </div>
          </main>
        </>
      )}
    </div>
  );
}