import { dishes } from "@/lib/db/schema"
import { Elements, useCheckout, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { format } from "path"

type CheckoutFormProps = {
    dishes: {
        image: string
        name: string
        price: number
        description: string
    }
    clientSecret : string
}

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
)


export function CheckoutForm({dishes, clientSecret} : CheckoutFormProps) {
    return(
        <div className="max-w-5xl w-full mx-auto sapce-y-8">
            <div className="flex gap-4 items-center">
                <div className="aspect-video flex-shrink-0 w-1/3 relative">
                    <Image src={dishes.image} fill alt={dishes.name} className="object-cover"/>
                </div>
                <div className="text-lg">
                    {formatCurrency(dishes.price)}
                </div>
                <h1 className="text-2xl font-bold ">{dishes.name}</h1>
                <div className="line-clamp-3 text-muted-foreground">
                    {dishes.description}
                </div>
            </div>
            <Elements options={{ clientSecret }} stripe={stripePromise}>
                <Form />
            </Elements> 
        </div>
    )
} 

function Form() {
    const stripe = useStripe()
    const elements = useElements()

    return <form>
        
    </form>
}