import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { AllProject, AllUsers, CreateEmployee, CreateProject, Dashboard, Login, NotFound, Report, SendEmail, Setting, Team, Todos } from "./Components/index.js";

import { Provider } from 'react-redux'
import store from "./app/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />}>
        <Route path="dashboard/:name" element={<Dashboard />} />
        <Route path=":name/">
          <Route path="todos" element={<Todos />} />
          <Route path="all_projects" element={<AllProject />} />
          <Route path="report" element={<Report />} />
          <Route path="all_users" element={<AllUsers />} />
          <Route path="create_user" element={<CreateEmployee />} />
          <Route path="edit/:id" element={<CreateEmployee />} />
          <Route path="team_project" element={<Team />} />
          <Route path="send_email" element={<SendEmail />} />
          <Route path="setting" element={<Setting />} />
          <Route path="create_project" element={<CreateProject />} />
          <Route path="project_edit/:id" element={<CreateProject />} />
        </Route>
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
