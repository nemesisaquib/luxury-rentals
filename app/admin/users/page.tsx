"use client";

import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-ink-soft animate-pulse">Loading users...</div>;

  return (
    <div>
      <h1 className="font-serif text-4xl mb-8">Users</h1>

      <div className="bg-white rounded-3xl shadow-sm border hairline overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cream-2/50 border-b hairline">
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Name</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Email</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Role</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Bookings</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-moss">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hairline last:border-0 hover:bg-cream-2/20">
                <td className="p-4 font-medium">{user.name || "N/A"}</td>
                <td className="p-4 text-ink-soft">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    user.role === "ADMIN" ? "bg-clay/10 text-clay" : "bg-ink/5 text-ink-soft"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-ink-soft">{user._count?.bookings || 0}</td>
                <td className="p-4 text-sm text-ink-soft">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-ink-soft">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
