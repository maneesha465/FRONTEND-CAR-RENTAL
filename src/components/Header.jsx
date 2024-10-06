import React from 'react';
import { Link } from 'react-router-dom';
import { DarkMode } from './ui/DarkMode';

export const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-xl px-4 sm:px-10 md:px-20 py-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Dropdown for mobile */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/user/cars">Cars</Link>
                </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
        {/* Logo */}
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsMUT2qeHdSkrlg7TK9FWpURYmISFuC0dv5w&s"
            alt="logo"
            className="w-32 sm:w-40 md:w-50 h-12 sm:h-14 md:h-16"
          />
        </Link>
      </div>

      {/* Navbar Center for larger screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/user/cars">Cars</Link>
                </li>
        
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-4">
        <DarkMode />
        <Link to={"/signup"}>
          <button className="btn btn-primary">Login</button>
        </Link>
      </div>
    </div>
  );
};
