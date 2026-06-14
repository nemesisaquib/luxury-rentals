# Hearth & Key — Boutique Stay Booking Platform

Production-grade full-stack real estate/booking platform.

## Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Framer Motion, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Payments**: Stripe (sandbox)
- **SEO**: next-seo, JSON-LD, sitemap, open graph

## Quick Start

### 1. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Setup database
\`\`\`bash
# Create .env.local with DATABASE_URL
cp .env.example .env.local

# Run migrations
npx prisma db push

# Seed sample data
npm run db:seed
\`\`\`

### 3. Run dev server
\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── properties/   # Property endpoints
│   │   └── bookings/     # Booking endpoints
│   ├── property/[id]/    # Property detail page
│   ├── layout.tsx        # Root layout + SEO
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Hero.tsx
│   └── PropertyCard.tsx
├── lib/
│   └── db.ts            # Prisma client singleton
└── types/               # TypeScript types
```

## Features

- ✅ Property listings with filters
- ✅ Property detail pages with reviews
- ✅ User authentication ready
- ✅ Booking system (backend API)
- ✅ Admin API endpoints
- ✅ SEO optimized (sitemap, JSON-LD, meta tags)
- ✅ Responsive design
- ✅ Framer Motion animations
- ✅ Dark mode ready

## API Endpoints

### Properties
- `GET /api/properties` — List all properties
- `POST /api/properties` — Create property (admin)
- `GET /api/properties/[id]` — Get property details

### Bookings
- `GET /api/bookings` — List bookings by user
- `POST /api/bookings` — Create new booking

## Next Steps

1. **Setup PostgreSQL**
   - Local: `postgres://localhost/hearth_key`
   - Or: Railway, Supabase, Neon

2. **Stripe Integration**
   - Add Stripe keys to `.env.local`
   - Implement payment endpoint

3. **Authentication**
   - Add NextAuth.js or Auth0
   - Protect booking endpoints

4. **Deploy**
   - Vercel (recommended for Next.js)
   - Add production database
   - Set environment variables

## License

© 2026 Hearth & Key
