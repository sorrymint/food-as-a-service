
"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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



const fetchUserProfile = async () => {
    return {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    }
}

export default function ProfileSettings() {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    })

    useEffect(() => {
        const loadProfile = async () => {
            const data = await fetchUserProfile()
            setProfile(data)
        }

        loadProfile()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Simulate saving the profile data (you'll replace this with an actual API call)
        console.log("Saving updated profile:", profile)

        // Simulate a delay to mimic a server response
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Notify the user of success
        alert("Your profile has been updated successfully!")
    }


    return (
        <Card className="w-full max-w-xl mx-auto mt-20">
            <CardHeader className="flex flex-col gap-4">
                <CardTitle className="text-3xl font-bold">Profile</CardTitle>
                
                <CardDescription>View or update your profile.</CardDescription>
                
                <div className="flex flex-wrap gap-2">
                    <Link href="/account/manageAccount">
                        <Button variant="link">Manage Account</Button>
                    </Link>
                    <Link href="/account/changePassword">
                        <Button variant="link">Change Password</Button>
                    </Link>
                </div>
            </CardHeader>


            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <Label htmlFor="fName" className="block text-sm font-medium mb-1">First Name</Label>
                                <Input
                                    id="fName"
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="John"
                                    required
                                    value={profile.firstName}
                                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                />
                            </div>

                            <div className="w-full">
                                <Label htmlFor="lName" className="block text-sm font-medium mb-1">Last Name</Label>
                                <Input
                                    id="lName"
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="Doe"
                                    required
                                    value={profile.lastName}
                                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
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
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                type="tel"
                                className="w-full border rounded px-3 py-2"
                                placeholder="(111) 123-4567"
                                required
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="address" className="block text-sm font-medium mb-1">Address</Label>
                            <Input
                                id="address"
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Street address"
                                required
                            />
                            <Input
                                id="address2"
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Apt, Suite, unit, Building (optional)"
                                required
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="city" className="block text-sm font-medium mb-1">City</Label>
                            <Input
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
                                <Input
                                    id="state"
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="Iowa"
                                    required
                                />
                            </div>

                            <div className="w-full">
                                <Label htmlFor="zip" className="block text-sm font-medium mb-1">ZIP Code</Label>
                                <Input
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
                    Save changes
                </Button>
            </CardFooter>
        </Card>
    )
}
