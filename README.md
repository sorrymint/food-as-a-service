# DineDirect - Food as a Service

Dine Direct is a food SaaS application created using **Next.js** with support for authentication, Stripe integration for payments, and a dashboard for logged-in admin.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Payments**: [Stripe](https://stripe.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)

## Features

- Resturant landing page (`/`) 
- Cart page (`/pricing`) which connects to Stripe Checkout
- Administrative dashboard that displays different metrics about different businesses on the platform 
- Menu page with business menu
- Customers and business can login 
- Admin dashboard pages with CRUD operations on different businesses
- Email/password authentication with JWTs stored to cookies
- Global middleware to protect logged-in routes
- Local middleware to protect Server Actions or validate Zod schemas

## Website Link

DineDirect Website - https://food-as-a-service.vercel.app/

## Getting Started

```bash
git clone https://github.com/nextjs/saas-starter
cd saas-starter
pnpm install
```

## Running Locally
To run the Next.js development server locally:

```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Documentation

Initial Stripe Setup - https://indianhills0.sharepoint.com/:u:/r/sites/FieldProjects/SitePages/Initial-Setup.aspx?csf=1&web=1&share=EdtvRvXDwy9Pq49pofilDDwBd80yAZh5gribYUUIW912rg&e=aTiZ8i

Changing and viewing the database - https://indianhills0.sharepoint.com/:u:/r/sites/FieldProjects/SitePages/How-to-Change-and-View-Database.aspx?csf=1&web=1&e=oSViCo


## Developers

- Ashley
- Clayton
- Keith
- Shimea 
- Laillah 
- Jaxon
