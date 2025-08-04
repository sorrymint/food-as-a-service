DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TYPE "public"."Delivery_Status" AS ENUM('Picked Up', 'On the Way', 'Delivered');--> statement-breakpoint
CREATE TYPE "public"."Dish_Status" AS ENUM('Active - In Stock', 'Discontinued', 'Out of Stock');--> statement-breakpoint
CREATE TYPE "public"."Website_Status" AS ENUM('Live - Published', 'Pending - Editing', 'Created - Started');--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"user_id" integer,
	"action" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"ip_address" varchar(45)
);
--> statement-breakpoint
CREATE TABLE "business_website" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" serial NOT NULL,
	"url" text DEFAULT 'https://food-as-a-service.vercel.app/' NOT NULL,
	"description" varchar(500) DEFAULT 'This is a restaurant description. Please update later.' NOT NULL,
	"status" "Website_Status" DEFAULT 'Created - Started' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "business_website_title_key" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "businesses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"num_customers" integer NOT NULL,
	"active" boolean NOT NULL,
	"status" "Website_Status",
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone,
	"description" text,
	"website_url" text
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" serial NOT NULL,
	"username" varchar(20) NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(20) NOT NULL,
	"phone" varchar(14),
	"active" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer_order" (
	"id" serial PRIMARY KEY NOT NULL,
	"orders_id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"customer_id" serial NOT NULL,
	"menu_item" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"delivery_status" "Delivery_Status" DEFAULT 'Picked Up'
);
--> statement-breakpoint
CREATE TABLE "delivery" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_order_id" serial NOT NULL,
	"driver_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" "Delivery_Status" DEFAULT 'Picked Up',
	"updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
	CONSTRAINT "delivery_status_key" UNIQUE("status")
);
--> statement-breakpoint
CREATE TABLE "dish_ingredients" (
	"dish_name" varchar(100) NOT NULL,
	"dish_id" serial NOT NULL,
	"ingredient_name" text NOT NULL,
	"ingredient_id" serial NOT NULL,
	"quantity" numeric,
	"unit" varchar(20) NOT NULL,
	"is_optional" boolean DEFAULT true,
	"is_allogenic" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dishes" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(500) NOT NULL,
	"image_url" text,
	"price" numeric,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"image_name" text,
	"in_stock_qty" smallint DEFAULT '1' NOT NULL,
	"active" "Dish_Status" DEFAULT 'Active - In Stock' NOT NULL,
	CONSTRAINT "dishes_name_unique" UNIQUE("name"),
	CONSTRAINT "dishes_in_stock_qty_check" CHECK (in_stock_qty > 0)
);
--> statement-breakpoint
CREATE TABLE "drivers" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"is_allogenic" boolean DEFAULT true NOT NULL,
	CONSTRAINT "ingredients_name_unique" UNIQUE("name"),
	CONSTRAINT "ingredients_is_allogenic_key" UNIQUE("is_allogenic")
);
--> statement-breakpoint
CREATE TABLE "invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"invited_by" integer NOT NULL,
	"invited_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer,
	"customer_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"delivery_status" varchar(50),
	"quantity" integer,
	"special_instructions" text
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"team_id" integer NOT NULL,
	"role" varchar(50) NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"stripe_product_id" text,
	"plan_name" varchar(50),
	"subscription_status" varchar(20),
	CONSTRAINT "teams_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "teams_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"role" varchar(20) DEFAULT 'member' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "website_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"website_id" serial NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_website" ADD CONSTRAINT "business_website_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_website_url_fkey" FOREIGN KEY ("website_url") REFERENCES "public"."business_website"("url") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer" ADD CONSTRAINT "customer_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_order" ADD CONSTRAINT "customer_order_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_order" ADD CONSTRAINT "customer_order_delivery_status_fkey" FOREIGN KEY ("delivery_status") REFERENCES "public"."delivery"("status") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_order" ADD CONSTRAINT "customer_order_menu_item_dishes_id_fk" FOREIGN KEY ("menu_item") REFERENCES "public"."dishes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_order" ADD CONSTRAINT "customer_order_orders_id_orders_id_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_customer_order_id_fkey" FOREIGN KEY ("customer_order_id") REFERENCES "public"."customer_order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_driver_id_drivers_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_dish_id_dishes_id_fk" FOREIGN KEY ("dish_id") REFERENCES "public"."dishes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_dish_name_dishes_name_fk" FOREIGN KEY ("dish_name") REFERENCES "public"."dishes"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_ingredient_name_ingredients_name_fk" FOREIGN KEY ("ingredient_name") REFERENCES "public"."ingredients"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_is_allogenic_fkey" FOREIGN KEY ("is_allogenic") REFERENCES "public"."ingredients"("is_allogenic") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_reviews" ADD CONSTRAINT "website_reviews_business_id_businesses_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;