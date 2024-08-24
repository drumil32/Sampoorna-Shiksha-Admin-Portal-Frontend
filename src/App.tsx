import Layout from "./Components/Layouts/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HOME, LOGIN, SCHOOL } from "./utils/routes";
import School from "./Pages/School/School";
import Login from "./Pages/Login/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: HOME,
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: HOME,
          element: <Login />
        },
        {
          path: LOGIN,
          element: <Login />
        },
        {
          path: SCHOOL,
          element: <School />
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
