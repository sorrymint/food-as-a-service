import{ stripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, teamMembers, businesses, dishes, ingredients, customer, dish_ingredients} from './schema';
import { hashPassword } from '@/lib/auth/session';
import { eq } from 'drizzle-orm';

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

  console.log('Initial user created.');

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

  const [newBusiness] = await db
    .insert(businesses)
    .values({
      name: 'Thai Delight',
      num_of_customers: 1,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(+2)
    })
    .returning();

  console.log('Business seeded', newBusiness);

  // dish
  await db
  .insert(dishes)
  .values({
    name: 'Spicy Pad Thai', 
    description: 'A very spicy pad thai version',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),    
  });

  // ingredients
  await db
  .insert(ingredients)
  .values({
    name: 'Noodles', 
    description: '',
    is_optional: true,
    createdAt: new Date(),
    updatedAt: new Date(+2), 
  });

  // dish_ingredients
  await db
  .insert(dish_ingredients)
  .values({
    dishName: dishes.name,
    dishId: dishes.id,
    ingredientsName: ingredients.name,
    ingredientsId: ingredients.id,
    quantity: 1.0,
    unit: '12oz Bag'
  });

  // customer
  // await db
  // .insert(customer)
  // .values({
    
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
