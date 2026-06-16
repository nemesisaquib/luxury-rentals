import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function UserBookings() {
  const session = await getSession();
  
  const bookings = await prisma.booking.findMany({
    where: { userId: session?.userId },
    include: { property: true },
    orderBy: { checkIn: 'desc' }
  });

  return (
    <div className="pb-24">
      <h1 className="font-serif text-[clamp(2rem,3vw,2.5rem)] font-normal leading-[1.05] tracking-[-0.015em] mb-12">
        My <em className="text-clay">Bookings</em>
      </h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white/80 backdrop-blur p-12 rounded-3xl shadow-soft border hairline text-center">
          <p className="text-ink-soft mb-6">You don't have any bookings yet.</p>
          <Link href="/stays" className="inline-flex rounded-full bg-clay px-8 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-clay-dark">
            Find a Stay
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white/80 backdrop-blur p-6 rounded-3xl shadow-soft border hairline flex gap-8 items-center transition-transform hover:-translate-y-1">
              <div className="relative w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                <Image
                  src={booking.property.images?.[0] || "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80"}
                  alt={booking.property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-moss">
                  {booking.property.location}, {booking.property.country}
                </div>
                <h3 className="mb-2 font-serif text-xl font-medium tracking-tight">
                  <Link href={`/stays/${booking.property.slug}`} className="hover:text-clay transition-colors">
                    {booking.property.title}
                  </Link>
                </h3>
                <div className="text-sm text-ink-soft">
                  {booking.checkIn.toLocaleDateString()} – {booking.checkOut.toLocaleDateString()}
                  <span className="mx-2">·</span>
                  {booking.guests} guests
                </div>
              </div>
              <div className="text-right pr-4">
                <div className="font-serif text-2xl font-semibold">${booking.totalPrice}</div>
                <div className={`text-xs mt-1 font-semibold uppercase tracking-widest ${booking.status === 'CONFIRMED' ? 'text-moss' : 'text-clay'}`}>
                  {booking.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
