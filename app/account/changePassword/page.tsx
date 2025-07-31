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

export default function ChangePassword() {
    return (
        <Card className="w-full max-w-xl mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Set New Password</CardTitle>
                <CardDescription>
                    {/* Description */}
                </CardDescription>

            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="w-full">
                                <Label htmlFor="currentPassword" className="block text-sm font-medium mb-1">Current Password</Label>
                                <Input 
                                    id="currentPassword"
                                    type="password" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="Current password" 
                                    required
                                />
                        </div>

                        <div>
                            <Label htmlFor="newPassword" className="block text-sm font-medium mb-1">New Password</Label>
                                <Input 
                                    id="newPassword"
                                    type="password" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="New password" 
                                    required
                                />
                        </div>

                        <div>
                                <Label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm New Password</Label>
                                <Input 
                                    id="confirmPassword"
                                    type="password" 
                                    className="w-full border rounded px-3 py-2" 
                                    placeholder="Current password" 
                                    required
                                />
                        </div>
                    </div>
                </form>
            
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Change my password
                </Button>
            </CardFooter>
        </Card>
    )
}