//mock data for app/orders

export type Order = {
  id: string;
  date: string;
  items: {
    name: string;
    price: number;
  }[];
};

export const orders: Order[] = [
  {
    id: "1",
    date: "March 12, 2025",
    items: [
      { name: "Cheese Burger", price: 6.99 },
      { name: "Small Fries", price: 2.50 },
      { name: "Large Drink", price: 3.99 },
    ],
  },
  {
    id: "2",
    date: "December 8, 2024",
    items: [
      { name: "Cheese Burger", price: 6.99 },
      { name: "BBQ Burger", price: 7.25 },
      { name: "Medium Fries", price: 3.50 },
      { name: "Large Fries", price: 3.99 },
      { name: "Medium Drink", price: 2.99 },
      { name: "Large Drink", price: 3.99 },
    ],
  },
  {
    id: "3",
    date: "October 3, 2024",
    items: [
      { name: "Steak", price: 11.99 },
      { name: "Mashed Potatoes", price: 4.50 },
      { name: "Steak Sauce", price: 0.50 },
      { name: "Small Drink", price: 1.99 },
    ],
  },
];

export function getOrderById(id: string): Order | undefined {
  return orders.find((order) => order.id === id);
}