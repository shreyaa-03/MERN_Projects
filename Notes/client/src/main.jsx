import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./components/routes/App";
import LoginPage from "./components/UserAuth/Login/LoginPage";
import RegisterPage from "./components/UserAuth/Register/RegisterPage";
import { Provider } from "react-redux";
import store from "./store";
import EmailVerify from "./components/UserAuth/EmailVerification/EmailVerify";
import Home from "./components/Home";

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [{ path: "/", element: <App /> }] },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/email-verified",
    element: <EmailVerify />,
  },
  {
    path: "/home",
    element: <Home/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
