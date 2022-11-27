import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { MainLayout } from "./layouts/main-layout/MainLayout";
import { NotFound } from "./pages/error-page/NotFound";
import { HomePage } from "./pages/home-page/HomePage";
import { LoginPage } from "./pages/login-page/LoginPage";
import { EventPage } from "./pages/event-page/EventPage";
import { ChooseRole } from "./pages/login-page/ChooseRole";
import { OrganizationPage } from "./pages/organization-page/OrganizationPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events/:eventId",
        element: <EventPage />,
      },
      {
        path: "organizations/:organizationId",
        element: <OrganizationPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/choose-role",
    element: <ChooseRole />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <RouterProvider router={router} />
        <ToastContainer />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
