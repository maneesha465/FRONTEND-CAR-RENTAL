import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DarkMode } from '../ui/DarkMode';
import { CircleUserRound } from 'lucide-react';
import { ProfilePage } from '../../pages/user/ProfilePage';

export const UserHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent click event from bubbling up
    setDropdownVisible(!dropdownVisible);
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = () => {
      if (dropdownVisible) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div className="navbar bg-base-100 shadow-xl px-4 sm:px-10 md:px-20 relative">
      {/* Navbar Start */}
      <div className="navbar-start">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to={'/user/home'}>Home</Link></li>
            <li><Link to={'/user/about'}>About</Link></li>
            <li><Link to={'/user/cars'}>Cars</Link></li>
          </ul>
        </div>
        <Link to="/user/home" className="btn btn-ghost normal-case text-xl">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsMUT2qeHdSkrlg7TK9FWpURYmISFuC0dv5w&s"
            alt="logo"
            className="w-50 h-16 pb-2"
          />
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to={'/user/home'}>Home</Link></li>
          <li><Link to={'/user/about'}>About</Link></li>
          <li><Link to={'/user/cars'}>Cars</Link></li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end relative">
        <div className="flex items-center gap-4">
          <DarkMode />
          <div onClick={toggleDropdown} className="cursor-pointer">
            <CircleUserRound width={30} height={30} />
          </div>
        </div>

        {dropdownVisible && (
          <div className="absolute top-14 right-0 z-50 bg-white shadow-lg rounded-md p-4 w-64">
            <ProfilePage />
          </div>
        )}
      </div>
    </div>
  );
};
