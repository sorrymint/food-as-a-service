import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const shopingcart = () => {
  return ( 
        <Link href={"../cart"}>
            <ShoppingCart className=" md:hover:bg-gray-200 md:rounded-full md:px-1.5 w-[35px] md:h-[35px]"/>
        </Link>
  );
}

export default shopingcart;