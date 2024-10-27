import "./App.css";
import Login from "./component/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./screen/Layout";
import ErrorPage from "./screen/ErrorPage";
import Dashboard from "./screen/Dashboard";
import CreateQuote from "./screen/CreateQuotePage";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/create-new-quote",
          element: <CreateQuote />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
