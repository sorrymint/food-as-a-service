'use client'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'

type AddToCartButtonProps = {
    dish: Dish
}

const AddToCartButton = ({ dish }: AddToCartButtonProps) => {

    const [isLoading, setLoading ] = useState(false);

    const handleAddToCart = async () => {
        setLoading(true);

        //adding item to cart
        await new Promise(resolve => setTimeout(resolve, 1000))

        setLoading(false);
    }

    if(!dish.price) {
        return null;
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`
                bg-amber-400 px-4 py-2 text-sm font-extrabold 
                hover:bg-amber-300 rounded border-b-3 border-amber-600 cursor-pointer
            `}
        >
            {isLoading ? (
                <>
                    <Loader2 className='w-6 h-6 animate spin'/>
                    <span>Adding to Cart...</span>
                </>
            ) :(
                <>
                    Add to Cart - {(dish.price)}
                </>
            )}
        </button>
    )
}

export default AddToCartButton