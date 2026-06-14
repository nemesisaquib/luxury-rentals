import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata = {
  title: "About Us",
  description: "Learn more about Hearth & Key.",
};

export default function AboutPage() {
  return (
    <>
      <section className="px-5 py-32 md:px-12 bg-cream-2">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.015em]">
              Travel should feel <em className="text-clay">personal</em> again.
            </h1>
            <p className="mt-8 max-w-[50ch] font-light text-ink-soft text-lg">
              We started Hearth & Key in 2021 because we were tired of the "stock photo" vacation rentals. We wanted places with soul, run by hosts who actually care.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-12">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-clay/20 border hairline relative">
              <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl italic text-clay">
                Placeholder Image
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-normal leading-[1.05] tracking-[-0.015em] mb-6">
              Our <em className="text-clay">Mission</em>
            </h2>
            <div className="space-y-6 font-light text-ink-soft">
              <p>
                To curate the top 2% of independent vacation rentals worldwide, ensuring every stay is memorable, seamless, and deeply connected to its locale.
              </p>
              <p>
                We believe in zero hidden fees, direct relationships between guests and hosts, and the end of the 11-step checkout process. 
              </p>
            </div>
            <Link
              href="/stays"
              className="mt-10 inline-flex rounded-full border-2 border-ink px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-all hover:bg-ink hover:text-cream"
            >
              Browse all stays
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
