"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [where, setWhere] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (where) params.set("q", where);
    if (guests) params.set("guests", guests);
    if (checkIn) params.set("in", checkIn);
    if (checkOut) params.set("out", checkOut);
    router.push(`/stays?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="grid overflow-hidden rounded-2xl border hairline bg-white shadow-[0_24px_50px_-24px_rgba(29,42,35,0.28)] sm:grid-cols-[1.2fr_1fr_1fr_0.9fr_auto]"
    >
      <Field label="Where">
        <input
          value={where}
          onChange={(e) => setWhere(e.target.value)}
          placeholder="Lisbon, Kyoto, Oaxaca…"
          className="w-full bg-transparent text-[0.95rem] outline-none placeholder:text-ink-soft/50"
        />
      </Field>
      <Field label="Check-in">
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full bg-transparent text-[0.95rem] outline-none"
        />
      </Field>
      <Field label="Check-out">
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full bg-transparent text-[0.95rem] outline-none"
        />
      </Field>
      <Field label="Guests" last>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full bg-transparent text-[0.95rem] outline-none"
        >
          <option value="2">2 guests</option>
          <option value="4">4 guests</option>
          <option value="6">6+ guests</option>
        </select>
      </Field>
      <button
        type="submit"
        aria-label="Search stays"
        className="flex items-center justify-center bg-clay px-7 py-4 text-xl text-white transition-colors hover:bg-clay-dark sm:py-0"
      >
        →
      </button>
    </form>
  );
}

function Field({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-0.5 px-5 py-4 ${
        last ? "" : "border-b hairline sm:border-b-0 sm:border-r"
      }`}
    >
      <label className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-moss">
        {label}
      </label>
      {children}
    </div>
  );
}
