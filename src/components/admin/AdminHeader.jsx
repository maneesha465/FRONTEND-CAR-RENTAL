  import React from 'react'
  import { Link } from 'react-router-dom'
  import { DarkMode } from '../ui/DarkMode'
  import { CircleUserRound } from 'lucide-react'

  export const AdminHeader = () => {
    return (
      <div className='flex items-center justify-between w-full h-1/2 px-20 shadow-xl'>
          <div>
          <h1 className='text-2xl font-bold'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsMUT2qeHdSkrlg7TK9FWpURYmISFuC0dv5w&s" alt="logo"  className="w-50 h-16" />
            </h1>
          </div>
          <nav className='flex gap-20 font-semibold'>
              <Link to={'/'}>Home</Link>
              <Link to={'/admin/add'}>Add Car</Link>
              <Link to={'/admin/delete'}>Delete Car</Link>
              <Link to={'/'}>Update Car</Link>
          </nav>
          <div className='flex items-center gap-8'>
              <DarkMode/>
              <Link to={"/user/profile"}>
                    <CircleUserRound  width={30} height={30}/>
                </Link>
          </div>
      </div>
    )
  }


 //import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { adminLogout } from "../../services/adminApi";
// import toast from "react-hot-toast";

// export const AdminHeader = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await adminLogout();
//       toast.success("Logout successful");
//       navigate("/admin-login");
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   };

//   return (
//     <header className="p-4 bg-gray-800 text-white">
//       <nav className="flex justify-between items-center">
//         <Link to="/admin" className="text-xl font-bold">
//           Admin Dashboard
//         </Link>
//         <button onClick={handleLogout} className="btn btn-danger">
//           Logout
//         </button>
//       </nav>
//     </header>
//   );
// };
