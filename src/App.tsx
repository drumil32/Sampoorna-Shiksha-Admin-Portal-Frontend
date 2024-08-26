import Layout from "./Components/Layouts/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HOME, SIGNIN, SCHOOL } from "./utils/routes";
import School from "./Pages/School/School";
import Login from "./Pages/Login/Login";
import SchoolDetail from "./Pages/School Detail/SchoolDetail";
import ProtectedRoute from "./Components/ProtectedRouter";

function App() {
  const router = createBrowserRouter([
    {
      path: HOME,
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: HOME,
          element: <School />
        },
        {
          path: SIGNIN,
          element: <Login />
        },
        {
          path: SCHOOL,
          element: <ProtectedRoute><School /></ProtectedRoute>,
          children: [
            {
              element: <School />
            },
            {
              path: `${SCHOOL}/:id`,
              element: <ProtectedRoute><SchoolDetail /></ProtectedRoute>,
            }
          ]
        }
      ],
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
