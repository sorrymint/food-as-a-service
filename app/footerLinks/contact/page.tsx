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

export default function Contact() {
  return (
    <Card className="w-full max-w-xl mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
        <CardDescription>
          {/* Description */}
        </CardDescription>

      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="w-full">
              <Label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</Label>
              <Input 
                id="fullName"
                type="text" 
                className="w-full border rounded px-3 py-2" 
                placeholder="Full Name" 
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium mb-1">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  className="w-full border rounded px-3 py-2" 
                  placeholder="Email" 
                  required
                />
            </div>

            <div>
              <Label htmlFor="message" className="block text-sm font-medium mb-1">Message</Label>
                <Input 
                  id="message"
                  type="text" 
                  className="w-full border rounded px-3 py-2" 
                  placeholder="Message" 
                  required
              />
            </div>
          </div>
        </form>
            
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Contact Us
        </Button>
      </CardFooter>
    </Card>
  )
}