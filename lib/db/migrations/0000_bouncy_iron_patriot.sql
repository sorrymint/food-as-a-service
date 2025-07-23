CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer,
	"customer_id" integer,
	"quantity" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"delivery_status" varchar(50),
	"special_instructions" text
);
--> statement-breakpoint
ALTER TABLE "customer_order" DROP CONSTRAINT "customer_order_orders_id_website_reviews_id_fk";
--> statement-breakpoint
ALTER TABLE "delivery" DROP CONSTRAINT "delivery_orders_id_website_reviews_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_order" ADD CONSTRAINT "customer_order_orders_id_orders_id_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_orders_id_orders_id_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;