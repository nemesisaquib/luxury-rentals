"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MOCK_LISTINGS } from "@/lib/mock-data";

const ease = [0.2, 0.7, 0.2, 1] as const;

const IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1920&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
];

const STATS = [
  { num: "2,400+", label: "Curated homes" },
  { num: "40", label: "Countries" },
  { num: "4.95★", label: "Avg. rating" },
  { num: "$0", label: "Guest fees" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [activeMedia, setActiveMedia] = useState(0);
  const [where, setWhere] = useState("");
  const [guests, setGuests] = useState("2");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const suggestions = useMemo(() => {
    if (!where.trim()) return [];
    const query = where.toLowerCase();
    return MOCK_LISTINGS.filter(l => 
      (l.location?.toLowerCase().includes(query) ?? false) || 
      (l.country?.toLowerCase().includes(query) ?? false) || 
      (l.title?.toLowerCase().includes(query) ?? false)
    ).slice(0, 5);
  }, [where]);

  // Cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMedia((prev) => (prev + 1) % IMAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (where) params.set("q", where);
    if (guests) params.set("guests", guests);
    router.push(`/stays?${params.toString()}`);
  }

  return (
    <header
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink"
    >
      {/* ── Image Background ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeMedia}
            src={IMAGES[activeMedia]}
            alt="Luxury home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* ── Gradient Overlays ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/70 via-ink/40 to-ink/90" />
      {/* Vignette */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(29,42,35,0.55)_100%)]" />

      {/* ── Content ── */}
      <div className="relative z-[3] flex w-full max-w-6xl flex-col items-center px-5 text-center md:px-12">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-cream/20 bg-cream/10 px-5 py-2 backdrop-blur-sm"
        >
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-cream/80">
            Hand-picked · 2,400 homes · 40 countries
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="mb-6 flex flex-wrap justify-center gap-x-4 font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[1.1] tracking-[-0.03em] text-cream">
          {["Stay somewhere", "worth", "remembering."].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 48, skewY: 3 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.13, ease }}
              className={`inline-block ${i === 1 ? "italic text-clay" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
          className="mb-10 max-w-[52ch] text-[1.05rem] font-light leading-relaxed text-cream/70"
        >
          Each home visited, vetted, and photographed by our scouts before it
          earns a key. Book direct — no service fees, ever.
        </motion.p>

        {/* ── Search Bar (glassmorphism) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.75, ease }}
          className="relative w-full max-w-3xl"
        >
          <form
            onSubmit={handleSearch}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:flex-row"
          >
            {/* Where */}
            <div className="relative flex flex-1 flex-col gap-0.5 border-b border-white/20 px-6 py-4 text-left sm:border-b-0 sm:border-r">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-cream/50">
                Where
              </span>
              <input
                value={where}
                onChange={(e) => {
                  setWhere(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Lisbon, Kyoto, Oaxaca…"
                className="bg-transparent text-[0.95rem] text-cream placeholder:text-cream/35 outline-none"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-0.5 border-b border-white/20 px-6 py-4 text-left sm:border-b-0 sm:border-r">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-cream/50">
                Guests
              </span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent text-[0.95rem] text-cream outline-none"
              >
                <option value="1" className="text-ink">1 guest</option>
                <option value="2" className="text-ink">2 guests</option>
                <option value="4" className="text-ink">4 guests</option>
                <option value="6" className="text-ink">6+ guests</option>
              </select>
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="group relative overflow-hidden bg-clay px-8 py-5 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-clay-dark"
            >
              <span className="relative z-[1] flex items-center gap-2">
                Find a stay
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </form>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-white/20 bg-ink/90 shadow-2xl backdrop-blur-xl sm:left-0 sm:right-auto sm:w-[320px]"
              >
                <ul className="flex flex-col py-2">
                  {suggestions.map((l) => (
                    <li key={l.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setWhere(`${l.location}, ${l.country}`);
                          setShowSuggestions(false);
                        }}
                        className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-white/10"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/10">
                          <svg className="h-4 w-4 text-cream/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.9rem] font-medium text-cream line-clamp-1">{l.location}, {l.country}</span>
                          <span className="text-[0.7rem] text-cream/50 line-clamp-1">{l.title}</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
          >
            {["Coastal retreats", "Countryside farms", "City lofts", "Mountain cabins", "Vineyard estates"].map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/stays?q=${encodeURIComponent(tag)}`)}
                className="rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-[0.7rem] font-medium text-cream/70 backdrop-blur-sm transition-all hover:border-cream/40 hover:bg-cream/20 hover:text-cream"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0, ease }}
        className="absolute bottom-0 left-0 right-0 z-[3] border-t border-white/10 bg-ink/60 backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {STATS.map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center py-5 text-center">
              <span className="font-serif text-[1.6rem] font-light text-cream">{num}</span>
              <span className="mt-0.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cream/45">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Indicator dots ── */}
      <div className="absolute bottom-24 right-6 z-[4] flex flex-col gap-1.5 md:right-12">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveMedia(i)}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${i === activeMedia ? "w-5 bg-cream" : "bg-cream/30"}`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>

    </header>
  );
}
