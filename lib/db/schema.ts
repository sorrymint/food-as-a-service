import { pgTable, type AnyPgColumn, foreignKey, serial, varchar, timestamp, unique, text, integer, boolean, check, numeric, smallint, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { timestamptz } from "drizzle-orm/gel-core"

export const deliveryStatus = pgEnum("Delivery_Status", ['Picked Up', 'On the Way', 'Delivered'])
export const dishStatus = pgEnum("Dish_Status", ['Active - In Stock', 'Discontinued', 'Out of Stock'])
export const websiteStatus = pgEnum("Website_Status", ['Live - Published', 'Pending - Editing', 'Created - Started'])

export const deliveryStatusValues = deliveryStatus.enumValues as typeof deliveryStatus.enumValues;
export const dishStatusValues = dishStatus.enumValues as typeof dishStatus.enumValues;
export const websiteStatusValues = websiteStatus.enumValues as typeof websiteStatus.enumValues;

export type DeliveryEnum = typeof deliveryStatusValues[number];
export type DishEnum = typeof dishStatusValues[number];
export type WebsiteEnum = typeof websiteStatusValues[number];

export const drivers = pgTable("drivers", {
	id: serial().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
});

export const delivery = pgTable("delivery", {
	id: serial().primaryKey().notNull(),
	customerOrderId: serial("customer_order_id").notNull(),
	driverId: serial("driver_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	status: deliveryStatus().default('Picked Up'),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`),
}, (table) => [
	foreignKey({
			columns: [table.customerOrderId],
			foreignColumns: [customerOrder.id],
			name: "delivery_customer_order_id_fkey"
		}),
	foreignKey({
			columns: [table.driverId],
			foreignColumns: [drivers.id],
			name: "delivery_driver_id_drivers_id_fk"
		}),
	unique("delivery_status_key").on(table.status),
]);

export const customerOrder = pgTable("customer_order", {
	id: serial().primaryKey().notNull(),
	ordersId: serial("orders_id").notNull(),
	name: varchar({ length: 100 }).notNull(),
	customerId: serial("customer_id").notNull(),
	menuItem: serial("menu_item").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	deliveryStatus: deliveryStatus("delivery_status").default('Picked Up'),
}, (table) => [
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customer.id],
			name: "customer_order_customer_id_customer_id_fk"
		}),
	foreignKey({
			columns: [table.deliveryStatus],
			foreignColumns: [delivery.status],
			name: "customer_order_delivery_status_fkey"
		}),
	foreignKey({
			columns: [table.menuItem],
			foreignColumns: [dishes.id],
			name: "customer_order_menu_item_dishes_id_fk"
		}),
	foreignKey({
			columns: [table.ordersId],
			foreignColumns: [orders.id],
			name: "customer_order_orders_id_orders_id_fk"
		}),
]);

export const teams = pgTable("teams", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	stripeCustomerId: text("stripe_customer_id"),
	stripeSubscriptionId: text("stripe_subscription_id"),
	stripeProductId: text("stripe_product_id"),
	planName: varchar("plan_name", { length: 50 }),
	subscriptionStatus: varchar("subscription_status", { length: 20 }),
}, (table) => [
	unique("teams_stripe_customer_id_unique").on(table.stripeCustomerId),
	unique("teams_stripe_subscription_id_unique").on(table.stripeSubscriptionId),
]);

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

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: text("password_hash").notNull(),
	role: varchar({ length: 20 }).default('member').notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
	deletedAt: timestamp("deleted_at"),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const businessWebsite = pgTable("business_website", {
	id: serial().primaryKey().notNull(),
	businessId: serial("business_id").notNull(),
	title: varchar('title', {length: 50}).notNull(),
	url: text().default('https://food-as-a-service.vercel.app/').notNull(),
	description: varchar({ length: 500 }).default('This is a restaurant description. Please update later.').notNull(),
	status: websiteStatus().default('Created - Started').notNull(),
	logo_image: varchar('description', {length: 500}).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.businessId],
			foreignColumns: [businesses.id],
			name: "business_website_business_id_businesses_id_fk"
		}),
	unique("business_website_title_key").on(table.url),
]);

export const businesses = pgTable("businesses", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	numCustomers: integer("num_customers").notNull(),
	active: boolean().notNull(),
	status: websiteStatus(),
	createdAt: timestamp("created_at", { withTimezone: true}).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true}),
	description: text(),
	websiteUrl: text("website_url"),
}, (table) => [
	foreignKey({
			columns: [table.websiteUrl],
			foreignColumns: [businessWebsite.url],
			name: "businesses_website_url_fkey"
		}),
]);

export const customer = pgTable("customer", {
	id: serial().primaryKey().notNull(),
	businessId: serial("business_id").notNull(),
	username: varchar({ length: 20 }).notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 20 }).notNull(),
	phone: varchar({ length: 14 }).notNull(),
	active: boolean('active').notNull(),
	createdAt: timestamp("joined_at").defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.businessId],
			foreignColumns: [businesses.id],
			name: "customer_business_id_businesses_id_fk"
		}),
]);

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

export const dishes = pgTable("dishes", {
	id: serial().primaryKey().notNull(),
	businessId: serial("business_id").notNull(),
	name: varchar({ length: 100 }).notNull().unique(),
	// Add on a slug(This is what will allows user to provide or share the URL to other more easier very similar to a title but URL do not render spacea ans other characters.)
	description: varchar({ length: 500 }).notNull(),
	imageUrl: text("image_url"),
	price: numeric(),
	tags: varchar('tags', { length: 255 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow(),
	imageName: text("image_name"),
	inStockQty: smallint("in_stock_qty").default(sql`'1'`).notNull(),
	active: dishStatus().default('Active - In Stock').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.businessId],
			foreignColumns: [businesses.id],
			name: "dishes_business_id_businesses_id_fk"
		}),
	unique("dishes_name_unique").on(table.name),
	check("dishes_in_stock_qty_check", sql`in_stock_qty > 0`),
]);

export const dishIngredients = pgTable("dish_ingredients", {
	dishName: varchar("dish_name", { length: 100 }).notNull(),
	dishId: serial("dish_id").notNull(),
	ingredientName: text("ingredient_name").notNull(),
	ingredientId: serial("ingredient_id").notNull(),
	quantity: numeric(),
	unit: varchar({ length: 20 }).notNull(),
	isOptional: boolean("is_optional").default(true),
	isAllogenic: boolean("is_allogenic").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.dishId],
			foreignColumns: [dishes.id],
			name: "dish_ingredients_dish_id_dishes_id_fk"
		}),
	foreignKey({
			columns: [table.dishName],
			foreignColumns: [dishes.name],
			name: "dish_ingredients_dish_name_dishes_name_fk"
		}),
	foreignKey({
			columns: [table.ingredientId],
			foreignColumns: [ingredients.id],
			name: "dish_ingredients_ingredient_id_ingredients_id_fk"
		}),
	foreignKey({
			columns: [table.ingredientName],
			foreignColumns: [ingredients.name],
			name: "dish_ingredients_ingredient_name_ingredients_name_fk"
		}),
	foreignKey({
			columns: [table.isAllogenic],
			foreignColumns: [ingredients.isAllogenic],
			name: "dish_ingredients_is_allogenic_fkey"
		}),
]);

export const ingredients = pgTable("ingredients", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	isAllogenic: boolean("is_allogenic").default(true).notNull(),
}, (table) => [
	unique("ingredients_name_unique").on(table.name),
	unique("ingredients_is_allogenic_key").on(table.isAllogenic),
]);


export const websiteReviews = pgTable("website_reviews", {
	id: serial().primaryKey().notNull(),
	businessId: serial("business_id").notNull(),
	websiteId: serial("website_id").notNull(),
	name: varchar({ length: 100 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.websiteId],
			foreignColumns: [businessWebsite.id],
			name: "website_reviews_business_id_businesses_id_fk"
		}),
	foreignKey({
			columns: [table.businessId],
			foreignColumns: [businesses.id],
			name: "website_reviews_business_id_businesses_id_fk"
	}),
]);

//orders
export const orders = pgTable("orders", {
	id: serial().primaryKey().notNull(),
	businessId: serial("business_id"),
	customerId: serial("customer_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deliveryStatus: varchar("delivery_status", { length: 50 }),
	quantity: integer(),
	specialInstructions: text("special_instructions"),
}, (table) => [
	foreignKey({
			columns: [table.businessId],
			foreignColumns: [businesses.id],
			name: "orders_business_id_businesses_id_fk"
		}),
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customer.id],
			name: "orders_customer_id_customer_id_fk"
		}),
]);

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

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type InsertDish = typeof dishes.$inferSelect;
export type TeamDataWithMembers = Team & {
  teamMembers: (NewTeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};
export type dish = typeof dishes.$inferSelect;

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
