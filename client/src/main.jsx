import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import { Dashboard, Project, AllUsers, CreateUser, Reports, CreateReport, Reminder, Team, CreateTeam, SendEmail, Chats, Profile, Login, ForgotPassword, YoruTodos, AssignedTodos, OwnReminder, AssignedReminder, CreateProject, EmailHistory, GroupChat } from './Pages/index.js'
import { PrimeReactProvider } from 'primereact/api'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider, useSelector } from "react-redux"
import Store from './app/store.js'

const queryClient = new QueryClient()

const AppRouter = () => {
  const user = useSelector((state) => state.user.value)
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
        <Route path="/dashboard" element={!user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="" element={!user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/todos/your" element={!user ? <YoruTodos /> : <Navigate to="/login" />} />
        <Route path="/todos/assigned" element={!user ? <AssignedTodos /> : <Navigate to="/login" />} />
        <Route path="/projects/your" element={!user ? <Project /> : <Navigate to="/login" />} />
        <Route path="/projects/create" element={!user ? <CreateProject /> : <Navigate to="/login" />} />
        <Route path="/users/all" element={!user ? <AllUsers /> : <Navigate to="/login" />} />
        <Route path="/users/create" element={!user ? <CreateUser /> : <Navigate to="/login" />} />
        <Route path="/reports/your" element={<Reports />} />
        <Route path="/reports/create" element={<CreateReport />} />
        <Route path="/reminders/your" element={<OwnReminder />} />
        <Route path="/reminders/assigned" element={<AssignedReminder />} />
        <Route path="/team-projects/tasks" element={<Team />} />
        <Route path="/team-projects/create" element={<CreateTeam />} />
        <Route path="/emails/history" element={<EmailHistory />} />
        <Route path="/emails/:person" element={<SendEmail />} />
        <Route path="chats/direct" element={<Chats />} />
        <Route path="chats/group" element={<GroupChat />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={!user ? <Navigate to="/" /> : <Login />} />
        <Route path="forget_password" element={<ForgotPassword />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <PrimeReactProvider>
          <AppRouter />
        </PrimeReactProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)

