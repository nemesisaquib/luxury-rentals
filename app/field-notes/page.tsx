import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Field Notes",
  description: "Read our field notes from hosts around the world.",
};

const mockArticles = [
  {
    id: 1,
    title: "The hidden coves of the Amalfi Coast",
    category: "Coastal",
    author: "Gianni F.",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "A baker's guide to the Marais",
    category: "City",
    author: "Claire M.",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Foraging in the Scottish Highlands",
    category: "Countryside",
    author: "Ian M.",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Best coffee shops in Brooklyn",
    category: "City",
    author: "Sarah J.",
    readTime: "3 min read",
  },
];

export default function FieldNotesPage() {
  return (
    <section className="px-5 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16">
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.015em]">
            Field <em className="text-clay">Notes</em>
          </h1>
          <p className="mt-6 max-w-[50ch] font-light text-ink-soft">
            Insider guides, host recommendations, and stories from the road. Directly from the people who live there.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {mockArticles.map((article, i) => (
            <Reveal key={article.id} delay={i * 0.1}>
              <Link href="#" className="group block h-full">
                <article className="rounded-3xl border hairline bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-[16/9] bg-cream-2 flex items-center justify-center font-serif italic text-clay/50 border-b hairline">
                    Article Image
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-moss">
                      <span>{article.category}</span>
                      <span className="w-1 h-1 rounded-full bg-moss/30" />
                      <span>{article.readTime}</span>
                    </div>
                    <h2 className="font-serif text-2xl font-medium mb-3 group-hover:text-clay transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm font-light text-ink-soft">
                      By {article.author}
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
