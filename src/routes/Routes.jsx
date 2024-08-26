
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { SignupPage } from "../pages/user/SignupPage";
import { LoginPage } from "../pages/user/LoginPage";
import { HomePage } from "../pages/user/HomePage";
import { UserLayout } from "../layouts/Userlayout";
import { CarPage } from "../pages/user/CarPage";
import { CardetailsPage } from "../pages/user/CardetailsPage";
import { ErrorPage } from "../pages/user/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
         element: <RootLayout />,
         errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage/>,
            },
            {
                path: "about",
                element: <h1>About Page</h1>,
            },
            {
                path: "login",
                element: <LoginPage/>,
            },
            {
                path: "signup",
                element: <SignupPage/>,
            },
        ],
    },

    {
        path : "/user",
        element : <UserLayout/>,
  
    children : [
       
        {
            path : 'cars',
            element:<CarPage/>,
            
        },
        {
            path : 'car_details/:id',
            element : <CardetailsPage/>,
        },
    ],
},
],
);
//     {
//         path: "user",
//         element: (
//             <UserAuth>
//                 <UserLayout />
//             </UserAuth>
//         ),
//         children: [
//             {
//                 path: "course",
//                 element: <CoursePage />,
//             },
//             {
//                 path: "profile",
//                 element: <ProfilePage />,
//             },
//             {
//                 path: "my-learnings",
//                 element: <h1>Learning dashboard</h1>,
//             },
//             {
//                 path: "course-details/:id",
//                 element: <CourseDetailsPage />,
//             },
//             {
//                 path: "cart",
//                 element: <CartPage />,
//             },
//             {
//                 path: "payment/success",
//                 element: <Success />,
//             },
//             {
//                 path: "payment/cancel",
//                 element: <Cancel />,
//             },
//         ],
//     },
//     {
//         path: "instructor-login",
//         element: <InstructorLoginPage />,
//     },
//     {
//         path: "instructor",
//         element: (
//             <UserAuth>
//                 <UserLayout />
//             </UserAuth>
//         ),
//         children: [
//             {
//                 path: "course",
//                 element: <CoursePage />,
//             },
//             {
//                 path: "profile",
//                 element: <ProfilePage />,
//             },
//             {
//                 path: "course-details/:id",
//                 element: <CourseDetailsPage />,
//             },
//             {
//                 path: "create-course",
//                 element: <CreateCoursePage />,
//             },
//         ],
//     },
// ]);