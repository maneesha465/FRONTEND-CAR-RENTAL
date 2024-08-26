import React from 'react'
import { Link } from 'react-router-dom'
import { DarkMode } from './ui/DarkMode'

export const Header = () => {
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
            <Link to={'user/cars'}>Cars</Link> 
        </nav>
       <div className='flex items-center gap-8'>
       <DarkMode/>
       <Link to={"/signup"}>
        <button class="btn btn-primary">join us</button>
        </Link>
    </div>
    </div>
  )
}
