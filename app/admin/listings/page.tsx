"use client";

import { useEffect, useState } from "react";

export default function AdminListings() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/listings")
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-ink-soft animate-pulse">Loading listings...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl">Listings</h1>
        <button className="bg-clay text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-clay-dark transition-colors">
          Add Listing
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border hairline overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cream-2/50 border-b hairline">
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Title</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Location</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Price/Night</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map(listing => (
              <tr key={listing.id} className="border-b hairline last:border-0 hover:bg-cream-2/20">
                <td className="p-4 font-medium">{listing.title}</td>
                <td className="p-4 text-ink-soft">{listing.location}</td>
                <td className="p-4">${listing.pricePerNight}</td>
                <td className="p-4">
                  <button className="text-clay hover:underline text-sm mr-4">Edit</button>
                  <button className="text-clay-dark hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
            {listings.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-ink-soft">No listings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
