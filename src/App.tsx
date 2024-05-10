
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import GuestGuard from './layouts/GuestGuard';
import AuthLayout from './layouts/AuthLayout';
import ErrorPage from './pages/ErrorPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import AuthGuard from './layouts/AuthGuard';
import DashboardLayout from './layouts/DashboardLayout';
import { Toaster } from './components/ui/toaster';
import CreateDepartment from './pages/CreateDepartment';
import ProfileHome from './pages/ProfileHome';
import Courses from './pages/Courses';
import TaskPage from './components/tasks';


const router = createBrowserRouter([
  {
    path: 'auth',
    element: (<GuestGuard><AuthLayout /></GuestGuard>),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AuthPage />
      },
      {
        path: 'login',
        element: <AuthPage />
      },
    ]
  },
  {
    path: '*',
    element: (<AuthGuard><DashboardLayout /></AuthGuard>),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProfileHome />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'courses',
        element: <Courses />
      },
      {
        path: 'students',
        element: <></>
      },
      {
        path: 'results',
        element: <></>
      },
      {
        path: 'tasks',
        element: <TaskPage />
      },
      {
        path: 'createDepartment',
        element: <CreateDepartment />
      }
    ]
  }
]);


export default function App() {

  return (
    <HelmetProvider >
      <RouterProvider router={router} />
      <Toaster />
    </HelmetProvider>
  )
}
