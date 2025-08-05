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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ManageAccount() {
    return (
        <Card className="w-full max-w-xl mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Manage Account</CardTitle>
                <CardDescription>
                    {/* Description */}
                </CardDescription>

            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    
                    <div className="w-full space-y-3">
                        <h1 className="">Delete Account</h1>
                        <p className="text-gray-500 text-sm">You can request to have your account deleted and personal information removed.</p>
                        <Dialog>
                            <form>
                                <DialogTrigger asChild>
                                    <Button 
                                        variant="outline" 
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete Account
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Delete Account</DialogTitle>
                                        
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="password-1">Current Password *</Label>
                                            <Input id="password-1" name="password" defaultValue="" />
                                        </div>
                                    </div>
                                    <DialogDescription>
                                        Enter your current password to confirm cancellation of your account.
                                    </DialogDescription>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">Delete Account</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </form>
                        </Dialog>
                    </div>            
                </div>
                
            
            </CardContent>
            <CardFooter className="flex-col gap-2">
                
            </CardFooter>
        </Card>
    )
}