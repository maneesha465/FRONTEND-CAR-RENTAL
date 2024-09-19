  import React from 'react'
  import { Link } from 'react-router-dom'
  import { DarkMode } from '../ui/DarkMode'


  export const AdminHeader = () => {
    return (
      <div className='flex items-center justify-between w-full h-1/2 px-20 shadow-xl'>
          <div>
          <h1 className='text-2xl font-bold'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsMUT2qeHdSkrlg7TK9FWpURYmISFuC0dv5w&s" alt="logo"  className="w-50 h-16" />
            </h1>
          </div>
          <nav className='flex gap-20 font-semibold'>
              <Link to={'/admin/home'}>Home</Link>
              <Link to={'/admin/carlist'}>Car Data</Link>
              <Link to={'/admin/create'}>Create Car</Link>
             <Link to={'/admin/getallusers'}>Users Data</Link>
         </nav>
          <div className='flex items-center gap-8'>
              <DarkMode/>
             
          </div>
      </div>
    )
  }


 