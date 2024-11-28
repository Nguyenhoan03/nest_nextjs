import React from 'react'
import Image from 'next/image'
import { NavigationMenuDemo } from './Navbar'
import { CiSearch } from "react-icons/ci";
export default function Header() {
  return (
    
    <div className='row d-flex justify-content-between'>
        <div className="img_logo col-md-2">
          <Image src="/logo.png" alt="logo" width={150} height={100} loading='lazy'  />
        </div>
        <div className="col-md-8">
           <NavigationMenuDemo/>
        </div>
        <div className="col-md-2">
          <div className="d-flex border-2 border-radius-10 w-150">
          <CiSearch className='justify-content-center align-items-center '/>
           <input type="text" placeholder='Tìm kiếm' className=''/>
         </div>
    
        </div>
    </div>
  )
}
