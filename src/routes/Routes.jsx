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
import { CreateCar } from "../pages/admin/CreateCar";
import { DeleteCar } from "../pages/admin/DeleteCar";
import { Carlist } from "../pages/admin/Carlist";
import { UpdateCar } from "../pages/admin/UpdateCar";

import {ReviewPage} from "../pages/user/ReviewPage.jsx";
import { CreateBooking } from "../pages/user/CreateBooking.jsx";
import { BookingDetails } from "../pages/user/BookingDetails.jsx";
import { Userlist } from "../pages/admin/Userlist.jsx";
import { Bookinglist } from "../pages/admin/Bookinglist.jsx";
import { SuccessPage } from "../pages/user/SuccessPage.jsx";
import { CancelPage } from "../pages/user/CancelPage.jsx";
import { EditProfile } from "../pages/user/EditProfile.jsx";







export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", 
        element: <HomePage /> 
      },
      { path: "about", 
        element: <AboutPage /> 
      },
      { path: "login", 
        element: <LoginPage /> 
      },
      { path: "signup", 
        element: <SignupPage /> 
      },
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
      {
         path: "cars",
         element: <CarPage /> 
        },
      { path: "car-details/:id", 
        element: <CardetailsPage /> 
      },
       
       { path: "reviews/:carId", 
        element: <ReviewPage/> 
      },
      { path: "profile",
         element: <ProfilePage /> 
        },
        
        { path: "create-booking/:id",
          element: <CreateBooking /> 
         },
         { path: "booking-details/:id",
          element: <BookingDetails /> 
         },
         
         
         { path: "success",
          element: <SuccessPage/> 
         },
          { path: "cancel",
           element: <CancelPage/> 
          },
          { path: "edit-user/:id",
            element: <EditProfile/> 
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
      { 
        path: "Home",
         element: <AdminHomePage /> ,
        },
        { path: "carlist",
          element: <Carlist /> ,
         },
        { path: "create",
          element: <CreateCar /> ,
         },
         { path: "deletecar/:id",
          element: <DeleteCar /> ,
         },
         { path: "updatecar/:id",
          element: <UpdateCar/> ,
         },
         { path: "getallusers",
          element: <Userlist/> ,
         },
         { path: "booking-details/:id",
          element: <Bookinglist/> ,
         },
    ],
  },
]);
