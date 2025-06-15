DO
$$
DECLARE
    tbl RECORD;
BEGIN
    -- Loop through all tables in the public schema
    FOR tbl IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
    LOOP
        -- Drop each table with CASCADE to remove dependencies
        EXECUTE format('DROP TABLE IF EXISTS public.%I CASCADE;', tbl.tablename);
    END LOOP;
END;
$$;


-- ENUM TYPES
CREATE TYPE "user_role" AS ENUM ('CUSTOMER', 'OWNER', 'ADMIN');
CREATE TYPE "admin_access_level" AS ENUM ('BASIC', 'MODERATOR', 'SUPER');
CREATE TYPE "admin_action" AS ENUM ('CREATE', 'DELETE', 'EDIT');
CREATE TYPE "website_status" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'REJECTED', 'PUBLISHED');
CREATE TYPE "review_action" AS ENUM ('APPROVE', 'REJECT');

CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR,
    "password_hash" VARCHAR,
    "name" VARCHAR,
    "role" "user_role",
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
);
COMMENT ON COLUMN "user"."role" IS 'Defines user type';

CREATE TABLE IF NOT EXISTS "admin" (
    "id" INTEGER PRIMARY KEY REFERENCES "user"("id"),
    "access_level" "admin_access_level",
    "created_at" TIMESTAMP,
);
COMMENT ON COLUMN "admin"."access_level" IS 'Optional role tiers';

CREATE TABLE IF NOT EXISTS "business" (
    "id" VARCHAR PRIMARY KEY,
    "name" VARCHAR,
    "num_of_customers" INT,
    "active" BOOLEAN,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "admin_business_action" (
    "id" SERIAL PRIMARY KEY,
    "admin_id" INTEGER REFERENCES "admin"("id"),
    "business_id" VARCHAR REFERENCES "business"("id"),
    "action" "admin_action",
    "reason" TEXT,
    "timestamp" TIMESTAMP DEFAULT now() NOT NULL,
);
COMMENT ON COLUMN "admin_business_action"."action" IS 'What the admin did';
COMMENT ON COLUMN "admin_business_action"."reason" IS 'Optional reason or comment';

CREATE TABLE IF NOT EXISTS "business_website" (
    "id" SERIAL PRIMARY KEY,
    "business_id" VARCHAR REFERENCES "business"("id"),
    "title" VARCHAR,
    "description" TEXT,
    "content" TEXT,
    "status" "website_status" DEFAULT 'DRAFT',
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "website_review_log" (
    "id" SERIAL PRIMARY KEY,
    "website_id" INTEGER REFERENCES "business_website"("id"),
    "admin_id" INTEGER REFERENCES "admin"("id"),
    "action" "review_action",
    "comment" TEXT,
    "reviewed_at" TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "customer" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR,
    "name" VARCHAR,
    "email" VARCHAR,
    "phone" VARCHAR,
    "active" BOOLEAN,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "customer_of_business" (
    "customer_id" INTEGER REFERENCES "customer"("id"),
    "business_id" VARCHAR REFERENCES "business"("id"),
    "joined_at" TIMESTAMP DEFAULT now() NOT NULL,
    PRIMARY KEY ("customer_id", "business_id")
);

CREATE TABLE IF NOT EXISTS "food" (
    "id" SERIAL PRIMARY KEY,
    "business_id" VARCHAR REFERENCES "business"("id"),
    "name" VARCHAR,
    "description" TEXT,
    "active" BOOLEAN,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "ingredient" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "description" TEXT,
    "is_optional" BOOLEAN,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "food_ingredient" (
    "food_id" INTEGER REFERENCES "food"("id"),
    "ingredient_id" INTEGER REFERENCES "ingredient"("id"),
    "default_quantity" DECIMAL,
    "unit" VARCHAR,
    PRIMARY KEY ("food_id", "ingredient_id")
);

CREATE TABLE IF NOT EXISTS "order" (
    "id" SERIAL PRIMARY KEY,
    "business_id" VARCHAR REFERENCES "business"("id"),
    "customer_id" INTEGER REFERENCES "customer"("id"),
    "quantity" INT,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "delivery_status" VARCHAR,
    "special_instructions" TEXT
);

CREATE TABLE IF NOT EXISTS "driver" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR,
    "last_name" VARCHAR
);

CREATE TABLE IF NOT EXISTS "delivery" (
    "id" SERIAL PRIMARY KEY,
    "driver_id" INTEGER REFERENCES "driver"("id"),
    "customer_id" INTEGER REFERENCES "customer"("id"),
    "status" VARCHAR,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "order_item" (
    "id" SERIAL PRIMARY KEY,
    "order_id" INTEGER REFERENCES "order"("id"),
    "food_id" INTEGER REFERENCES "food"("id"),
    "quantity" INT,
    "special_instructions" TEXT
);

CREATE TABLE IF NOT EXISTS "order_item_ingredient" (
    "order_item_id" INTEGER REFERENCES "order_item"("id"),
    "ingredient_id" INTEGER REFERENCES "ingredient"("id"),
    "quantity" DECIMAL,
    "unit" VARCHAR,
    PRIMARY KEY ("order_item_id", "ingredient_id")
);

CREATE TABLE IF NOT EXISTS "activity_logs" (
    "id" serial PRIMARY KEY NOT NULL,
    "team_id" integer NOT NULL,
    "user_id" integer,
    "action" text NOT NULL,
    "timestamp" timestamp DEFAULT now() NOT NULL,
    "ip_address" varchar(45)
);

CREATE TABLE IF NOT EXISTS "invitations" (
    "id" serial PRIMARY KEY NOT NULL,
    "team_id" integer NOT NULL,
    "email" varchar(255) NOT NULL,
    "role" varchar(50) NOT NULL,
    "invited_by" integer NOT NULL,
    "invited_at" timestamp DEFAULT now() NOT NULL,
    "status" varchar(20) DEFAULT 'pending' NOT NULL
);

CREATE TABLE IF NOT EXISTS "team_members" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "team_id" integer NOT NULL,
    "role" varchar(50) NOT NULL,
    "joined_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "teams" (
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

CREATE TABLE IF NOT EXISTS "users" (
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

DO $$ BEGIN
 ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
 ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
 ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
 ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;
