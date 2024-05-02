
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import GuestGuard from './layouts/GuestGuard';
import AuthLayout from './layouts/AuthLayout';
import ErrorPage from './pages/ErrorPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
// import AuthGuard from './layouts/AuthGuard';
// import DashboardLayout from './layouts/DashboardLayout';


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
    ]
  },
  {
    path: '*',
    // element: (<AuthGuard><DashboardLayout /></AuthGuard>),
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />
        // element: (<div className='w-full h-screen text-green-500 bg-primary'>This is the signup page</div>)
      },
    ]
  }
]);


export default function App() {

  return (
    <HelmetProvider >
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
