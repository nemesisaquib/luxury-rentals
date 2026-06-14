"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSettings() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name && !password) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Profile updated successfully!");
        setName("");
        setPassword("");
        router.refresh();
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data.error || "Failed to update profile");
      }
    } catch {
      setStatus("error");
      setMessage("Network error occurred");
    }
  };

  return (
    <div className="pb-24">
      <h1 className="font-serif text-[clamp(2rem,3vw,2.5rem)] font-normal leading-[1.05] tracking-[-0.015em] mb-12">
        Profile <em className="text-clay">Settings</em>
      </h1>

      <div className="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-soft border hairline max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-moss mb-2">
              Update Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New name"
              className="w-full rounded-xl border hairline bg-cream-2/40 px-4 py-3 text-sm outline-none focus:border-clay placeholder:text-ink-soft/50"
            />
          </div>

          <div>
            <label className="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-moss mb-2">
              Update Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password (min 6 chars)"
              className="w-full rounded-xl border hairline bg-cream-2/40 px-4 py-3 text-sm outline-none focus:border-clay placeholder:text-ink-soft/50"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-sm ${status === 'success' ? 'bg-moss/10 text-moss' : 'bg-clay/10 text-clay-dark'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || (!name && !password)}
            className="w-full rounded-full bg-clay py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-clay-dark disabled:opacity-50"
          >
            {status === "loading" ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
