"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, ChevronRight } from "lucide-react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Payments() {
    
    const [savedCards, setSavedCards] = React.useState<
        { last4: string; exp: string }[]>([])

    const handleAddCard = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const cardNumber = (form.elements.namedItem("cardNumber") as HTMLInputElement).value
        const expDate = (form.elements.namedItem("exp") as HTMLInputElement).value
        const last4 = cardNumber.slice(-4)

        setSavedCards((prev) => [...prev, { last4, exp: expDate }])
        form.reset()
    }

    return (
        <Card className="w-full max-w-xl mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Payment Methods</CardTitle>
            </CardHeader>
            <hr className="border-gray-300"/>
            <CardContent>
                    <CardDescription className="text-black mb-4">
                        Saved Payment Methods
                    </CardDescription>
                    <div className="flex flex-col gap-6">
                        {savedCards.map((card, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="w-full flex justify-between items-center text-left"
                            >
                                <span className="flex flex-col">
                                    <span className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-gray-600" />
                                        Card••••{card.last4}
                                    </span>
                                    <span className="text-xs text-gray-500 ml-7">
                                        Exp. {card.exp}
                                    </span>
                                </span>
                                <ChevronRight className="h-5 w-5 text-gray-500" />
                            </Button>
                        ))}
                    </div>
            </CardContent>
            <hr className="border-gray-300"/>
            <CardContent>
                <CardDescription className="text-black mb-4">
                    Add New Payment Method
                </CardDescription>
                <div className="flex flex-col gap-6">
                    <div className="w-full">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button 
                                    variant="outline" 
                                    className="text-black-500 w-full justify-between gap-2"
                                >
                                    <span className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-gray-600" />
                                        Credit / Debit Card
                                    </span>
                                    <ChevronRight className="h-5 w-5 text-gray-500" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add New Card</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleAddCard}>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="w-full md:w-2/3">
                                            <Label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</Label>
                                            <Input 
                                                id="cardNumber"
                                                type="text" 
                                                className="w-full border rounded px-3 py-2" 
                                                placeholder="XXXX XXXX XXXX XXXX"
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="w-full md:w-1/3">
                                            <Label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</Label>
                                            <Input 
                                                id="cvv"
                                                type="text" 
                                                className="w-full border rounded px-3 py-2" 
                                                placeholder="CVC" 
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="w-full">
                                            <Label htmlFor="exp" className="block text-sm font-medium mb-1">Expiration</Label>
                                            <Input 
                                                id="exp"
                                                type="text" 
                                                className="w-full border rounded px-3 py-2" 
                                                placeholder="MM / YY"
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="w-full">
                                            <Label htmlFor="zip" className="block text-sm font-medium mb-1">Zip Code</Label>
                                            <Input 
                                                id="zip"
                                                type="text" 
                                                className="w-full border rounded px-3 py-2" 
                                                placeholder="Zip code" 
                                                required
                                            />
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Back</Button>
                                        </DialogClose>
                                        <Button type="submit">Add Card</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                {/* footer */}
            </CardFooter>
        </Card>
    )
}