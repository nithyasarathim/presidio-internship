import React from 'react'
import {Moon, Sun} from 'lucide-react'
const Header = () => {
  return (
    <div className='w-[100%] px-30 my-10'>
        <div className='flex justify-between'>
            <h1 className='font-bold text-2xl'>Hospital Management System</h1>
            <div className='flex align-center gap-4 items-center'>
            <Moon></Moon>
            <Sun></Sun>
            <button className="px-4 py-2 bg-sky-500 rounded-lg text-white">Login</button>
            </div>
        </div>
    </div>
  )
}

export default Header