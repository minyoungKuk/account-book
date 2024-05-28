import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AccountProvider } from "../context/AccountContext";
import DetailPage from "../pages/DetailPage/DetailPage";
import HomePage from "../pages/HomePage/HomePage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/detail/:detailId",
        element: <DetailPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <AccountProvider>
      <RouterProvider router={router} />
    </AccountProvider>
  );
};

export default AppRouter;
