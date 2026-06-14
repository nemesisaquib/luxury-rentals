"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ListingCard, { CardListing } from "@/components/ListingCard";

const categories = ["All", "Coastal", "Countryside", "City", "Mountain"];
const sorts = [
  ["featured", "Featured"],
  ["price-low", "Price ↑"],
  ["price-high", "Price ↓"],
  ["rating", "Top rated"],
];

export default function StaysClient({
  initial,
  initialQuery = "",
  initialCategory = "All",
  initialGuests = "",
}: {
  initial: CardListing[];
  initialQuery?: string;
  initialCategory?: string;
  initialGuests?: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [guests, setGuests] = useState(initialGuests);
  const [sort, setSort] = useState("featured");
  const [listings, setListings] = useState<CardListing[]>(initial);
  const [loading, setLoading] = useState(false);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (guests) params.set("guests", guests);
    if (sort) params.set("sort", sort);
    const res = await fetch(`/api/listings?${params.toString()}`);
    const data = await res.json();
    setListings(data.listings);
    setLoading(false);
  }, [q, category, guests, sort]);

  useEffect(() => {
    const t = setTimeout(fetchListings, 250);
    return () => clearTimeout(t);
  }, [fetchListings]);

  return (
    <section className="px-5 pb-24 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-moss">
          Stays
        </div>
        <h1 className="mb-10 font-serif text-[clamp(2.4rem,5vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em]">
          Every home, <em className="text-clay">scouted in person.</em>
        </h1>

        {/* Filter bar */}
        <div className="mb-10 flex flex-col gap-4 rounded-2xl border hairline bg-white p-4 md:flex-row md:items-center md:gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search destination or home…"
            className="flex-1 rounded-xl bg-cream-2 px-4 py-3 text-sm outline-none placeholder:text-ink-soft/50"
          />
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                  category === c
                    ? "bg-ink text-cream"
                    : "bg-cream-2 text-ink hover:bg-cream"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl bg-cream-2 px-4 py-3 text-sm outline-none"
          >
            {sorts.map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 text-sm text-ink-soft">
          {loading ? "Searching…" : `${listings.length} homes with keys`}
        </div>

        <AnimatePresence mode="popLayout">
          {listings.length === 0 && !loading ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border hairline bg-white py-20 text-center"
            >
              <p className="font-serif text-2xl">No homes match yet.</p>
              <p className="mt-2 font-light text-ink-soft">
                Try widening your search or clearing a filter.
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid gap-7 md:grid-cols-3"
            >
              {listings.map((l, i) => (
                <ListingCard key={l.slug} listing={l} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
