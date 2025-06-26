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
  await db
  .insert(dishes)
  .values({
    name: 'Peanut Stew', 
    description: 'A spicy aromatic peanut stew. Add your choice of meat.',
    active: true,
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(+3),    
  });

  // ingredients
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
