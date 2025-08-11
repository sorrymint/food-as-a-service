import { DishType } from '@/lib/zodSchema/zodSchemas'
import React from 'react'

export default function AdminDashboardListing({items} : {items : DishType[]}) {
  return (
    <div>{items.map(item => 
        <li key={item.id}>{item.name}</li>
    )}</div>
  )
}
