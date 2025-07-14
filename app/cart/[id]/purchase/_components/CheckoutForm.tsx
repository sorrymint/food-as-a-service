import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

type CheckoutFormProps = {
    dishes: {}
    clientSecret : string
}

loadStripe{process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string}


export function CheckoutForm({dishes, 
    clientSecret} : CheckoutFormProps) {
        return <Elements options={{ clientSecret }} stripe={stripe}>
            
            </Elements>