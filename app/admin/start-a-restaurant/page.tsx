import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function StartARestaurant() {
    return (
        <Card className="w-full max-w-xl mx-auto mt-20">
            <CardHeader>
                <CardTitle>Start a Restaurant With Us</CardTitle>
                <CardDescription>
                    Enter your information below to start the creation of your website
                </CardDescription>

            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <Label htmlFor="fName" className="block text-sm font-medium mb-1">First Name</Label>
                                <input 
                                    id="fName"
                                    type="text" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="John"
                                    required 
                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="lName" className="block text-sm font-medium mb-1">Last Name</Label>
                                <input 
                                    id="lName"
                                    type="text" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="Doe" 
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="email" className="block text-sm font-medium mb-1">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                className="w-full border rounded px-3 py-2" 
                                placeholder="m@example.com"
                                required
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</Label>
                            <input 
                                id="phoneNumber"
                                type="tel" 
                                className="w-full border rounded px-3 py-2" 
                                placeholder="(111) 123-4567" 
                                required
                            />
                        </div>            

                        <div className="w-full">
                            <Label htmlFor="company" className="block text-sm font-medium mb-1">Company / Restaurant Name</Label>
                            <input 
                                id="company"   
                                type="text" 
                                className="w-full border rounded px-3 py-2" 
                                placeholder="My Restaurant" 
                                required
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</Label>
                            <input 
                                id="cardNumber" 
                                type="text" 
                                className="w-full border rounded px-3 py-2" 
                                placeholder="1234 5678 9012 3456" 
                                required
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <Label htmlFor="expDate" className="block text-sm font-medium mb-1">Expiration Date</Label>
                                <input 
                                    id="expDate" 
                                    type="text" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="MM/YY" 
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="cvv" className="block text-sm font-medium mb-1">Security Code (CVV)</Label>
                                <input 
                                    id="cvv" 
                                    type="text" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="123" 
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </form>
            
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    )
}