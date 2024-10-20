import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./components/pages/contactPage/ContactPage";
import Login from "./components/pages/login/Login";
import Signup from "./components/pages/signup/Signup";
import Homepage from "./components/pages/homePage/HomePage";
import Layout from "./components/Layout/Layout";
import SuccessSignup from "./components/pages/successSignup/SuccessSignup";
import OfficerDashboard from "./components/pages/officerDashboard/OfficerDashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/successSignup",
    element: <SuccessSignup />,
  },
  {
    path: "/officerdashboard",
    element: <OfficerDashboard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
