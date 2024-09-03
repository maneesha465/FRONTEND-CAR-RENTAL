 import React from "react";
import { Outlet } from "react-router-dom";

import { Footer } from "../components/Footer";
import { AdminHeader } from "../components/admin/AdminHeader";

export const AdminLayout = () => {
  return (
    <div>
        <AdminHeader/>
        <div className='min-h-96'>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
};
