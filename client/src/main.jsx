import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import {  Dashboard, Project, AllUsers, CreateUser, Reports, CreateReport, Reminder, Team, CreateTeam, SendEmail, Chats, Profile, Login, ForgotPassword, YoruTodos, AssignedTodos, OwnReminder, AssignedReminder, } from './Pages/index.js'
import { PrimeReactProvider } from 'primereact/api';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Dashboard />} />
      <Route path="/todos/your" element={<YoruTodos />} />
      <Route path="/todos/assigned" element={<AssignedTodos />} />
      <Route path="/projects/your" element={<Project />} />
      <Route path="/users/all" element={<AllUsers />} />
      <Route path="/users/create" element={<CreateUser />} />
      <Route path="create_user" element={<CreateUser />} />
      <Route path="/reports/your" element={<Reports />} />
      <Route path="/reports/create" element={<CreateReport />} />
      <Route path="/reminders/your" element={<OwnReminder />} />
      <Route path="/reminders/assigned" element={<AssignedReminder />} />
      <Route path="/team-projects/tasks" element={<Team />} />
      <Route path="/team-projects/create" element={<CreateTeam />} />
      <Route path="/emails/:person" element={<SendEmail />} />
      <Route path="chats" element={<Chats />} />
      <Route path="profile" element={<Profile />} />
      <Route path="Login" element={<Login />} />
      <Route path="forget_password" element={<ForgotPassword />} />
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
