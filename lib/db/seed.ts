import {stripe} from '../payments/stripe';
import {db} from './drizzle';
import {
    users, teams, teamMembers, businesses, dishes, ingredients,
    customer, dish_ingredients, website_reviews, drivers, delivery, customer_order, orders
} from './schema';
import {hashPassword} from '@/lib/auth/session';
import {eq, inArray} from 'drizzle-orm';

async function createStripeProducts() {
    console.log('Creating Stripe products and prices...');

    const baseProduct = await stripe.products.create({
        name: 'Base',
        description: 'Base subscription plan',
    });

    await stripe.prices.create({
        product: baseProduct.id,
        unit_amount: 800, // $8 in cents
        currency: 'usd',
        recurring: {
            interval: 'month',
            trial_period_days: 7,
        },
    });

    const plusProduct = await stripe.products.create({
        name: 'Plus',
        description: 'Plus subscription plan',
    });

    await stripe.prices.create({
        product: plusProduct.id,
        unit_amount: 1200, // $12 in cents
        currency: 'usd',
        recurring: {
            interval: 'month',
            trial_period_days: 7,
        },
    });

    console.log('Stripe products and prices created successfully.');
}

async function seed() {
    const email = 'test@test.com';
    const password = 'admin123';
    const passwordHash = await hashPassword(password);

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .then((res: any[]) => res[0]);

    let user;

    if (existingUser) {
        user = existingUser;
        console.log('User already exists.');
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
        console.log('Initial user created.');
    }

    const [team] = await db
        .insert(teams)
        .values({
            name: 'Test Team',
        })
        .returning();

    await db
        .insert(teamMembers)
        .values({
            teamId: team.id,
            userId: user.id,
            role: 'owner',
        });

    await createStripeProducts();

    await db
        .insert(businesses)
        .values({
            name: 'African Wonders',
            num_of_customers: 2,
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(+2)
        })

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
        description: "This vibrant and wholesome dish brings together the goodness of fresh broccoli, creamy cheese, fluffy rice, crunchy carrots, and tender cabbage. Each ingredient contributes to a delightful medley of flavors and textures, making it not only nutritious but also satisfying. To elevate the dining experience, a selection of complementary side options and an array of flavorful sauces are included, allowing you to customize each bite to your liking. ",
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
        description: "This is a light, aromatic, and richly flavorful soup, perfect for those dreary, rainy days when comfort is key. This dish is a beloved staple across many Middle Eastern countries, celebrated for its warmth and heartiness. It comes with a delightful array of variations and additions, allowing for endless customization to suit every palate. Enjoying this soup is not just about nourishment; it's an experience that warms both body and soul.",
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
        description: "This buger is know for it unforgiving spice levels, It had numerous different peppers and many other ingredients that provide amence flavor burger ",
        active: true,
        image: "/Burger2.jpg",
        price: "12.34",
        tags: 'spicy, beef',
        createdAt: new Date(),
        updatedAt: new Date(+3),
    }
    ];

    // Loop and getting all the names.
    const dishNames = dishArray.map( d => d.name);

    // Checking if any of the name exist already in the database.
    const existingDish = await db
        .select()
        .from(dishes)
        .where(inArray(dishes.name, dishNames))
        .then((res: any[]) => res[0]);

    let dish;
    if (existingDish) {
        console.log('Dish already exists.');
        dish = existingDish;
    } else {
        [dish] = await db
            .insert(dishes)
            .values(dishArray)
            .returning();
    }

    // ingredients
    const existingIngredient = await db
        .select()
        .from(ingredients)
        .where(eq(ingredients.name, 'Peanuts'))
        .then((res: any[]) => res[0]);

    if (existingIngredient) {
        console.log('Ingredient already exists.');
    } else {
        await db
            .insert(ingredients)
            .values({
                name: 'Peanuts',
                description: '',
                is_optional: true,
                is_allogenic: true,
                createdAt: new Date(),
                updatedAt: new Date(+2),
            });
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
            username: 'spicyfan',
            name: 'Spicy Fan',
            email: 'spicy@fan.com',
            phone: '1234567890',
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
            name: 'Spicy Order',
        })
        .returning();

//Order
    const [order] = await db
        .insert(orders)
        .values({
                businessId: business.id,
                customerId: cust.id,
                quantity: 1,
                deliveryStatus: "Cooking"
            }
        ).returning();


// Drivers
    const [driver] = await db
        .insert(drivers)
        .values([
            {
            first_name: 'Delivery',
            last_name: 'Driver',
            },
            {
            first_name: 'abc',
            last_name: 'efg',
            },
        ])
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
        .then((res: any[]) => res[0]);

    if (!existingOrderEntry) {
        await db
            .insert(customer_order)
            .values({
                id: 1,
                ordersId: order.id,
                name: 'Spicy Chicken',
                customerId: cust.id,
                menuItem: dish.id,
                deliveryStatus: deliveryItem.id,
            });
        console.log('Inserted customer_order with id: 1');
    } else {
        console.log('customer_order id:1 already exists.');
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
        console.error('Seed process failed:', error);
        process.exit(1);
    })
    .finally(() => {
        console.log('Seed process finished. Exiting...');
        process.exit(0);
    });
