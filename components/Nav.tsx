"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { href: "/stays", label: "Stays" },
  { href: "/#how", label: "How it works" },
  { href: "/#stories", label: "Stories" },
  { href: "/#host", label: "Host with us" },
];

export default function Nav({ session, site }: { session: any; site: any }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-12 transition-all duration-500 ease-spring-smooth ${
        scrolled
          ? "bg-cream/60 backdrop-blur-2xl border-b hairline shadow-glass"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Link
        href="/"
        className="font-serif text-xl font-semibold tracking-tight text-ink flex items-center gap-2"
      >
        {site?.logo ? (
          <img src={site.logo} alt={site.name} className="h-8 w-auto object-contain" />
        ) : (
          <>{site?.name}</>
        )}
      </Link>

      <ul className="hidden items-center gap-9 md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group relative text-xs font-medium uppercase tracking-[0.14em] text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-clay transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {session ? (
          <>
            <Link
              href={session.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="hidden md:inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-ink hover:text-clay transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/";
              }}
              className="hidden md:inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-ink hover:text-clay transition-colors"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="hidden md:inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-ink hover:text-clay transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="hidden md:inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-ink hover:text-clay transition-colors"
            >
              Sign up
            </Link>
          </>
        )}
        <Link
          href="/stays"
          className="rounded-full bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-cream transition-all duration-200 hover:bg-clay-dark hover:-translate-y-px"
        >
          Find a stay
        </Link>
        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-full border hairline md:hidden"
        >
          <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 top-full mx-4 mt-2 flex flex-col gap-1 rounded-2xl border hairline bg-cream p-3 shadow-xl md:hidden"
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-ink hover:bg-cream-2"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}
