import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { Todo,Dashboard, Project, AllUsers, CreateUser,  } from './Pages/index.js'
import { PrimeReactProvider } from 'primereact/api';

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Dashboard />} />
      <Route path="todos" element={<Todo />} />
      <Route path="projects" element={<Project />} />
      <Route path="users" element={<AllUsers />} />
      <Route path="create_user" element={<CreateUser />} />
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
