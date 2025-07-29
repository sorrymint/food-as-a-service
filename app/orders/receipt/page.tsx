"use client"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Receipt() {

    const orders = [
        {
            date: "March 12, 2025",
            price: 16.34,
            items: "Cheese Burger · Small Fries · Large Drink",
            totalItems: 3,
            time: "3:34 PM",
            day: "Friday"
        }
    ]

    return (
        <Card className="w-full max-w-6xl mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Completed Order</CardTitle>
                <CardDescription>
                    {orders.map((order, index) => 
                    <div key={index} className="">
                        <div className="flex flex-col">
                            <p className="text-md font-bold">{order.day}, {order.date} at {order.time}</p>
                        </div>
                    </div>
                    )} 
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {orders.map((order, index) => 
                    <div key={index} className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-col w-full">
                            <p className="text-sm mt-1">{order.items}</p>
                            <hr className="w-full border-gray-300 mt-3"/>
                            <p className="text-sm mt-3">${order.price} · {order.totalItems} items</p>
                        </div>
                    </div>
                )}            
            </CardContent>
            <CardFooter className="flex-col gap-2">
                {/* footer */}
            </CardFooter>
        </Card>
    )
}