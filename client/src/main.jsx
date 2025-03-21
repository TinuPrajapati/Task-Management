import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import { Dashboard, Project, AllUsers, CreateUser, Reports, CreateReport, Reminder, Team, CreateTeam, SendEmail, Chats, Profile, Login, ForgotPassword, YoruTodos, AssignedTodos, OwnReminder, AssignedReminder, CreateProject, EmailHistory, GroupChat, AssignedProject } from './Pages/index.js'
import { PrimeReactProvider } from 'primereact/api'
import { Provider, useSelector } from "react-redux"
import Store from './app/store.js'
import ScrollToTop from './Components/Scroll.jsx'

const AppRouter = () => {
  // const user = useSelector((state) => state.user.value)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<>
        <ScrollToTop />
        <App />
      </>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todos/your" element={<YoruTodos />} />
        <Route path="/todos/assigned" element={<AssignedTodos />} />
        <Route path="/projects/your" element={<Project />} />
        <Route path="/projects/assigned" element={<AssignedProject />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/users/all" element={<AllUsers />} />
        <Route path="/users/create" element={<CreateUser />} />
        {/* <Route path="/reports/your" element={<Reports />} />
        <Route path="/reports/create" element={<CreateReport />} />
        <Route path="/reminders/your" element={<OwnReminder />} />
        <Route path="/reminders/assigned" element={<AssignedReminder />} /> */}
        <Route path="/team-projects/tasks" element={<Team />} />
        <Route path="/team-projects/create" element={<CreateTeam />} />
        <Route path="/emails/history" element={<EmailHistory />} />
        <Route path="/emails/:person" element={<SendEmail />} />
        <Route path="chats/direct" element={<Chats />} />
        {/* <Route path="chats/group" element={<GroupChat />} /> */}
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="forget_password" element={<ForgotPassword />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <PrimeReactProvider>
        <AppRouter />
      </PrimeReactProvider>
    </Provider>
  </StrictMode>
)

