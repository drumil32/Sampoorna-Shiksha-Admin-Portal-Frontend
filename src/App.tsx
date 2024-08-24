import Layout from "./Components/Layouts/Layout";
import LoginPage from "./Pages/Login/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HOME, LOGIN } from "./utils/routes";

function App() {
  const router = createBrowserRouter([
    {
      path: HOME,
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: HOME,
          element: <LoginPage />
        },
        {
          path: LOGIN,
          element: <LoginPage />
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
