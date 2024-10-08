import toast, { Toaster } from 'react-hot-toast';
import { RouterProvider } from "react-router-dom";
import "./App.css";

import { router } from "./routes/Routes";


function App() {
    return (
        <>
      <RouterProvider router={router}/>
      <Toaster/>
           
        </>
    );
}

export default App;