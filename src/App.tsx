import Layout from "./Components/Layouts/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HOME, SIGNIN, SCHOOL } from "./utils/routes";
import School from "./Pages/School/School";
import Login from "./Pages/Login/Login";
import SchoolDetail from "./Pages/School Detail/SchoolDetail";
import ProtectedRoute from "./Components/ProtectedRouter";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: HOME,
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: HOME,
          element: <ProtectedRoute><Home /></ProtectedRoute>
        },
        {
          path: SIGNIN,
          element: <Login />
        },
        {
          path: SCHOOL,
          element: <ProtectedRoute><School /></ProtectedRoute>,
        },
        {
          path: `${SCHOOL}/:id`,
          element: <ProtectedRoute><SchoolDetail /></ProtectedRoute>,
        }
      ],
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </>
  )
}

export default App
