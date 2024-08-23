import Layout from "./Components/Layouts/Layout";
import LoginPage from "./Pages/Login/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <LoginPage />
        },
        {
          path: "/login",
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
