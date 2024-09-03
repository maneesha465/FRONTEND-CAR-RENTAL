import React from 'react'
import { Link } from 'react-router-dom'
import { DarkMode } from './ui/DarkMode'

export const Header = () => {
  return (
    <div className='flex items-center justify-between w-full h-1/2 px-20 shadow-xl'>
        <div>
            <h1 className='text-2xl font-bold'>
            <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsMUT2qeHdSkrlg7TK9FWpURYmISFuC0dv5w&s" alt="logo" className="w-50 h-16"/>
            </h1>
        </div>
        <nav className='flex gap-20 font-semibold'>
           <Link to={'/'}>Home</Link> 
            
            <Link to={'/about'}>About</Link> 
            <Link to={'user/cars'}>Cars</Link> 
            
        </nav>
       <div className='flex items-center gap-8'>
       <DarkMode/>
       <Link to={"/signup"}>
        <button className="btn btn-primary">Login</button>
        </Link>
    </div>
    </div>
  )
}
