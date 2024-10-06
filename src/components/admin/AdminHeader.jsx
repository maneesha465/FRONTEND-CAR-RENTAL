import React from 'react';
import { Link } from 'react-router-dom';
import { DarkMode } from '../ui/DarkMode';

export const AdminHeader = () => {
  return (
    <div className="navbar bg-base-100 shadow-xl">
      {/* Navbar Start - Logo and Dropdown for small screens */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to={'/admin/home'}>Home</Link></li>
            <li><Link to={'/admin/carlist'}>Car Data</Link></li>
                <li><Link to={'/admin/create'}>Create Car</Link></li>
                <li><Link to={'/admin/getallusers'}>Users Data</Link></li>
           
          </ul>
        </div>
        <Link to="/admin/home" className="btn btn-ghost text-xl">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsMUT2qeHdSkrlg7TK9FWpURYmISFuC0dv5w&s" alt="logo" className="w-50 h-16" />
        </Link>
      </div>

      {/* Navbar Center - Links for large screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">
          <li><Link to={'/admin/home'}>Home</Link></li>
          <li><Link to={'/admin/carlist'}>Car Data</Link></li>
          <li><Link to={'/admin/create'}>Create Car</Link></li>
          <li><Link to={'/admin/getallusers'}>Users Data</Link></li>
          
        </ul>
      </div>

      {/* Navbar End - Dark Mode Toggle */}
      <div className="navbar-end">
        <DarkMode />
      </div>
    </div>
  );
};
