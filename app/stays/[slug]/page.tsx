import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { splitList, SITE } from "@/lib/utils";
import { getSession } from "@/lib/auth";
import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";

import { MOCK_LISTINGS } from "@/lib/mock-data";

export const revalidate = 60;

export async function generateStaticParams() {
  return MOCK_LISTINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const listing = MOCK_LISTINGS.find((l) => l.slug === params.slug);
  if (!listing) return { title: "Stay not found" };

  const title = `${listing.title} — ${listing.location}, ${listing.country}`;
  const desc = `${listing.description.slice(0, 155)}…`;
  return {
    title,
    description: desc,
    alternates: { canonical: `/stays/${listing.slug}` },
    openGraph: {
      title,
      description: desc,
      images: [{ url: listing.heroImage, width: 1200, height: 800 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [listing.heroImage],
    },
  };
}

export default async function ListingPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const listing = MOCK_LISTINGS.find((l) => l.slug === params.slug);
  if (!listing) notFound();

  const session = await getSession();
  let currentUser = null;
  if (session?.userId) {
    // Mocking user to avoid Prisma DB connection errors locally
    currentUser = { name: "Demo User", email: "demo@hearthandkey.com" };
  }

  const gallery = splitList(listing.gallery);
  const amenities = splitList(listing.amenities);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: listing.title,
    description: listing.description,
    image: listing.heroImage,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.location,
      addressCountry: listing.country,
    },
    geo:
      listing.lat && listing.lng
        ? { "@type": "GeoCoordinates", latitude: listing.lat, longitude: listing.lng }
        : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: listing.rating,
      reviewCount: listing.reviewCount,
    },
    priceRange: `$${listing.pricePerNight}/night`,
    url: `${SITE.url}/stays/${listing.slug}`,
  };

  return (
    <article className="px-5 pb-24 pt-28 md:px-12 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl">
        <Link
          href="/stays"
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-moss hover:text-clay"
        >
          ← All stays
        </Link>

        <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-moss">
          {listing.location}, {listing.country}
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em]">
            {listing.title}
          </h1>
          <div className="text-sm font-semibold">
            <span className="text-gold">★</span> {listing.rating.toFixed(2)}
            <span className="font-normal text-ink-soft">
              {" "}
              · {listing.reviewCount} reviews
            </span>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-8 grid gap-3 overflow-hidden rounded-3xl md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src={gallery[0] || listing.heroImage}
              alt={`${listing.title} — main view`}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {gallery.slice(1, 5).map((src, i) => (
              <div key={i} className="relative aspect-[4/3]">
                <Image
                  src={src}
                  alt={`${listing.title} — view ${i + 2}`}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="mt-12 grid gap-12 md:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex flex-wrap gap-6 border-b hairline pb-7 text-ink-soft">
              <Stat n={listing.beds} label="beds" />
              <Stat n={listing.baths} label="baths" />
              <Stat n={listing.maxGuests} label="guests" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-semibold">
                  {listing.category}
                </span>
                <span className="text-xs uppercase tracking-[0.14em]">
                  setting
                </span>
              </div>
            </div>

            <Reveal className="py-8">
              <p className="font-serif text-xl font-light leading-relaxed text-ink-soft">
                {listing.description}
              </p>
            </Reveal>

            <div className="border-t hairline py-8">
              <h2 className="mb-5 font-serif text-2xl font-medium">
                What's here
              </h2>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2.5 text-sm text-ink-soft"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border hairline bg-cream-2 p-8">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-moss">
                Field note from {listing.hostName}
              </div>
              <p className="font-serif text-lg font-light italic leading-relaxed">
                “{listing.hostNote}”
              </p>
            </div>
          </div>

          {/* Booking */}
          <div className="md:sticky md:top-28 md:self-start">
            <BookingForm
              listingId={listing.id}
              price={listing.pricePerNight}
              maxGuests={listing.maxGuests}
              initialName={currentUser?.name || ""}
              initialEmail={currentUser?.email || ""}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-serif text-2xl font-semibold tabular-nums">
        {n}
      </span>
      <span className="text-xs uppercase tracking-[0.14em]">{label}</span>
    </div>
  );
}
