CREATE TABLE "carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" serial NOT NULL,
	"customer_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "cartItems" DROP CONSTRAINT "cartItems_customer_id_customer_id_fk";
--> statement-breakpoint
ALTER TABLE "cartItems" ADD COLUMN "cart_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "cartItems" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cartItems" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "cartItems" DROP COLUMN "customer_id";