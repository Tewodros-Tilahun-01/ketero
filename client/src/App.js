import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./components/pages/contactPage/ContactPage";
import Login from "./components/pages/login/Login";
import Signup from "./components/pages/signup/Signup";
import Homepage from "./components/pages/homePage/HomePage";
import Layout from "./components/Layout/Layout";
import SignUpSuccess from "./components/pages/signUpSuccess/SignUpSuccess";
import OfficerDashboard from "./components/pages/officerDashboard/OfficerDashboard";
import CustomerDashboard from "./components/pages/customerdashboard/CustomerDashboard";
import DashBoardLayout from "./components/dashboardLayout/DashBoardLayout";
import Meeting from "./components/meeting/Meeting";
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
    path: "/signUpSuccess",
    element: <SignUpSuccess />,
  },
  {
    path: "/officerdashboard",
    element: <DashBoardLayout />,
    children: [
      {
        path: "availability",
        element: <OfficerDashboard />,
      },
      {
        path: "meeting",
        element: <Meeting />,
      },
    ],
  },
  {
    path: "/customerdashboard",
    element: <DashBoardLayout />,
    children: [
      {
        path: "availability",
        element: <CustomerDashboard />,
      },
      {
        path: "meeting",
        element: <Meeting />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
