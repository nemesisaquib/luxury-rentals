import { NextResponse } from "next/server";
import { MOCK_LISTINGS } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim().toLowerCase();
  const category = searchParams.get("category")?.trim();
  const guests = Number(searchParams.get("guests") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 0);
  const sort = searchParams.get("sort") || "featured";

  let listings = [...MOCK_LISTINGS];

  if (q) {
    listings = listings.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q)
    );
  }
  if (category && category !== "All") {
    listings = listings.filter((l) => l.category === category);
  }
  if (guests) {
    listings = listings.filter((l) => l.maxGuests >= guests);
  }
  if (maxPrice) {
    listings = listings.filter((l) => l.pricePerNight <= maxPrice);
  }

  listings.sort((a, b) => {
    if (sort === "price-low") return a.pricePerNight - b.pricePerNight;
    if (sort === "price-high") return b.pricePerNight - a.pricePerNight;
    if (sort === "rating") return b.rating - a.rating;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });

  return NextResponse.json({ count: listings.length, listings });
}
