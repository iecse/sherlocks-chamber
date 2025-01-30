import React from 'react'
import fullnew from '../utils/ffff.png'
import logo from '../utils/logo.png'

function Navbar() {
  return (
    <div className="flex items-center justify-between fixed  top-0 left-1/2 z-40 transform -translate-x-1/2 w-full bg-custom-color  shadow-lg opacity-80  h-20">
    <img src={logo} alt="" className='' />
    <img src={fullnew} alt="" className='mr-10'/>
    </div>
  )
}

export default Navbar