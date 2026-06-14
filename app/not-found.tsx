import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <div className="font-serif text-7xl italic text-clay">404</div>
      <h1 className="mt-4 font-serif text-3xl font-medium">
        This door has no key.
      </h1>
      <p className="mt-2 max-w-[40ch] font-light text-ink-soft">
        The stay you're looking for has moved on, or never earned a key.
      </p>
      <Link
        href="/stays"
        className="mt-8 inline-flex rounded-full bg-ink px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-clay-dark"
      >
        Browse all stays
      </Link>
    </section>
  );
}
