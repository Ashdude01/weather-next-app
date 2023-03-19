import React from 'react'
import Link from "next/link";

function footer() {
  return (
    <div className='bg-dark py-3 text-center'>
        <Link className='text-white text-decoration-none' href='/'><b>Weather App</b></Link>

    </div>
  )
}

export default footer