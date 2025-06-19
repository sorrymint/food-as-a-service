CREATE TABLE IF NOT EXISTS "businesses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(225) NOT NULL,
	"num_customers" integer NOT NULL,
	"active" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(20) NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(20) NOT NULL,
	"phone" varchar(14),
	"active" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dish_ingredients" (
	"dish_name" varchar(100) NOT NULL,
	"dish_id" serial PRIMARY KEY NOT NULL,
	"ingredient_name" varchar(100) NOT NULL,
	"ingredient_id" serial PRIMARY KEY NOT NULL,
	"quantity" numeric,
	"unit" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dishes" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(500) NOT NULL,
	"active" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(500),
	"is_optional" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_dish_name_dishes_name_fk" FOREIGN KEY ("dish_name") REFERENCES "public"."dishes"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_dish_id_dishes_id_fk" FOREIGN KEY ("dish_id") REFERENCES "public"."dishes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_ingredient_name_ingredients_name_fk" FOREIGN KEY ("ingredient_name") REFERENCES "public"."ingredients"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;