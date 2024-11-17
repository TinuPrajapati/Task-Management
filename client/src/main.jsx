import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./Components/Auth/Login.jsx";
import AdminDashboard from "./Components/Dashboard/AdminDashboard.jsx";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard.jsx";
import CreateTask from "./Components/Common/CreateTask.jsx";
import Signup from "./Components/Auth/signup.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />} />
      <Route path="dashboard/admin/:name" element={<AdminDashboard />} />
      <Route path="dashboard/employee/:name" element={<EmployeeDashboard />} />
      <Route path="admin/:name/assgin_task" element={<CreateTask />} />
      <Route path="admin/:name/create_user" element={<Signup />} />
    </Route>
  ),{
    future:{
      v7_startTransition: true,
    }
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
