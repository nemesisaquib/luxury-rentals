# Hearth & Key — Luxury Boutique Stays

**Hearth & Key** is a premium, full-stack vacation rental and boutique stay booking platform. Designed with an emphasis on high-end luxury, seamless user experience, and modern aesthetics, it connects travelers with hand-picked, curated properties around the world.

---

## 🌟 What is Hearth & Key?

Hearth & Key is built for modern travelers seeking extraordinary experiences. 
- **For Users:** Browse a curated collection of beautiful homes, filter by categories (Coastal, Countryside, Desert, City), view rich image galleries, check availability, and contact hosts. The site features a highly dynamic, smooth, and interactive UI with live search capabilities.
- **For Property Owners:** A dedicated career/hosting portal allows property owners to apply to list their properties and join the exclusive Hearth & Key portfolio.

## 🚀 How to Use the App

### As a Guest (User)
1. **Discover:** Use the interactive live search on the homepage to find stays by location (e.g., "Lisbon", "Kyoto").
2. **Explore:** Click on any property to view its full details, image gallery, amenities, and host notes.
3. **Connect:** Use the "Get in Touch" forms to submit booking inquiries or general questions.
4. **Careers/Hosting:** Navigate to the Careers/Hosting page to view open roles or apply to become a host.

### As an Administrator
The application features a fully protected, built-in Admin Dashboard for managing the platform.
1. **Access the Dashboard:** Navigate to `/admin` or click "Admin" in the navigation if logged in.
2. **Dashboard Features:**
   - **Messages:** View and manage inquiries from users (contact forms, hosting applications).
   - **Listings:** View active property listings.
   - **Careers:** Add, close, or reopen job postings dynamically.
   - **Global Settings:** Update the site's master configuration (Email, Phone, Address, Social Links). Changes made here instantly update across the site's footer and contact pages!

---

## 💻 Tech Stack & Architecture

This platform is built using a modern, scalable, and highly performant tech stack:

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS (with custom design tokens for a premium feel)
- **Animations:** Framer Motion (for smooth page transitions, scroll effects, and micro-interactions)
- **Typography:** Custom Google Fonts (Fraunces & Karla)

### Backend & API
- **API Routes:** Next.js Route Handlers (`/api/admin/settings`, `/api/admin/careers`, etc.) for building out a robust REST-like API.
- **Authentication:** Custom session-based auth using cookies (JWT/Session tokens via `jose`).
- **Database ORM:** Prisma
- **Database:** PostgreSQL

---

## 🛠 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Setup database
```bash
# Create .env.local with your POSTGRES_URL and AUTH_SECRET
cp .env.example .env.local

# Run Prisma migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Design & Development

Designed and developed by **Mohd Aquib Javed**. 
To view more of my work, check out my portfolio:
👉 [https://aquibdesigner.framer.website/](https://aquibdesigner.framer.website/)
