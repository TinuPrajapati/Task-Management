import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "./Components";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] flex bg-[#f6e9ff]">
      <Sidebar />
      <main className="w-[80%] overflow-y-scroll px-4 py-5">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default App;