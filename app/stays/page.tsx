import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import StaysClient from "./StaysClient";

export const metadata: Metadata = {
  title: "Browse vetted stays",
  description:
    "Every Hearth & Key home is scouted in person before it earns a key. Browse coastal villas, countryside farmhouses, and city lofts — book direct with no service fees.",
  alternates: { canonical: "/stays" },
};

export const revalidate = 60;

export default async function StaysPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; guests?: string }>;
}) {
  const params = await searchParams;
  const q = params.q ?? "";
  const category = params.category ?? "All";
  const guests = params.guests ?? "";

  let listings = MOCK_LISTINGS;
  
  if (q) {
    const qLower = q.toLowerCase();
    listings = listings.filter(
      (l) =>
        l.title.toLowerCase().includes(qLower) ||
        l.location.toLowerCase().includes(qLower) ||
        l.country.toLowerCase().includes(qLower)
    );
  }
  if (category && category !== "All") {
    listings = listings.filter((l) => l.category === category);
  }
  if (guests) {
    listings = listings.filter((l) => l.maxGuests >= Number(guests));
  }

  return (
    <StaysClient
      initial={listings}
      initialQuery={q}
      initialCategory={category}
      initialGuests={guests}
    />
  );
}
