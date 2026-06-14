"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-ink-soft animate-pulse">Loading dashboard...</div>;

  return (
    <div className="pb-24">
      <h1 className="font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.05] tracking-[-0.015em] mb-12">
        Dashboard <em className="text-clay">Overview</em>
      </h1>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-glass border hairline transition-transform hover:-translate-y-1 hover:shadow-soft">
          <h3 className="text-[0.65rem] uppercase tracking-[0.2em] text-moss font-bold mb-3">Total Revenue</h3>
          <p className="font-serif text-5xl text-ink">${stats?.totalRevenue?.toLocaleString()}</p>
        </div>
        <div className="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-glass border hairline transition-transform hover:-translate-y-1 hover:shadow-soft">
          <h3 className="text-[0.65rem] uppercase tracking-[0.2em] text-moss font-bold mb-3">Total Bookings</h3>
          <p className="font-serif text-5xl text-ink">{stats?.totalBookings}</p>
        </div>
        <div className="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-glass border hairline transition-transform hover:-translate-y-1 hover:shadow-soft">
          <h3 className="text-[0.65rem] uppercase tracking-[0.2em] text-moss font-bold mb-3">Active Listings</h3>
          <p className="font-serif text-5xl text-ink">{stats?.totalListings}</p>
        </div>
        <div className="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-glass border hairline transition-transform hover:-translate-y-1 hover:shadow-soft">
          <h3 className="text-[0.65rem] uppercase tracking-[0.2em] text-moss font-bold mb-3">Total Users</h3>
          <p className="font-serif text-5xl text-ink">{stats?.totalUsers}</p>
        </div>
      </div>
    </div>
  );
}
