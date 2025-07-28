import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

type CartStore = {
    items: CartItem[];
    isLoaded: boolean;
    isOpen: boolean;
    orderId: string;
    setStore: (store: Partial<CartStore>) => void;
    addItem: (item: CartItem) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    open: () => void;
    close: () => void;
    setLoaded: (loaded: boolean) => void;
    syncWithUser: () => Promise<void>;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            item: [],
            isOpen: false,
            isLoaded: false,
            cartId: null,

            setStore: (store) => set(store),

            addItem: () => (

            ),
            removeItem: () => (

            ),
            updateQuantity: () => (

            ),
            clearCart: () => (

            ),
            open: () => (

            ),
            close: () => (

            ),
            setLoaded: () => (

            ),
            syncWithUser: () => (

            ),
            getTotalItems: () => (

            ),
            getTotalPrice: () => (

            ),
        }),
        {
            name: 'cart-storage',
            skipHydration: true,
        }
    )
)