import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardOverview() {
  const session = await getSession();
  
  // Mocking user and bookings to bypass Prisma DB connection locally
  const user = { name: session?.role === "ADMIN" ? "Demo Admin" : "Demo User", email: "demo@hearthandkey.com" };
  const upcomingBookings = 0;

  return (
    <div className="pb-24">
      <h1 className="font-serif text-[clamp(2rem,3vw,2.5rem)] font-normal leading-[1.05] tracking-[-0.015em] mb-12">
        Welcome back, <em className="text-clay">{user?.name || user?.email?.split('@')[0]}</em>
      </h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-soft border hairline transition-transform hover:-translate-y-1">
          <h3 className="text-[0.65rem] uppercase tracking-[0.2em] text-moss font-bold mb-3">Upcoming Trips</h3>
          <p className="font-serif text-4xl text-ink mb-6">{upcomingBookings}</p>
          <Link href="/dashboard/bookings" className="text-sm font-medium text-clay hover:text-gold transition-colors">
            View bookings →
          </Link>
        </div>
        
        <div className="bg-ink p-8 rounded-3xl shadow-soft border hairline transition-transform hover:-translate-y-1 flex flex-col justify-between">
          <div>
            <h3 className="text-[0.65rem] uppercase tracking-[0.2em] text-gold font-bold mb-3">Ready to escape?</h3>
            <p className="text-cream text-sm font-light opacity-80 max-w-[24ch]">Discover new homes vetted by our scouts. Your next journey awaits.</p>
          </div>
          <Link href="/stays" className="inline-flex mt-6 w-max rounded-full bg-cream px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-transform hover:-translate-y-0.5">
            Browse Stays
          </Link>
        </div>
      </div>
    </div>
  );
}
