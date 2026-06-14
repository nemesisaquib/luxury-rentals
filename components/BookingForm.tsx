"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

const bookingSchema = z.object({
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.number().min(1),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
}).refine(
  (data) => {
    if (!data.checkIn || !data.checkOut) return true;
    return new Date(data.checkOut) > new Date(data.checkIn);
  },
  {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  }
);

type FormErrors = Partial<Record<keyof z.infer<typeof bookingSchema>, string>>;

export default function BookingForm({
  listingId,
  price,
  maxGuests,
  initialName = "",
  initialEmail = "",
}: {
  listingId: string;
  price: number;
  maxGuests: number;
  initialName?: string;
  initialEmail?: string;
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [confirmation, setConfirmation] = useState<{
    id: string;
    nights: number;
    total: number;
  } | null>(null);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.round(ms / 86400000));
  }, [checkIn, checkOut]);

  const subtotal = nights * price;
  const cleaning = nights > 0 ? 65 : 0;
  const total = subtotal + cleaning;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setMessage("");

    const formData = { checkIn, checkOut, guests, name, email };
    const result = bookingSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof typeof formData;
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId,
          guestName: name,
          guestEmail: email,
          checkIn,
          checkOut,
          guests,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setConfirmation({
        id: data.booking.id,
        nights: data.booking.nights,
        total: data.booking.total + cleaning,
      });
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "ok" && confirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border hairline bg-white p-7 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-moss/15 text-2xl text-moss">
          ✓
        </div>
        <h3 className="font-serif text-2xl font-medium">You're booked.</h3>
        <p className="mt-2 text-sm text-ink-soft">
          {confirmation.nights} night{confirmation.nights > 1 ? "s" : ""} ·
          confirmation{" "}
          <span className="font-mono text-xs">{confirmation.id.slice(-8)}</span>
        </p>
        <div className="mt-5 border-t hairline pt-5 font-serif text-3xl font-semibold tabular-nums">
          ${confirmation.total.toLocaleString()}
        </div>
        <p className="mt-1 text-xs text-ink-soft">
          The host's field notes are on their way to {email}.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-2xl border hairline bg-white p-6 shadow-[0_24px_50px_-30px_rgba(29,42,35,0.4)]"
    >
      <div className="mb-5 flex items-baseline gap-1.5">
        <span className="font-serif text-3xl font-semibold tabular-nums">
          ${price}
        </span>
        <span className="text-sm text-ink-soft">/ night</span>
      </div>

      <div className="grid grid-cols-2 overflow-hidden rounded-xl border hairline">
        <label className="flex flex-col gap-0.5 border-r hairline px-4 py-3">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-moss">
            Check-in
          </span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (errors.checkIn) setErrors((prev) => ({ ...prev, checkIn: undefined }));
            }}
            className="bg-transparent text-sm outline-none"
          />
        </label>
        <label className="flex flex-col gap-0.5 px-4 py-3">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-moss">
            Check-out
          </span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              if (errors.checkOut) setErrors((prev) => ({ ...prev, checkOut: undefined }));
            }}
            className="bg-transparent text-sm outline-none"
          />
        </label>
      </div>
      {(errors.checkIn || errors.checkOut) && (
        <div className="mt-1 px-1 text-xs text-clay-dark">
          {errors.checkIn || errors.checkOut}
        </div>
      )}

      <label className="mt-3 flex items-center justify-between rounded-xl border hairline px-4 py-3">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-moss">
          Guests
        </span>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="bg-transparent text-sm outline-none"
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} guest{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-3 space-y-3">
        <div>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Your name"
            autoComplete="name"
            className={`w-full rounded-xl border hairline bg-cream-2/40 px-4 py-3 text-sm outline-none focus:border-clay placeholder:text-ink-soft/50 ${
              errors.name ? "border-clay-dark" : ""
            }`}
          />
          {errors.name && (
            <p className="mt-1 px-1 text-xs text-clay-dark">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="Email for confirmation"
            autoComplete="email"
            className={`w-full rounded-xl border hairline bg-cream-2/40 px-4 py-3 text-sm outline-none focus:border-clay placeholder:text-ink-soft/50 ${
              errors.email ? "border-clay-dark" : ""
            }`}
          />
          {errors.email && (
            <p className="mt-1 px-1 text-xs text-clay-dark">{errors.email}</p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {nights > 0 && !errors.checkIn && !errors.checkOut && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 space-y-2 overflow-hidden border-t hairline pt-5 text-sm"
          >
            <Row label={`$${price} × ${nights} nights`} value={subtotal} />
            <Row label="Cleaning fee" value={cleaning} />
            <div className="flex justify-between border-t hairline pt-3 font-serif text-lg font-semibold tabular-nums">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-clay/10 px-4 py-3 text-sm text-clay-dark"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 w-full rounded-full bg-clay py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-clay-dark disabled:opacity-60"
      >
        {status === "loading" ? "Confirming…" : "Reserve — no fees"}
      </button>
      <p className="mt-3 text-center text-xs text-ink-soft">
        You won't be charged yet.
      </p>
    </form>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-ink-soft">
      <span>{label}</span>
      <span className="tabular-nums">${value.toLocaleString()}</span>
    </div>
  );
}
