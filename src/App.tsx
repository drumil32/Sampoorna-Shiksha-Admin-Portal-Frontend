import Layout from "./Components/Layouts/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HOME,
  SIGNIN,
  SCHOOL,
  CART,
  ORDER_HISTORY,
  ORDER_DETAILS,
  ADD_TOY,
  UPDATE_TOY
} from "./utils/routes";
import School from "./Pages/School/School";
import Login from "./Pages/Login/Login";
import SchoolDetail from "./Pages/School Detail/SchoolDetail";
import ProtectedRoute from "./Components/ProtectedRouter";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/cart/Cart";
import OrderHistory from "./Pages/Order History/OrderHistory";
import OrderDetails from "./Pages/Order Details/OrderDetails";
import AddToy from "./Pages/AddToy/AddToy";
import UpdateToy from "./Pages/Update Toy/UpdateToy";
function App() {
  const router = createBrowserRouter([
    {
      path: HOME,
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: HOME,
          element: (
            <ProtectedRoute><Home /></ProtectedRoute>
          ),
        },
        {
          path: SIGNIN,
          element: <Login />,
        },
        {
          path: SCHOOL,
          element: (
            <ProtectedRoute><School /></ProtectedRoute>
          ),
        },
        {
          path: `${SCHOOL}/:id`,
          element: (
            <ProtectedRoute> <SchoolDetail /></ProtectedRoute>
          ),
        },
        {
          path: CART,
          element: (
            <ProtectedRoute> <Cart /></ProtectedRoute>
          ),
        },
        {
          path: ORDER_HISTORY,
          element: (
            <ProtectedRoute><OrderHistory /></ProtectedRoute>
          ),
        },

        {
          path: ORDER_DETAILS,
          element: (
            <ProtectedRoute> <OrderDetails /></ProtectedRoute>
          ),
        },

        {
          path: ADD_TOY,
          element: (
            <ProtectedRoute><AddToy title="Add Toy" /></ProtectedRoute>
          ),
        },

        {
          path: UPDATE_TOY,
          element: (
            <ProtectedRoute><UpdateToy /></ProtectedRoute>
          ),
        },
      ],
    },
  ]);

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
