import React from 'react';
import { Link } from 'react-router-dom';
import { DarkMode } from '../ui/DarkMode';
import { CircleUserRound } from 'lucide-react';

export const UserHeader = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between w-full px-4 sm:px-10 md:px-20 py-4 shadow-xl'>
      <div className='mb-4 sm:mb-0'>
        <Link to={"/"}>
          <h1 className='text-2xl font-bold'>
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsMUT2qeHdSkrlg7TK9FWpURYmISFuC0dv5w&s" 
              alt="logo" 
              className="w-32 sm:w-40 md:w-50 h-12 sm:h-14 md:h-16"
            />
          </h1>
        </Link>
      </div>
      <nav className='flex flex-col sm:flex-row gap-4 sm:gap-8 font-semibold'>
        <Link to={'/'}>Home</Link> 
        <Link to={'/about'}>About</Link> 
        <Link to={'/user/cars'}>Cars</Link>
      </nav>
      <div className='flex items-center gap-4 sm:gap-8 mt-4 sm:mt-0'>
        <DarkMode />
        <Link to={"/user/profile"}>
          <CircleUserRound width={30} height={30} />
        </Link>
      </div>
    </div>
  );
};
