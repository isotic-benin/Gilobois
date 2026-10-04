This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Create `.env.local` from `.env.example` and set `MONGODB_URI` first. Then run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

`npm run dev` runs `npm run db:seed` before starting Next.js. By default, the
seed only initializes an empty database. If any of the `products`, `categories`,
or `users` collections already contains data, seeding is skipped. To apply the
catalogue seed updates to an existing database, temporarily set `SEED_FORCE=true`
and run `npm run db:seed`. Forced updates are limited to seed product SKUs:
they set each stock to 30 and remove the old catalogue/product source
characteristics. Existing categories, orders, reviews, sales counters, and user
accounts are preserved. Missing categories required by the seed are created.
If MongoDB is unavailable or the seed fails, the development server does not
start.

On PowerShell, run a one-time forced update with:

```powershell
$env:SEED_FORCE = "true"
npm run db:seed
Remove-Item Env:SEED_FORCE
```

For production, set `SEED_FORCE=true` only for the deployment or one-off seed
run, then unset it afterwards. Do not commit production database credentials.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
