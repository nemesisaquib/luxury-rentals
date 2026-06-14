import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/utils";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";
import { MOCK_LISTINGS, MOCK_FAQS } from "@/lib/mock-data";

export const revalidate = 60;

export default async function Home() {
  const featured = MOCK_LISTINGS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    slogan: SITE.tagline,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <Ticker />

      {/* Featured listings */}
      <section id="stays" className="bg-cream-2 px-5 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.05] tracking-[-0.015em]">
              This week's <em className="text-clay">keys</em>
            </h2>
            <p className="max-w-[38ch] font-light text-ink-soft">
              Every home scouted in person — no stock listings, no surprises.
              These earned a key this week.
            </p>
          </Reveal>

          <div className="grid gap-7 md:grid-cols-3">
            {featured.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>

          <Reveal delay={0.1} className="mt-12 text-center">
            <Link
              href="/stays"
              className="inline-flex rounded-full border-2 border-ink px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-all hover:bg-ink hover:text-cream"
            >
              Browse all stays
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Collections section to make the homepage longer and improve UX */}
      <section className="bg-ink px-5 py-24 text-cream md:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12">
            <h2 className="font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.05]">
              Curated <em className="text-clay">Collections</em>
            </h2>
            <p className="mt-4 max-w-[40ch] font-light text-cream/70">
              Hand-picked estates categorised for your specific escape.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "By the Water", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80" },
              { title: "Into the Wild", img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80" },
              { title: "Historic Estates", img: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?w=600&q=80" },
              { title: "City Lofts", img: "https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=600&q=80" },
            ].map((col, i) => (
              <Reveal key={col.title} delay={i * 0.1}>
                <Link href={`/stays?collection=${encodeURIComponent(col.title)}`} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-ink/20 transition-colors duration-500 group-hover:bg-ink/0 z-[1]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent z-[1]" />
                  <img src={col.img} alt={col.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-6 left-6 z-[2]">
                    <h3 className="font-serif text-2xl font-medium tracking-tight text-white">{col.title}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-clay group-hover:text-white transition-colors">
                      Explore <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-5 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.05] tracking-[-0.015em]">
              Booking, <em className="text-clay">without the maze</em>
            </h2>
            <p className="max-w-[38ch] font-light text-ink-soft">
              Three steps. No service fees, no resolution centers, no eleven-step
              checkout.
            </p>
          </Reveal>

          <div className="grid overflow-hidden rounded-3xl border hairline md:grid-cols-3">
            {[
              ["01", "Browse the vetted few", "We list 2% of the homes we scout. If our team wouldn't sleep there, it doesn't get a key."],
              ["02", "Book direct, instantly", "Real-time calendars synced with hosts. The price you see is the price you pay — fees are our problem."],
              ["03", "Arrive like a local", "Every booking comes with the host's own field notes: the bakery, the cove, the table worth reserving."],
            ].map(([num, title, body], i) => (
              <Reveal
                key={num}
                delay={i * 0.1}
                className={`p-9 ${i === 1 ? "bg-cream-2" : "bg-white"} ${
                  i > 0 ? "border-t hairline md:border-l md:border-t-0" : ""
                }`}
              >
                <div className="font-serif text-5xl italic leading-none text-clay">
                  {num}
                </div>
                <h3 className="mb-2.5 mt-5 font-serif text-2xl font-medium">
                  {title}
                </h3>
                <p className="font-light text-ink-soft">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="grid gap-8 bg-ink px-5 py-20 text-center text-cream md:grid-cols-4 md:px-12">
        {[
          ["2,400+", "Homes with keys"],
          ["40", "Countries"],
          ["4.95★", "Average stay rating"],
          ["$0", "Guest service fees"],
        ].map(([num, label], i) => (
          <Reveal key={label} delay={i * 0.08}>
            <div className="font-serif text-[clamp(2.4rem,4vw,3.6rem)] font-light">
              {num}
            </div>
            <div className="mt-1 text-[0.74rem] uppercase tracking-[0.2em] opacity-70">
              {label}
            </div>
          </Reveal>
        ))}
      </section>

      {/* Quote */}
      <section id="stories" className="px-5 py-24 md:px-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <blockquote className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light italic leading-[1.3] tracking-[-0.01em]">
            <span className="text-clay">“</span>We've stayed in dozens of
            rentals. This was the first one that felt like it was waiting for us.
          </blockquote>
          <cite className="mt-7 block text-[0.8rem] font-bold uppercase not-italic tracking-[0.2em] text-moss">
            Mara &amp; Tomas — Quinta do Sol, Alentejo
          </cite>
        </Reveal>
      </section>

      {/* Host CTA */}
      <section id="host" className="px-5 pb-24 md:px-12">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-clay to-clay-dark px-6 py-20 text-center text-cream">
          <div className="pointer-events-none absolute -inset-x-40 -top-40 h-96 bg-[radial-gradient(circle_at_30%_20%,rgba(244,239,230,0.18),transparent_45%)]" />
          <h2 className="relative font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.05]">
            Own a place worth <em>remembering?</em>
          </h2>
          <p className="relative mx-auto mb-9 mt-4 max-w-[48ch] font-light">
            Hosts on Hearth &amp; Key earn 18% more on average than on big
            platforms — and keep full control of their calendar.
          </p>
          <Link
            href="/stays"
            className="relative inline-flex rounded-full bg-cream px-9 py-4 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-ink transition-transform hover:-translate-y-0.5"
          >
            Apply to host
          </Link>
        </Reveal>
      </section>

      {/* FAQs Section */}
      <section className="py-24 px-5 md:px-12 bg-cream">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.015em] text-ink mb-6">
              Frequently Asked <em className="text-clay">Questions</em>
            </h2>
            <p className="text-ink-soft max-w-xl mx-auto text-lg font-light leading-relaxed">
              Everything you need to know about booking with Hearth & Key.
            </p>
          </div>
          
          <div className="space-y-6">
            {MOCK_FAQS.map((faq, index) => (
              <div key={faq.id} className="border-b hairline border-ink/10 pb-6 group">
                <h3 className="font-serif text-2xl text-ink mb-3 group-hover:text-clay transition-colors">{faq.question}</h3>
                <p className="text-ink-soft font-light leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
