# Shadcn Admin

Production-ready admin dashboard powered by Next.js, Shadcn/UI and Better-Auth. Includes authentication flows, interactive charts, data tables, and a distinctive gradient-accented design system.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/shadcn-admin.git
cd shadcn-admin
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Then update `.env` with your values.

### 4. Set up database

```bash
pnpm db:generate
pnpm db:migrate
```

### 5. Seed the database

```bash
pnpm db:seed
```

### 6. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Credentials

After seeding the database, you can sign in with:

- **Email:** admin@example.com
- **Password:** Admin123!@#

## Database Commands

| Command                     | Description                |
| --------------------------- | -------------------------- |
| `pnpm db:push`              | Push schema to database    |
| `pnpm db:studio`            | Open Drizzle Studio        |
| `pnpm db:generate`          | Generate migrations        |
| `pnpm db:migrate`           | Run migrations             |
| `pnpm db:seed`              | Seed test user             |
| `pnpm db:seed -- --force`   | Recreate test user         |
