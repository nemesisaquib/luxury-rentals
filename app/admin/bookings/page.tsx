"use client";

import { useEffect, useState } from "react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  if (loading) return <div className="text-ink-soft animate-pulse">Loading bookings...</div>;

  return (
    <div>
      <h1 className="font-serif text-4xl mb-8">Bookings</h1>

      <div className="bg-white rounded-3xl shadow-sm border hairline overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cream-2/50 border-b hairline">
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Listing</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">User</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Dates</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Status</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className="border-b hairline last:border-0 hover:bg-cream-2/20">
                <td className="p-4 font-medium">{booking.listing?.title || "Unknown"}</td>
                <td className="p-4 text-ink-soft">{booking.user?.name || booking.userId}</td>
                <td className="p-4 text-sm text-ink-soft">
                  {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    booking.status === "CONFIRMED" ? "bg-moss/10 text-moss" :
                    booking.status === "CANCELLED" ? "bg-clay-dark/10 text-clay-dark" :
                    "bg-gold/10 text-gold"
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                    className="border hairline rounded p-1 text-sm outline-none focus:border-clay"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirm</option>
                    <option value="CANCELLED">Cancel</option>
                  </select>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-ink-soft">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
