"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export type CardListing = {
  slug: string;
  title: string;
  location: string;
  country: string;
  pricePerNight: number;
  beds: number;
  baths: number;
  rating: number;
  category: string;
  tag: string | null;
  heroImage: string;
};

export default function ListingCard({
  listing,
  index = 0,
}: {
  listing: CardListing;
  index?: number;
}) {
  const [fav, setFav] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ y: -12, scale: 1.015 }}
      className="group overflow-hidden rounded-2xl border hairline bg-white transition-all duration-700 hover:shadow-premium"
    >
      <Link href={`/stays/${listing.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={listing.heroImage}
            alt={`${listing.title}, ${listing.location}`}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
          {listing.tag && (
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] ${
                listing.tag === "Rare find" || listing.tag === "Trending"
                  ? "bg-clay text-white"
                  : "bg-cream text-ink"
              }`}
            >
              {listing.tag}
            </span>
          )}
          <button
            aria-label={fav ? "Remove from saved" : "Save"}
            onClick={(e) => {
              e.preventDefault();
              setFav((f) => !f);
            }}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-base transition-transform hover:scale-110"
          >
            <span className={fav ? "text-clay" : "text-ink"}>
              {fav ? "♥" : "♡"}
            </span>
          </button>
        </div>
        <div className="p-6">
          <div className="mb-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-moss">
            {listing.location}, {listing.country}
          </div>
          <h3 className="mb-3 font-serif text-2xl font-medium tracking-tight">
            {listing.title}
          </h3>
          <div className="mb-4 flex gap-4 text-sm text-ink-soft">
            <span>{listing.beds} beds</span>
            <span>{listing.baths} baths</span>
            <span>{listing.category}</span>
          </div>
          <div className="flex items-baseline justify-between border-t hairline pt-4">
            <div className="font-serif text-2xl font-semibold tabular-nums">
              ${listing.pricePerNight}
              <span className="font-sans text-sm font-normal text-ink-soft">
                {" "}
                / night
              </span>
            </div>
            <div className="text-sm font-semibold">
              <span className="text-gold">★</span> {listing.rating.toFixed(2)}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
