import { stripe } from "../payments/stripe";
import { db } from "./drizzle";
import {
  users,
  teams,
  teamMembers,
  businesses,
  dishes,
  ingredients,
  customer,
  dish_ingredients,
  website_reviews,
  orders,
  drivers,
  delivery,
  customer_order,
} from "./schema";
import { hashPassword } from "@/lib/auth/session";
import { eq, inArray } from "drizzle-orm";

async function createStripeProducts() {
  console.log("Creating Stripe products and prices...");

  const baseProduct = await stripe.products.create({
    name: "Base",
    description: "Base subscription plan",
  });

  await stripe.prices.create({
    product: baseProduct.id,
    unit_amount: 800, // $8 in cents
    currency: "usd",
    recurring: {
      interval: "month",
      trial_period_days: 7,
    },
  });

  const plusProduct = await stripe.products.create({
    name: "Plus",
    description: "Plus subscription plan",
  });

  await stripe.prices.create({
    product: plusProduct.id,
    unit_amount: 1200, // $12 in cents
    currency: "usd",
    recurring: {
      interval: "month",
      trial_period_days: 7,
    },
  });

  console.log("Stripe products and prices created successfully.");
}

async function seed() {
  const email = "test@test.com";
  const password = "admin123";
  const passwordHash = await hashPassword(password);

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((res) => res[0]);

  let user;

  if (existingUser) {
    user = existingUser;
    console.log("User already exists.");
  } else {
    [user] = await db
      .insert(users)
      .values([
        {
          email: email,
          passwordHash: passwordHash,
          role: "owner",
        },
      ])
      .returning();
    console.log("Initial user created.");
  }

  const [team] = await db
    .insert(teams)
    .values({
      name: "Test Team",
    })
    .returning();

  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: user.id,
    role: "owner",
  });

  await createStripeProducts();

  await db.insert(businesses).values({
    name: "African Wonders",
    num_of_customers: 2,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(+2),
  });

  // dish table
  // Array of all the value that are getting inserting into the database with the seeding command.
  const dishArray = [
    {
      businessId: 1,
      name: "Peanut Stew",
      description: "A spicy aromatic peanut stew. Add your choice of meat.",
      active: true,
      image: "/PlaceHolder.png",
      tags: "hearthy, stew, soup",
      price: "10.00",
      createdAt: new Date(),
      updatedAt: new Date(+3),
    },
    {
      businessId: 1,
      name: "Broccoli Dish",
      description:
        "This vibrant and wholesome dish brings together the goodness of fresh broccoli, creamy cheese, fluffy rice, crunchy carrots, and tender cabbage. Each ingredient contributes to a delightful medley of flavors and textures, making it not only nutritious but also satisfying. To elevate the dining experience, a selection of complementary side options and an array of flavorful sauces are included, allowing you to customize each bite to your liking. ",
      active: true,
      image: "/PlaceHolder.png",
      price: "12.34",
      tags: "health, fresh",
      createdAt: new Date(),
      updatedAt: new Date(+3),
    },
    {
      businessId: 1,
      name: "Chicken Soup",
      description:
        "This is a light, aromatic, and richly flavorful soup, perfect for those dreary, rainy days when comfort is key. This dish is a beloved staple across many Middle Eastern countries, celebrated for its warmth and heartiness. It comes with a delightful array of variations and additions, allowing for endless customization to suit every palate. Enjoying this soup is not just about nourishment; it's an experience that warms both body and soul.",
      active: true,
      image: "/PlaceHolder.png",
      price: "10.50",
      tags: "chicken, healthy",
      createdAt: new Date(),
      updatedAt: new Date(+3),
    },
    {
      businessId: 1,
      name: "Infamouse Burger",
      description:
        "This buger is know for it unforgiving spice levels, It had numerous different peppers and many other ingredients that provide amence flavor burger ",
      active: true,
      image: "/Burger2.jpg",
      price: "12.34",
      tags: "spicy, beef",
      createdAt: new Date(),
      updatedAt: new Date(+3),
    },
  ];

  // Loop and getting all the names.
  const dishNames = dishArray.map((d) => d.name);

  // Checking if any of the name exist already in the database.
  const existingDish = await db
    .select()
    .from(dishes)
    .where(inArray(dishes.name, dishNames))
    .then((res: any[]) => res[0]);

  let dish;
  if (existingDish) {
    console.log("Dish already exists.");
    dish = existingDish;
  } else {
    [dish] = await db.insert(dishes).values(dishArray).returning();
  }


    // ingredients

    const ingredientArray = [
      {
        id: 1,
        name: "Tomato",
        description:
          "South unit trade so Congress picture trip report role artist she over fast.",
        is_optional: false,
        is_allogenic: false,
      },
      {
        id: 2,
        name: "Lettuce",
        description: null,
        is_optional: false,
        is_allogenic: false,
      },
      {
        id: 3,
        name: "Onion",
        description:
          "Know ground grow answer question now send executive lawyer movement.",
        is_optional: true,
        is_allogenic: false,
      },
      {
        id: 4,
        name: "Garlic",
        description:
          "Produce thousand if lawyer watch service degree for region staff task example.",
        is_optional: true,
        is_allogenic: true,
      },
      {
        id: 5,
        name: "Olive Oil",
        description: "Condition place including growth ago live.",
        is_optional: true,
        is_allogenic: true,
      },
      {
        id: 6,
        name: "Salt",
        description: null,
        is_optional: false,
        is_allogenic: true,
      },
      {
        id: 7,
        name: "Black Pepper",
        description:
          "Guess nation start share modern fill yeah memory word series.",
        is_optional: true,
        is_allogenic: false,
      },
      {
        id: 8,
        name: "Butter",
        description: "Prove wish a crime live major fall affect.",
        is_optional: false,
        is_allogenic: false,
      },
      {
        id: 9,
        name: "Cheese",
        description: null,
        is_optional: true,
        is_allogenic: true,
      },
      {
        id: 10,
        name: "Chicken Breast",
        description: "Can else short less later agent against walk until kid.",
        is_optional: true,
        is_allogenic: true,
      },
      {
        id: 11,
        name: "Beef",
        description: null,
        is_optional: false,
        is_allogenic: true,
      },
      {
        id: 12,
        name: "Bacon",
        description:
          "Space magazine among you suggest chair ten get individual project show two.",
        is_optional: false,
        is_allogenic: false,
      },
      {
        id: 13,
        name: "Egg",
        description: null,
        is_optional: false,
        is_allogenic: true,
      },
      {
        id: 14,
        name: "Milk",
        description:
          "Individual compare analysis attorney we wide brother fall simply floor.",
        is_optional: true,
        is_allogenic: true,
      },
      {
        id: 15,
        name: "Flour",
        description: null,
        is_optional: false,
        is_allogenic: true,
      },
      {
        id: 16,
        name: "Sugar",
        description: null,
        is_optional: false,
        is_allogenic: false,
      },
      {
        id: 17,
        name: "Parsley",
        description:
          "Save class young similar tax benefit guy range remain law tough reality couple.",
        is_optional: true,
        is_allogenic: false,
      },
      {
        id: 18,
        name: "Basil",
        description: "Firm wide close chance consumer cup over.",
        is_optional: true,
        is_allogenic: false,
      },
      {
        id: 19,
        name: "Mushroom",
        description:
          "Through good interest six into painting month small play everything.",
        is_optional: false,
        is_allogenic: false,
      },
      {
        id: 20,
        name: "Spinach",
        description: null,
        is_optional: false,
        is_allogenic: true,
      },
      {
        id: 21,
        name: "Peanut Powder",
        description: null,
        is_optional: false,
        is_allogenic: true,
      },
      {
        id: 22,
        name: "Broccoli",
        description: null,
        is_optional: false,
        is_allogenic: true,
      },
    ];

    const ingredientNames = ingredientArray.map((e) => e.name);
    
    const existingIngredient = await db
        .select()
        .from(ingredients)
        .where(inArray(ingredients.name, ingredientNames))
        .then(res => res[0]);

    if (existingIngredient) {
        console.log('Ingredient already exists.');
    } else {
        await db
            .insert(ingredients)
            .values(ingredientArray)
            .returning();
    }

    
const dish_ingredientsArray: dish_ingredients[] = [
  {
    id: 1,
    dishName: "Peanut Stew",
    ingredientName: "Peanut Powder",
    unit: "6",
    dishId: 1,
    ingredientId: 21,
    quantity: "2 oz",
  },
  {
    id: 2,
    dishName: "Peanut Stew",
    ingredientName: "Onion",
    unit: "6",
    dishId: 1,
    ingredientId: 3,
    quantity: "1 cup",
  },
  {
    id: 3,
    dishName: "Peanut Stew",
    ingredientName: "Garlic",
    unit: "6",
    dishId: 1,
    ingredientId: 4,
    quantity: "3 cloves",
  },
  {
    id: 4,
    dishName: "Peanut Stew",
    ingredientName: "Chicken Breast",
    unit: "6",
    dishId: 1,
    ingredientId: 10,
    quantity: "1 lb",
  },
  {
    id: 5,
    dishName: "Peanut Stew",
    ingredientName: "Black Pepper",
    unit: "6",
    dishId: 1,
    ingredientId: 7,
    quantity: "1 tsp",
  },

  {
    id: 6,
    dishName: "Broccoli Dish",
    ingredientName: "Broccoli",
    unit: "20",
    dishId: 2,
    ingredientId: 22,
    quantity: "1 lb"
  },
  {
    id: 7,
    dishName: "Broccoli Dish",
    ingredientName: "Cheese",
    unit: "20",
    dishId: 2,
    ingredientId: 9,
    quantity: "1 cup"
  },
  {
    id: 8,
    dishName: "Broccoli Dish",
    ingredientName: "Butter",
    unit: "20",
    dishId: 2,
    ingredientId: 8,
    quantity: "2 tbsp"
  },
  {
    id: 9,
    dishName: "Broccoli Dish",
    ingredientName: "Garlic",
    unit: "20",
    dishId: 2,
    ingredientId: 4,
    quantity: "3 cloves"
  },
  {
    id: 10,
    dishName: "Broccoli Dish",
    ingredientName: "Salt",
    unit: "20",
    dishId: 2,
    ingredientId: 6,
    quantity: "1 tsp"
  },
  {
    id: 11,
    dishName: "Broccoli Dish",
    ingredientName: "Black Pepper",
    unit: "20",
    dishId: 2,
    ingredientId: 7,
    quantity: "½ tsp"
  }

];

const dish_ingredientsNames = dish_ingredientsArray.map((e) => e.ingredientName);

const existingdish_Ingredient = await db
  .select()
  .from(dish_ingredients)
  .where(inArray(dish_ingredients.ingredientName, dish_ingredientsNames))
  .then((res) => res[0]);

if (existingdish_Ingredient) {
  console.log("dish_Ingredient already exists.");
} else {
  await db
  .insert(dish_ingredients)
  .values(dish_ingredientsArray)
  .returning();
}


// Businesses
    const [business] = await db
        .insert(businesses)
        .values({
            name: 'African Wonders',
            num_of_customers: 2,
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .returning();

  // Customer
  const [cust] = await db
    .insert(customer)
    .values({
      businessId: business.id,
      username: "spicyfan",
      name: "Spicy Fan",
      email: "spicy@fan.com",
      phone: "1234567890",
      active: true,
      joinedAt: new Date(),
    })
    .onConflictDoNothing()
    .returning();

  // Website reviews
  const [review] = await db
    .insert(website_reviews)
    .values({
      businessId: business.id,
      name: "Spicy Order",
    })
    .returning();

  //Order
  const [order] = await db
    .insert(orders)
    .values({
      businessId: business.id,
      customerId: cust.id,
      quantity: 1,
      deliveryStatus: "Cooking",
    })
    .returning();

  // Drivers
  const [driver] = await db
    .insert(drivers)
    .values({
      first_name: "Delivery",
      last_name: "Driver",
    })
    .returning();

  // Delivery
  const [deliveryItem] = await db
    .insert(delivery)
    .values({
      ordersId: order.id,
      driverId: driver.id,
      status: "Picked up", // use valid enum value
    })
    .returning();

  // Customer order
  const existingOrderEntry = await db
    .select()
    .from(customer_order)
    .where(eq(customer_order.id, 1))
    .then((res) => res[0]);

  if (!existingOrderEntry) {
    await db.insert(customer_order).values({
      id: 1,
      ordersId: order.id,
      name: "Spicy Chicken",
      customerId: cust.id,
      menuItem: dish.id,
      deliveryStatus: deliveryItem.id,
    });
    console.log("Inserted customer_order with id: 1");
  } else {
    console.log("customer_order id:1 already exists.");
  }

  // dish_ingredients
  // await db
  // .insert(dish_ingredients)
  // .values({
  //   // dishName: 'Peanut Stew',
  //   // dishId: 2,
  //   // ingredientName: 'Peanut',
  //   // ingredientId: 2,
  //   quantity: 1.0,
  //   unit: '12oz Bag'
  // });
}

seed()
  .catch((error) => {
    console.error("Seed process failed:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("Seed process finished. Exiting...");
    process.exit(0);
  });
