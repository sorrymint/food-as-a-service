import {stripe} from '../payments/stripe';
import {db} from './drizzle';
import {
    users, teams, teamMembers, businesses, dishes, ingredients,
    customer, dish_ingredients, website_reviews, drivers, delivery, customer_order, orders
} from './schema';
import {hashPassword} from '@/lib/auth/session';
import {eq} from 'drizzle-orm';

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
        .then(res => res[0]);

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
    const existingDish = await db
        .select()
        .from(dishes)
        .where(eq(dishes.name, 'Peanut Stew'))
        .then(res => res[0]);

    let dish;
    if (existingDish) {
        console.log('Dish already exists.');
        dish = existingDish;
    } else {
        [dish] = await db
            .insert(dishes)
            .values({
                name: 'Peanut Stew',
                description: 'A spicy aromatic peanut stew. Add your choice of meat.',
                active: true,
                image: '',
                createdAt: new Date(),
                updatedAt: new Date(+3),
            })
            .returning();
    }

    // ingredients
    const existingIngredient = await db
        .select()
        .from(ingredients)
        .where(eq(ingredients.name, 'Peanuts'))
        .then(res => res[0]);

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
        .values({
            first_name: 'Delivery',
            last_name: 'Driver',
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
        .then(res => res[0]);

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
