"use client";

import Link from 'next/link'
import CreateDishForm2 from './Components/createDishForm2'

export default function Create() {



  return (
    <div>
      <Link href={'/menu'}>
      <button
      className='text-blue-400 mb-2 text-xl cursor-pointer'
      >
        <span
        className='ml'
        >&#8592;</span> 
        Menu</button>
        </Link>
        <h2 className='mb-6 font-extrabold'>Create A New Post</h2>

        <CreateDishForm2/>
        
    </div>
  )
}