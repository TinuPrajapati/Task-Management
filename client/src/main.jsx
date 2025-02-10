import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { Todo, Dashboard, Project, AllUsers, CreateUser, Reports, CreateReport, Reminder, Team, CreateTeam, SendEmail, Chats, Profile, } from './Pages/index.js'
import { PrimeReactProvider } from 'primereact/api';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Dashboard />} />
      <Route path="todos" element={<Todo />} />
      <Route path="projects" element={<Project />} />
      <Route path="users" element={<AllUsers />} />
      <Route path="create_user" element={<CreateUser />} />
      <Route path="reports" element={<Reports />} />
      <Route path="create_report" element={<CreateReport />} />
      <Route path="reminder" element={<Reminder />} />
      <Route path="team_project" element={<Team />} />
      <Route path="create_team_project" element={<CreateTeam />} />
      <Route path="send_email" element={<SendEmail />} />
      <Route path="chats" element={<Chats />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </StrictMode>,
)
