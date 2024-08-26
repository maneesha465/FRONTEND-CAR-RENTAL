import React from 'react'
import { Link } from 'react-router-dom'
import { DarkMode } from '../ui/DarkMode';

import {CircleUserRound } from 'lucide-react'

export const UserHeader = () => {
  return (
    <div className='flex items-center justify-between w-full h-32 px-20 shadow-xl'>
        <div>
            <h1 className='text-2xl font-bold'>
                logo
            </h1>
        </div>
        <nav className='flex gap-20 font-semibold'>
           <Link to={'/'}>Home</Link> 
            <Link to={'/about'}>About</Link> 
            <Link to={'/user/cars'}>cars</Link> 
            <Link to={'/user/bookings'}>Bookings</Link> 
        </nav>
       <div className='flex items-center gap-8'>
       <DarkMode/>
       
       <CircleUserRound />
    </div>
    </div>
  )
}
