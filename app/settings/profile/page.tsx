import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfileSettings() {
    return (
        <Card className="w-full max-w-xl mx-auto mt-20">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                    View or update your profile.
                </CardDescription>
                <CardAction>
                    <Button variant="link">Change Password</Button>

                    <Button variant="link">Manage Account</Button>
                </CardAction>
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
                                <Label htmlFor="address" className="block text-sm font-medium mb-1">Address</Label>
                                <input 
                                    id="address"
                                    type="text" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="Street address" 
                                    required
                                />
                                <input 
                                    id="address"
                                    type="text" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="Apt, Suite, unit, Building (optional)" 
                                    required
                                />
                        </div>

                        <div className="w-full">
                                <Label htmlFor="city" className="block text-sm font-medium mb-1">City</Label>
                                <input 
                                    id="city"
                                    type="text" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="Ottumwa" 
                                    required
                                />
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <Label htmlFor="state" className="block text-sm font-medium mb-1">State</Label>
                                <input 
                                    id="state"
                                    type="text" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="Iowa"
                                    required 
                                />
                            </div>

                            <div className="w-full">
                                <Label htmlFor="zip" className="block text-sm font-medium mb-1">ZIP Code</Label>
                                <input 
                                    id="zip"
                                    type="text" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="" 
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </form>
            
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Save
                </Button>
            </CardFooter>
        </Card>
    )
}