// import { RouterProvider } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./App.css";
// import { RootLayout } from "./layouts/RootLayout";
// import { HomePage } from "./pages/user/HomePage";
import { router } from "./routes/Routes";
// import { Toaster } from "react-hot-toast";
// import { router } from "./routes/Routes";

function App() {
    return (
        <>
      <RouterProvider router={router}/>
            {/* <RouterProvider router={router} /> */}
            {/* <Toaster/> */}
        </>
    );
}

export default App;