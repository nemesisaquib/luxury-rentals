import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Cancellations",
  description: "Our cancellation policy.",
};

const policies = [
  {
    name: "Flexible",
    description: "Guests get a full refund if they cancel up to 24 hours before check-in.",
    timeline: "24 hours",
    color: "bg-moss/10 border-moss/20 text-moss"
  },
  {
    name: "Moderate",
    description: "Guests get a full refund if they cancel up to 5 days before check-in.",
    timeline: "5 days",
    color: "bg-gold/10 border-gold/30 text-gold"
  },
  {
    name: "Strict",
    description: "Guests get a full refund if they cancel within 48 hours of booking and at least 14 days before check-in.",
    timeline: "14 days",
    color: "bg-clay/10 border-clay/20 text-clay-dark"
  }
];

export default function CancellationsPage() {
  return (
    <section className="px-5 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16">
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.015em]">
            Cancellation <em className="text-clay">Policies</em>
          </h1>
          <p className="mt-6 max-w-[50ch] font-light text-ink-soft text-lg">
            We believe in transparency. Every listing clearly displays its cancellation policy, chosen by the host from our three standardized tiers.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {policies.map((policy, i) => (
            <Reveal key={policy.name} delay={i * 0.1} className={`rounded-3xl border p-10 ${policy.color.split(' ')[1]}`}>
              <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.16em] mb-6 ${policy.color.split(' ')[0]} ${policy.color.split(' ')[2]}`}>
                {policy.name}
              </div>
              <h2 className="font-serif text-2xl font-medium mb-4 text-ink">
                {policy.timeline} prior
              </h2>
              <p className="font-light text-ink-soft leading-relaxed">
                {policy.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
