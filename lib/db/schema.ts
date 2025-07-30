
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  numeric,
  primaryKey,
  PgNumeric
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';



export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  role: varchar('role', { length: 50 }).notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  invitedBy: integer('invited_by')
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp('invited_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
});

// New Tables Area - Shimea Gbetsi

// business table
export const businesses = pgTable('businesses', {
  id: serial('id').primaryKey(),
  name: varchar('name', {length: 225}).notNull(),
  num_of_customers: integer('num_customers').notNull(),
  active: boolean('active').notNull(),
  status: text({enum: ["Draft","Pending_review","Published", "Rejected"]}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

//dish table
export const dishes = pgTable('dishes', {
  id: serial('id').primaryKey(),
  businessId: serial('business_id')
    .notNull()
    .references(() => businesses.id),
  name: varchar('name', {length: 100})
    .notNull()
    .unique(),
    // Add on a slug(This is what will allows user to provide or share the URL to other more easier very similar to a title but URL do not render spacea ans other characters.)
  description: varchar('description', {length: 500})
    .notNull(),
  active: boolean('active'),
  image: text('image_url'),
  price: numeric('price'),
  tags: varchar('tags', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

//dish_ingredients
export const dish_ingredients = pgTable('dish_ingredients',{
  dishName: varchar('dish_name', {length: 100})
    .notNull()
    .references(() => dishes.name),
  dishId: serial('dish_id')
    .notNull()
    .references(() => dishes.id),
  ingredientName: varchar('ingredient_name', {length: 100})
    .notNull()
    .references(() => ingredients.name),
  ingredientId: serial('ingredient_id')
    .notNull()
    .references(() => ingredients.id),
  quantity: numeric('quantity'),
  unit: varchar('unit', {length: 20})
    .notNull(),
}, (dish_ingredients) =>[
   primaryKey({columns: [dish_ingredients.dishId, dish_ingredients.ingredientId]})
]
);

//ingredient
export const ingredients = pgTable('ingredients',{
  id: serial('id').primaryKey(),
  name: varchar('name', {length: 50})
    .notNull()
    .unique(),
  description: varchar('description', {length: 500}),
  is_optional: boolean('is_optional')
    .notNull(),
  is_allogenic: boolean('is_allogenic')
    .notNull(),
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
});

export const customer = pgTable('customer', {
  id: serial('id').primaryKey(),
  businessId: serial('business_id')
    .notNull()
    .references(() => businesses.id),
  username: varchar('username', {length: 20})
    .notNull(),
  name: varchar('name', {length: 100})
    .notNull(),
  email: varchar('email', { length: 20 }).notNull(),
  phone: varchar('phone', {length: 14}),
  active: boolean('active').notNull(),
  joinedAt: timestamp('created_at').notNull().defaultNow(),
});

//business website
export const business_website = pgTable('business_website', {
  id: serial('id').primaryKey(),
  businessId: serial('business_id')
    .notNull()
    .references(() => businesses.id),
  title: varchar('title', {length: 50})
    .notNull(),
  description: varchar('description', {length: 500})
    .notNull(),
  logo_image: varchar('description', {length: 500})
    .notNull(),
  status: text({enum: ["Published", "Rejected"]}),
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
});

//orders
export const website_reviews = pgTable('website_reviews', {
  id: serial('id').primaryKey(),
  businessId: serial('business_id')
    .notNull()
    .references(() => businesses.id),
  name: varchar('name', {length: 100})
    .notNull()
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id),
  customerId: integer('customer_id').references(() => customer.id),
  quantity: integer('quantity'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  deliveryStatus: varchar('delivery_status', { length: 50 }),
  specialInstructions: text('special_instructions'),
});

//order items
export const customer_order = pgTable('customer_order', {
  id: serial('id').primaryKey(),
  ordersId: serial('orders_id')
    .notNull()
    .references(() => orders.id),
  name: varchar('name', {length: 100})
    .notNull(),
  customerId: serial('customer_id')
    .notNull()
    .references(() => customer.id),
  menuItem: serial('menu_item')
    .notNull()
    .references(() => dishes.id),
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),
  deliveryStatus: serial('delivery_status')
    .notNull()
    .references(() => delivery.id)
});

//delivery
export const delivery = pgTable('delivery', {
  id: serial('id').primaryKey(),
  ordersId: serial('orders_id')
    .notNull()
    .references(() => orders.id),
  driverId: serial('driver_id')
    .notNull()
    .references(() => drivers.id),
  status: text({enum: ["Picked up", "On the way", "Delivered"]}),
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),

});

// delivery driver
export const drivers = pgTable('drivers', {
  id: serial('id').primaryKey(),
  first_name:varchar('first_name', {length: 100})
    .notNull(),
  last_name: varchar('last_name', {length: 100})
    .notNull()
});


export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}
