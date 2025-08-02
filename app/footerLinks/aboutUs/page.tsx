"use client"

import { aboutUs } from "@/lib/aboutUs"; 

export default function PastOrders() {
return (
  <div className="w-full max-w-6xl mx-auto mt-10">
    <h1 className="text-4xl font-bold mb-15 text-center">{aboutUs.title}</h1>

    <div className="p-6 flex flex-col gap-6">
      <img
        src={aboutUs.photo}
        alt="Pizza cut in slices."
        className="w-full max-h-[500px] object-cover rounded-md "
      />
      
      <p className="pt-10 text-xl font-medium ">{aboutUs.description}</p>
    </div>

  </div>

  )
}