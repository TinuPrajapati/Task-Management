import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { AllProject, AllUsers, CreateEmployee, CreateProject, Dashboard, Login, NotFound, Report, SendEmail, Setting, Team} from "./Components/index.js";

import { Provider } from 'react-redux'
import store from "./app/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />} />
        <Route path="dashboard/:name" element={<Dashboard />} />
        <Route path=":name/all_projects" element={<AllProject />} />
        <Route path=":name/report" element={<Report />} />
        <Route path=":name/all_users" element={<AllUsers />} />
        <Route path=":name/create_user" element={<CreateEmployee />} />
        <Route path=":name/team_project" element={<Team />} />
        <Route path=":name/send_email" element={<SendEmail />} />
        <Route path=":name/setting" element={<Setting />} />
        <Route path=":name/create_project" element={<CreateProject/>}/>
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
