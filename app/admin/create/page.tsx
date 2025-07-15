"use client"
import Link from 'next/link'
import CreateDishForm2 from './Components/createDishForm2'
import CreateDishForm from '@/components/createDishForm'
import { useActionState, useState } from 'react'
import { createDish } from './actions'

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
  // id: serial('id').primaryKey(),
  // businessId: serial('business_id')
  //   .notNull()
  //   .references(() => businesses.id),
  // name: varchar('name', {length: 100})
  //   .notNull()
  //   .unique(),
  // description: varchar('description', {length: 500})
  //   .notNull(),
  // active: boolean('active')
  //   .notNull(),
  // image: text('image_url'),
  // price: numeric('price'),
  // createdAt: timestamp('created_at').notNull().defaultNow(),
  // updatedAt: timestamp('updated_at').defaultNow()