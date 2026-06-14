import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Press",
  description: "Press kit and news from Hearth & Key.",
};

const pressMentions = [
  { pub: "Travel + Leisure", quote: "The antidote to the overwhelming scroll of traditional rental platforms.", date: "Oct 2025" },
  { pub: "Condé Nast Traveler", quote: "Hearth & Key guarantees a certain level of taste that other platforms simply can't.", date: "Aug 2025" },
  { pub: "The New York Times", quote: "Returning to the roots of what home-sharing was supposed to be.", date: "Mar 2025" },
];

export default function PressPage() {
  return (
    <section className="px-5 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16">
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.015em]">
            Press &amp; <em className="text-clay">News</em>
          </h1>
          <p className="mt-6 max-w-[50ch] font-light text-ink-soft text-lg">
            For press inquiries, brand assets, or interview requests, please contact our media team at press@hearthandkey.com
          </p>
          <a
            href="#"
            className="mt-8 inline-flex rounded-full bg-clay px-9 py-4 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5"
          >
            Download Press Kit
          </a>
        </Reveal>

        <Reveal delay={0.2} className="mb-12 mt-24">
          <h2 className="font-serif text-3xl font-medium">In the Media</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {pressMentions.map((p, i) => (
            <Reveal key={p.pub} delay={i * 0.1} className="rounded-3xl border hairline bg-cream-2/40 p-8">
              <div className="mb-6 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-moss">
                {p.date}
              </div>
              <blockquote className="font-serif text-xl italic leading-relaxed text-ink mb-6">
                "{p.quote}"
              </blockquote>
              <cite className="block text-sm font-medium not-italic text-ink-soft">
                — {p.pub}
              </cite>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
