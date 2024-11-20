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
import {
  AdminDashboard,
  AdminTask,
  CreateEmployee,
  CreateTask,
  EditTask,
  EmployeeDashboard,
  Login,
} from "./Components/index.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      {/* Access Admin and Employee Routes */}
      <Route path="dashboard/">
        <Route path="admin/:name" element={<AdminDashboard />} />
        <Route path="employee/:name" element={<EmployeeDashboard />} />
      </Route>
      {/* Access Admin work Routes */}
      <Route path="admin/:name/">
        <Route path="assign_task" element={<CreateTask />} />
        <Route path="create_user" element={<CreateEmployee />} />
        <Route path="all_tasks" element={<AdminTask/>} />
        <Route path="edit_task/:id" element={<EditTask/>} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
