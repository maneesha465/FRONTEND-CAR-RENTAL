import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { SignupPage } from "../pages/user/SignupPage";
import { LoginPage } from "../pages/user/LoginPage";
import { HomePage } from "../pages/user/HomePage";

import { CarPage } from "../pages/user/CarPage";
import { ErrorPage } from "../pages/user/ErrorPage";
import { UserAuth } from "./protectedRoutes/UserAuth";
import { AboutPage } from "../pages/user/AboutPage";
import { CardetailsPage } from "../pages/user/CardetailsPage";
import { ProfilePage } from "../pages/user/ProfilePage";
import { AdminLogin } from "../pages/admin/AdminLogin";
import { AdminAuth } from "./protectedRoutes/AdminAuth";
import { AdminLayout } from "../layouts/AdminLayout";
import { AdminHomePage } from "../pages/admin/AdminHomePage";
import { UserLayout } from "../layouts/Userlayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
  {
    path: "/user",
    element: (
      <UserAuth>
        <UserLayout />
      </UserAuth>
    ),
    children: [
      { path: "cars",
         element: <CarPage /> 
        },
      { path: "car_details/:id", 
        element: <CardetailsPage /> 
      },
      { path: "profile",
         element: <ProfilePage /> 
        },
    ],
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <AdminAuth>
        <AdminLayout />
      </AdminAuth>
    ),
    children: [
      { path: "",
         element: <AdminHomePage /> ,
        },
      // Add more admin routes here
    ],
  },
]);
