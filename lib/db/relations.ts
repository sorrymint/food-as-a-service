import { relations } from "drizzle-orm/relations";
import { customer, customerOrder, delivery, dishes, orders, teams, activityLogs, users,
    businesses, invitations, teamMembers, websiteReviews, businessWebsite,
    dishIngredients, ingredients, drivers } from "/lib/db/schema";

export const customerOrderRelations = relations(customerOrder, ({one, many}) => ({
	customer: one(customer, {
		fields: [customerOrder.customerId],
		references: [customer.id]
	}),
	delivery: one(delivery, {
		fields: [customerOrder.deliveryStatus],
		references: [delivery.status],
		relationName: "customerOrder_deliveryStatus_delivery_status"
	}),
	dish: one(dishes, {
		fields: [customerOrder.menuItem],
		references: [dishes.id]
	}),
	order: one(orders, {
		fields: [customerOrder.ordersId],
		references: [orders.id]
	}),
	deliveries: many(delivery, {
		relationName: "delivery_customerOrderId_customerOrder_id"
	}),
}));

export const customerRelations = relations(customer, ({one, many}) => ({
	customerOrders: many(customerOrder),
	business: one(businesses, {
		fields: [customer.businessId],
		references: [businesses.id]
	}),
	orders: many(orders),
}));

export const deliveryRelations = relations(delivery, ({one, many}) => ({
	customerOrders: many(customerOrder, {
		relationName: "customerOrder_deliveryStatus_delivery_status"
	}),
	customerOrder: one(customerOrder, {
		fields: [delivery.customerOrderId],
		references: [customerOrder.id],
		relationName: "delivery_customerOrderId_customerOrder_id"
	}),
	driver: one(drivers, {
		fields: [delivery.driverId],
		references: [drivers.id]
	}),
}));

export const dishesRelations = relations(dishes, ({one, many}) => ({
	customerOrders: many(customerOrder),
	business: one(businesses, {
		fields: [dishes.businessId],
		references: [businesses.id]
	}),
	dishIngredients_dishId: many(dishIngredients, {
		relationName: "dishIngredients_dishId_dishes_id"
	}),
	dishIngredients_dishName: many(dishIngredients, {
		relationName: "dishIngredients_dishName_dishes_name"
	}),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	customerOrders: many(customerOrder),
	business: one(businesses, {
		fields: [orders.businessId],
		references: [businesses.id]
	}),
	customer: one(customer, {
		fields: [orders.customerId],
		references: [customer.id]
	}),
}));

export const activityLogsRelations = relations(activityLogs, ({one}) => ({
	team: one(teams, {
		fields: [activityLogs.teamId],
		references: [teams.id]
	}),
	user: one(users, {
		fields: [activityLogs.userId],
		references: [users.id]
	}),
}));

export const teamsRelations = relations(teams, ({many}) => ({
	activityLogs: many(activityLogs),
	invitations: many(invitations),
	teamMembers: many(teamMembers),
}));

export const usersRelations = relations(users, ({many}) => ({
	activityLogs: many(activityLogs),
	invitations: many(invitations),
	teamMembers: many(teamMembers),
}));

export const businessesRelations = relations(businesses, ({one, many}) => ({
	customers: many(customer),
	websiteReviews: many(websiteReviews),
	businessWebsites: many(businessWebsite, {
		relationName: "businessWebsite_businessId_businesses_id"
	}),
	orders: many(orders),
	dishes: many(dishes),
	businessWebsite: one(businessWebsite, {
		fields: [businesses.websiteUrl],
		references: [businessWebsite.url],
		relationName: "businesses_websiteUrl_businessWebsite_url"
	}),
}));

export const invitationsRelations = relations(invitations, ({one}) => ({
	user: one(users, {
		fields: [invitations.invitedBy],
		references: [users.id]
	}),
	team: one(teams, {
		fields: [invitations.teamId],
		references: [teams.id]
	}),
}));

export const teamMembersRelations = relations(teamMembers, ({one}) => ({
	team: one(teams, {
		fields: [teamMembers.teamId],
		references: [teams.id]
	}),
	user: one(users, {
		fields: [teamMembers.userId],
		references: [users.id]
	}),
}));

export const websiteReviewsRelations = relations(websiteReviews, ({one}) => ({
	business: one(businesses, {
		fields: [websiteReviews.websiteId],
		references: [businesses.id]
	}),
}));

export const businessWebsiteRelations = relations(businessWebsite, ({one, many}) => ({
	business: one(businesses, {
		fields: [businessWebsite.businessId],
		references: [businesses.id],
		relationName: "businessWebsite_businessId_businesses_id"
	}),
	businesses: many(businesses, {
		relationName: "businesses_websiteUrl_businessWebsite_url"
	}),
}));

export const dishIngredientsRelations = relations(dishIngredients, ({one}) => ({
	dish_dishId: one(dishes, {
		fields: [dishIngredients.dishId],
		references: [dishes.id],
		relationName: "dishIngredients_dishId_dishes_id"
	}),
	dish_dishName: one(dishes, {
		fields: [dishIngredients.dishName],
		references: [dishes.name],
		relationName: "dishIngredients_dishName_dishes_name"
	}),
	ingredient_ingredientId: one(ingredients, {
		fields: [dishIngredients.ingredientId],
		references: [ingredients.id],
		relationName: "dishIngredients_ingredientId_ingredients_id"
	}),
	ingredient_ingredientName: one(ingredients, {
		fields: [dishIngredients.ingredientName],
		references: [ingredients.name],
		relationName: "dishIngredients_ingredientName_ingredients_name"
	}),
	ingredient_isAllogenic: one(ingredients, {
		fields: [dishIngredients.isAllogenic],
		references: [ingredients.isAllogenic],
		relationName: "dishIngredients_isAllogenic_ingredients_isAllogenic"
	}),
}));

export const ingredientsRelations = relations(ingredients, ({many}) => ({
	dishIngredients_ingredientId: many(dishIngredients, {
		relationName: "dishIngredients_ingredientId_ingredients_id"
	}),
	dishIngredients_ingredientName: many(dishIngredients, {
		relationName: "dishIngredients_ingredientName_ingredients_name"
	}),
	dishIngredients_isAllogenic: many(dishIngredients, {
		relationName: "dishIngredients_isAllogenic_ingredients_isAllogenic"
	}),
}));

export const driversRelations = relations(drivers, ({many}) => ({
	deliveries: many(delivery),
}));